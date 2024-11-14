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
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CodeIcon from '@mui/icons-material/Code';
import ReorderIcon from '@mui/icons-material/Reorder';
import StyleIcon from '@mui/icons-material/Style';
import PreviewIcon from '@mui/icons-material/Preview';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

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
    const { id, currentIndex: initialIndex } = useParams();
    const [presentation, setPresentation] = useState({});
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(Number(initialIndex) || 1);
    const [slideCount, setSlideCount] = useState(1);
    const [errorOpen, setErrorOpen] = useState(false);
    const [textOpen, setTextOpen] = useState(false);
    const [imageOpen, setImageOpen] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const [codeOpen, setCodeOpen] = useState(false);
    const [textareasize, setTextAreaSize] = useState('');
    const [text, setText] = useState('');
    const [fontsize, setfontSize] = useState('');
    const [textcolour, settextColour] = useState('');
    const [imageareasize, setImageAreaSize] = useState('');
    const [imageURL, setimageURL] = useState('');
    const [descriptionalttag, setDescriptionAltTag] = useState('');

    const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
    const handleErrorClose = () => setErrorOpen(false);
    const handleTextClose = () => setTextOpen(false);
    const handleTextOpen = () => setTextOpen(true);
    const handleImageClose = () => {
        setImageOpen(false);
    };    
    const handleImageOpen = () => setImageOpen(true);
    const handleVideoClose = () => setVideoOpen(false);
    const handleVideoOpen = () => setVideoOpen(true);
    const handleCodeClose = () => setCodeOpen(false);
    const handleCodeOpen = () => setCodeOpen(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getPresentation = () => {
        getStore().then(data => {
            const singlePresentation = data.store[id];
            setPresentation(singlePresentation);
            const slides = Object.keys(singlePresentation).filter(key => key !== 'title');
            setSlideCount(slides.length);
        });
    };

    useEffect(() => {
        getPresentation();
        navigate(`/presentation/${id}/${currentIndex}`, { replace: true });
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') goToPrevious();
            if (event.key === 'ArrowRight') goToNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [id, currentIndex, slideCount]);

    const handleText = () => {
        console.log("Text option selected");
        const textBox = {
            size: textareasize,
            text: text,
            fontsize: fontsize,
            color: textcolour,
            position: { x: 0, y: 0 },
        };

        getStore().then(data => {
            const presentationdata = data.store[id];
            if (!presentationdata[currentIndex].elements) {
                presentationdata[currentIndex].elements = [];
            }
            presentationdata[currentIndex].elements.push(textBox);

            const userToken = localStorage.getItem('token');
            const url = 'http://localhost:5005/store';
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify({ store: data.store }),
            })
            .then(res => res.json())
            .then(() => {
                getPresentation();
                handleTextClose();
            });
        });
    };

    const currentElements = presentation[currentIndex]?.elements || [];
    console.log(currentElements);

    const handleImage = () => {
        console.log("Image option selected");
        const imageElement = {
            size: imageareasize,
            img: imageURL,
            tag: descriptionalttag,
            position: { x: 0, y: 0 },
        };
        console.log(imageElement)

        getStore().then(data => {
            const presentationdata = data.store[id];
            console.log(presentationdata)

            if (!presentationdata[currentIndex].elements) {
                presentationdata[currentIndex].elements = [];
            }
            presentationdata[currentIndex].elements.push(imageElement);

            const userToken = localStorage.getItem('token');
            const url = 'http://localhost:5005/store';
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify({ store: data.store }),
            })
            .then(res => res.json())
            .then(() => {
                getPresentation();
                console.log("Updated presentation data:", presentationdata);
                handleImageClose();
            });
        });
    };

    const handleVideo = () => {
        console.log("Video option selected");
    };

    const handleCode = () => {
        console.log("Code option selected");
    };


    const DrawerList = (
        <Box sx={{ width: '100%' }} role="presentation" onClick={handleDrawerToggle}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleTextOpen}>
                        <ListItemIcon><TextFieldsIcon /></ListItemIcon>
                        <ListItemText primary="TEXT" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleImageOpen}>
                        <ListItemIcon><ImageIcon /></ListItemIcon>
                        <ListItemText primary="IMAGE" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleVideoOpen}>
                        <ListItemIcon><VideoLibraryIcon /></ListItemIcon>
                        <ListItemText primary="VIDEO" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleCodeOpen}>
                        <ListItemIcon><CodeIcon /></ListItemIcon>
                        <ListItemText primary="CODE" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </Box>
    );

    const handleDelete = () => {
        getStore().then(data => {
            delete data.store[id];
            console.log(data);

            const userToken = localStorage.getItem('token');
            const url = 'http://localhost:5005/store';
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify({ store: data.store }),
            })
            .then((res)=>{
                return res.json()
            })
            navigate('/dashboard')
        })
    };

    const handleSlideDelete = () => {
        getStore()
        .then(data => {
            const presentation = data.store[id];
            const slideKeys = Object.keys(presentation).filter(key => key !== 'title');

            if (slideKeys.length === 1) {
                setErrorOpen(true);
                return;
            }
            const keyToDelete = slideKeys[currentIndex - 1];
            console.log(`Deleting slide at index ${currentIndex} with key ${keyToDelete}`);
            
            delete presentation[keyToDelete];

            const newSlideIndex = currentIndex > 1 ? currentIndex - 1 : 1;
            setCurrentIndex(newSlideIndex);

            const userToken = localStorage.getItem('token');
            const url = 'http://localhost:5005/store';
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify({ store: data.store }),
            })
            .then((res) => {
                return res.json() 
            });
            getPresentation();
        });
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleTitleSave = () => {
        setIsEditing(false);
        getStore().then(data => {
            console.log(data);
            data.store[id].title = editedTitle;
            setPresentation(prev => ({ ...prev, title: editedTitle }));

            const userToken = localStorage.getItem('token');
            const url = 'http://localhost:5005/store';
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify({ store: data.store }),
            })
            .then(res => res.json());
        });
    };
    //moving between
    const goToPrevious = () => {
        if (currentIndex > 1) setCurrentIndex(currentIndex - 1);
    };

    const goToNext = () => {
        if (currentIndex < slideCount) setCurrentIndex(currentIndex + 1);
    };
    //Creating slides
    const handleAddPage = () => {
        getStore().then(data => {
            const presentation = data.store[id];
            const numericKeys = Object.keys(presentation)
                .map(Number)
                .filter(key => !isNaN(key));
            const maxKey = numericKeys.length > 0 ? Math.max(...numericKeys) : 0;
            const newId = maxKey + 1;
            presentation[newId] = {};

            console.log(data);
            const userToken = localStorage.getItem('token');
            const url = 'http://localhost:5005/store';
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify({ store: data.store }),
            })
            .then((res) => {
                return res.json()
            }); // Refresh presentation data
            getPresentation()
        });
    };
    //预览在这里
    const handlePreview = () => {
        console.log("preview");
    };
    //风格在这里
    const handleStyle = () => {
        console.log("style");
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
        height: 'calc(100vh - 64px)',
        position: 'relative',
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
        justifyContent: 'center',
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <ReorderIcon onClick={handleDrawerToggle} sx={{ color: 'white', marginRight: 2 }}>
                        Tools
                    </ReorderIcon>
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
            
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle} sx={{ width: '30%' }}>
                {DrawerList}
            </Drawer>

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
                        <Button variant="contained" onClick={handleClose}>
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
            
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

            <Modal
                open={textOpen}
                onClose={handleTextClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <TextField id="textAreaSize" label="Area size" variant="outlined" onChange={(e) => setTextAreaSize(e.target.value)} value={textareasize} />  
                    <TextField id="text" label="Text" variant="outlined" onChange={(e) => setText(e.target.value)} value={text} />
                    <TextField id="fontSize" label="Font size" variant="outlined" onChange={(e) => setfontSize(e.target.value)} value={fontsize} />
                    <TextField id="textColour" label="Colour" variant="outlined" onChange={(e) => settextColour(e.target.value)} value={textcolour} />
                    <Button onClick={handleText}>Submit</Button>
                </Box>
            </Modal>

            <Modal
                open={imageOpen}
                onClose={handleImageClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <TextField id="imageAreaSize" label="Area size" variant="outlined" onChange={(e) => setImageAreaSize(e.target.value)} value={imageareasize}/>  
                    <TextField id="imageURL" label="URL" variant="outlined" onChange={(e) => setimageURL(e.target.value)} value={imageURL}/>
                    <TextField id="descriptionAltTag" label="Description" variant="outlined" onChange={(e) => setDescriptionAltTag(e.target.value)} value={descriptionalttag}/>
                    <Button onClick={handleImage}>Submit</Button>
                </Box>
            </Modal>

            <Modal
                open={videoOpen}
                onClose={handleVideoClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <TextField id="vedioAreaSize" label="Area size" variant="outlined" />  
                    <TextField id="vedioURL" label="URL" variant="outlined" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Auto-play" />
                    <Button onClick={handleVideo}>Submit</Button>
                </Box>
            </Modal>
            
            <Modal
                open={codeOpen}
                onClose={handleCodeClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <TextField id="codeBlockSize" label="Block size" variant="outlined" />  
                    <TextField id="code" label="Code" variant="outlined" />
                    <TextField id="codeFontSize" label="Font size" variant="outlined" />
                    <Button onClick={handleCode}>Submit</Button>
                </Box>
            </Modal>

            <Box sx={slideBoxStyles}>
                <Paper elevation={3}
                    style={{ 
                        width: '60%', 
                        aspectRatio: '16 / 9', 
                        position: 'relative',  
                        marginRight: '10%', 
                        marginLeft: 'auto' 
                    }}
                >
                    {currentElements.map((elements, index) => (
                        <div key={index} style={{
                            position: "absolute",
                            top: `${elements.position?.y}`,
                            left: `${elements.position?.x}`,
                            wigth: `${elements.size}`,
                            height: `${elements.size}`,
                            color: elements.color,
                            fontSize: `${elements.fontsize}em`,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',        // Prevents wrapping to a new line
                            textOverflow: 'ellipsis',    // Shows ellipsis if content overflows
                            maxWidth: '100%', 
                            maxHeight: '100%',
                            border: '1px solid grey'
                        }}>
                            {elements.text&&(
                                <div>
                                    {elements.text}
                                </div>
                            )}

                            {elements.img&&(
                                <img
                                src={elements.img}
                                alt={elements.tag || "image"}/>
                                
                            )}


                        </div>
                    ))}    

                    {currentIndex > 1 && (
                        <KeyboardArrowUpIcon 
                            onClick={goToPrevious}
                            sx={{
                                position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)',
                                cursor: 'pointer'
                            }}
                        />
                    )}
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
                </Paper>
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
                    <StyleIcon 
                        onClick={handleStyle}
                        sx={{ color: grey[400], fontSize: 40, cursor: 'pointer' }}
                    />
                    <PreviewIcon 
                        onClick={handlePreview}
                        sx={{ color: grey[400], fontSize: 40, cursor: 'pointer' }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default SingleSlide;
