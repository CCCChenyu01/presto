import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import {getStore} from './dataprovider';



// Style for central box
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

    // Media queries for responsiveness
    '@media (max-width: 768px)': {
        width: '90%',  // Adjust width for medium screens
        padding: '15px',  // Adjust padding for medium screens
    },
    '@media (max-width: 400px)': {
        width: '100%',  // Adjust width for small screens
        padding: '10px',  // Adjust padding for small screens
    },
};

// Style for main container
const containerStyle = {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
};

// Style for Logout button
const logoutButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '20px',
};

// Style for New presentation button
const newPresentationButtonStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');
        // Navigate back to login page
        navigate('/');
    };

    const [title,setTitle]= useState("")

    const postnew =()=>{
        getStore()
        // get data
        .then((data)=>{
            console.log(data)
            // change the data
            const storeData = data.store && typeof data.store === "object" ? data.store:{};
            const newId = Object.keys(storeData).length + 1;
            storeData[newId] = {"title":title,"1":{}};

            //put new data
            const userToken = localStorage.getItem('token')
            const url = 'http://localhost:5005/store'
            return fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body:JSON.stringify({store:storeData}),
            })
            .then((res)=>{
                console.log("hhhhhh")
            })
        })
    }

    return (
        <div style={containerStyle}>
            <Button variant="contained" style={logoutButtonStyle} onClick={handleLogout}>
                Logout
            </Button>
            <Button variant="outlined" style={newPresentationButtonStyle} onClick={handleOpen}>New presentation</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                <TextField id="presentationName" label="Presentation Name" variant="outlined" onChange={(e) => setTitle(e.target.value)} value={title}/>
                <Button variant="contained" onClick={() => { postnew(); handleClose(); }} sx={{ mt: 2 }}>Create</Button>
                </Box>
            </Modal>
        </div>
    );
};


export default Dashboard