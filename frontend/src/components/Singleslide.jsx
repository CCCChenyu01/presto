import React, { useEffect, useState } from 'react'; 
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { getStore } from './dataprovider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const SingleSlide = () => {
    const navigate = useNavigate();

    const handleDelete = () => {
        console.log("Deleting presentation...");
    };

    const handleBack = () => {
        navigate('/dashboard'); // back to dashboard
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
                    {/* title*/}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    
                    {/* box for delete and back */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button 
                            variant="outlined"
                            onClick={handleDelete}
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
        </Box>
    );
};

export default SingleSlide;