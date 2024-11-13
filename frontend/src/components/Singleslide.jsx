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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const handleBack = () => {
        navigate('/dashboard'); // back to dashboard
    };

    const getPresentation = () => {
        getStore()
        .then(data => {
            const singlePresentation = data.store[id]
            setPresentation(singlePresentation);
        });
    };

    useEffect(()=>{
        getPresentation()
    },[id])

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleTitleSave = () => {
        setIsEditing(false);
        //setPresentation(prev => ({ ...prev, title: editedTitle }));
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
                        <Button 
                            variant="contained" 
                            onClick={handleClose} 
                        >
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default SingleSlide;