import React, { useEffect, useState } from 'react'; 
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { getStore } from './dataprovider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { grey } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';


const boxStyle = {
    width: '400px', 
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',

    '@media (max-width: 768px)': {
        width: '90%',  
        padding: '15px',  
    },
    '@media (max-width: 400px)': {
        width: '100%',  
        padding: '10px',  
    },
};

const SingleSlide = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [presentation,setPresentation] = useState({})
    const [open, setOpen] = React.useState(false);
    const [isEditing, setIsEditing] = useState(false); 
    const [editedTitle, setEditedTitle] = useState(''); 
    const [currentIndex, setCurrentIndex] = useState(1);
    const [slideCount,setSlideCount] = useState(1);
    const [errorOpen, setErrorOpen] = useState(false); 
    const handleErrorClose = () => setErrorOpen(false); 

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getPresentation = () => {
        getStore()
        .then(data => {
            const singlePresentation = data.store[id]
            setPresentation(singlePresentation);

            const slides = Object.keys(singlePresentation).filter(key =>key !== 'title')
            setSlideCount(slides.length)
        });
    };

    useEffect(()=>{
        getPresentation();

        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') goToPrevious();
            if (event.key === 'ArrowRight') goToNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    },[id, currentIndex, slideCount])

    const handleDelete = () => {
        getStore()
        .then(data=>{
            delete data.store[id]
            console.log(data)

            const userToken = localStorage.getItem('token');
            const url = 'http://localhost:5005/store';
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({ store: data.store}),
            })
            .then((res)=>{
                return res.json()
            })
            navigate('/dashboard')
        })
    };

    const handleSlideDelete=()=>{
        getStore()
        .then(data=>{
            const presentation = data.store[id];
            const slideKeys = Object.keys(presentation).filter(key => key !== 'title');
        
            // if only one slide，error
            if (slideKeys.length === 1) {
                setErrorOpen(true);
                return;
            }
            // find the delate key
            const keyToDelete = slideKeys[currentIndex - 1]; // slideKeys begin with 0
            console.log(`Deleting slide at index ${currentIndex} with key ${keyToDelete}`);
            
            delete presentation[keyToDelete];
            console.log(data);

            // update currentIndex 
            const newSlideIndex = currentIndex > 1 ? currentIndex - 1 : 1;
            setCurrentIndex(newSlideIndex);

            const userToken = localStorage.getItem('token');
            const url = 'http://localhost:5005/store';
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({ store: data.store}),
            })
            .then((res) => {
                return res.json() 
            });
            getPresentation();
        });
    };

    const handleBack = () => {
        navigate('/dashboard'); // back to dashboard
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleTitleSave = () => {
        setIsEditing(false);
        // Optionally: Save the updated title back to the server
        getStore()
        .then(data=>{
            console.log(data)
            data.store[id].title = editedTitle; 
            setPresentation(prev => ({ ...prev, title: editedTitle }));

            const userToken = localStorage.getItem('token');
            const url = 'http://localhost:5005/store';
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({ store: data.store}),
            })
            .then((res)=>{
                return res.json()
            })
        })
    };

    //moving between
    const goToPrevious=()=>{
        setCurrentIndex(prev=>(prev > 1 ? prev-1:prev))
    }

    const goToNext=()=>{
        setCurrentIndex(prev=>(prev < slideCount ? prev+1:prev))
    }
    
    //Creating slides
    const handleAddPage = () => {
        getStore()
        .then(data => {
            const presentation = data.store[id];
            // findthe maxnum of presentation，+ 1 to be newId
            const numericKeys = Object.keys(presentation)
            .map(Number) 
            .filter(key => !isNaN(key)); 

            const maxKey = numericKeys.length > 0 ? Math.max(...numericKeys) : 0;
            const newId = maxKey + 1;
            presentation[newId] = {};

            console.log(data)
            const userToken = localStorage.getItem('token');
            const url = 'http://localhost:5005/store';
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({ store: data.store }),
            })
            .then((res) => {
                return res.json()
            }); // Refresh presentation data
            getPresentation()
        });
    };

    // button style
    const buttonStyles = {
        color: 'primary', 
        bgcolor: 'white', 
        borderColor: 'white', 
        '&:hover': {
            bgcolor: 'red', 
            color: 'white', 
            borderColor: 'red', 
        },
    };

    const slideBoxStyles = {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 'calc(100vh - 64px)', // Adjust height to fill remaining space after AppBar
        position: 'relative'
    };

    const slideNumberStyles = {
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        width: '50px', 
        height: '50px', 
        fontSize: '1em', 
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center'
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* title with edit functionality */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        {isEditing ? (
                            <TextField
                                value={editedTitle}
                                onChange={handleTitleChange}
                                onBlur={handleTitleSave}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleTitleSave();
                                }}
                                size="small"
                                variant="outlined"
                                sx={{ marginRight: 1 }}
                            />
                        ) : (
                            <Typography variant="h6" component="div">
                                {presentation.title}
                            </Typography>
                        )}
                        <EditIcon 
                            onClick={handleEditClick} 
                            sx={{ cursor: 'pointer', marginLeft: 1 }} 
                        />
                    </Box>


                    {/* 缩略图写在这 */}
                    
                    {/* box for delete and back */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button 
                            variant="outlined"
                            onClick={handleOpen}
                            sx={buttonStyles}
                        >
                            Delete
                        </Button>
                        <Button 
                            variant="outlined"
                            onClick={handleBack}
                            sx={buttonStyles}
                        >
                            Back
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* delete modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure?
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button 
                            variant="contained" 
                            onClick={() => { handleDelete(); handleClose(); }}
                        >
                            Yes
                        </Button>
                        <Button variant="contained" onClick={handleClose} >
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
            
            {/* 删除错误提示弹窗 */}
            <Modal
                open={errorOpen}
                onClose={handleErrorClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cannot delete the only slide
                    </Typography>
                    <Typography variant="body2">
                        Please delete the entire presentation instead.
                    </Typography>
                    <Button onClick={handleErrorClose}>OK</Button>
                </Box>
            </Modal>

            {/* Centered black bordered box */}
            <Box sx={slideBoxStyles}>
                <div 
                    style={{ 
                        width: '60%', 
                        aspectRatio: '16 / 9', 
                        border: '1px solid black',
                        position: 'relative',  
                        marginRight: '10%', 
                        marginLeft: 'auto' 
                    }}
                >
                    {/* Up */}
                    {currentIndex > 1 && (
                        <KeyboardArrowUpIcon 
                            onClick={goToPrevious}
                            sx={{
                                position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)',
                                cursor: 'pointer'
                            }}
                        />
                    )}
                    {/* Down */}
                    {currentIndex < slideCount && (
                        <KeyboardArrowDownIcon 
                            onClick={goToNext}
                            sx={{
                                position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)',
                                cursor: 'pointer'
                            }}
                        />
                    )}
                    <Typography variant="caption" gutterBottom sx={slideNumberStyles}>
                        {currentIndex}
                    </Typography>
                </div>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2, 
                        marginTop: 2, 
                        justifyContent: 'center' 
                    }}
                >
                    <AddCircleIcon 
                        onClick={handleAddPage}
                        sx={{ color: grey[400], fontSize: 40, cursor: 'pointer' }}
                    />
                    <DeleteIcon 
                        onClick={handleSlideDelete}
                        sx={{ color: grey[400], fontSize: 40, cursor: 'pointer' }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default SingleSlide;