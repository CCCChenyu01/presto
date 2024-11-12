import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const style = {
    
};

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');
        // Navigate back to login page
        navigate('/login');
    };

    return (
        <div style={style}>
            <h2>Welcome to the Dashboard</h2>
            <Button variant="contained" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
};


export default Dashboard