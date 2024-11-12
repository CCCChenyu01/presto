import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; 

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8', 
    gap: '1.5rem',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
};

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div style={style}>
            {/* use Typography show welcome */}
            <Typography variant="h4" component="h1">
                Welcome to Presto!
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate('/login')} // jump to /login
            >
                Login
            </Button>
            <Button
                variant="outlined"
                onClick={() => navigate('/register')} // jump to /register
            >
                Register
            </Button>
        </div>
    );
};


export default LandingPage