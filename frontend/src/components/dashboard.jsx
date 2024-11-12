import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const style = {
    
};

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');
        // Navigate back to login page
        navigate('/');
    };

    return (
        <div style={style}>
            <Button variant="contained" onClick={handleLogout}>
                Logout
            </Button>
            <Button variant="outlined" onClick={createNewPresentation}>
                New presentation
            </Button>
        </div>
    );
};


export default Dashboard