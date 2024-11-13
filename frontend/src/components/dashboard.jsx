import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MediaCard from './Card';
import { getStore } from './dataprovider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { blue } from '@mui/material/colors';

// Modal的样式
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

// AppBar按钮样式
const toolbarButtonStyle = {
    marginLeft: '10px',
    color: blue[500],
    backgroundColor: '#fff',
    border: `1px solid ${blue[500]}`,
    '&:hover': {
        backgroundColor: blue[50],
    },
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [presentation, setPresentation] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };



export default Dashboard;
