import React, { useEffect, useState } from 'react'; 
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { getStore } from './dataprovider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

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

    const [open, setOpen] = React.useState(false);
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

    const {id} = useParams()
    const [presentation,setPresentation] = useState({})

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
                    {/* title*/}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {presentation.title}
                    </Typography>
                    
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