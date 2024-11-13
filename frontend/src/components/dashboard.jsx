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

    const postnew = () => {
        getStore()
        .then((data) => {
            const storeData = data.store && typeof data.store === "object" ? data.store : {};
            console.log(storeData)
            const keys = Object.keys(storeData);
            const newId = keys.length > 0 ? Math.max(...keys.map(Number)) + 1 : 1;
            //const newId = Object.keys(storeData).length + 1;
            storeData[newId] = { "title": title, "1": {} };

            const userToken = localStorage.getItem('token');
            const url = 'http://localhost:5005/store';
            return fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({ store: storeData }),
            })
            .then((res) => {
                getPresentation();
            });
        });
    };

    const getPresentation = () => {
        getStore()
            .then(data => {
                setPresentation(data.store);
            });
    };

    useEffect(() => {
        getPresentation();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* 左侧的 Presto 文字和 New presentation 按钮 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Typography variant="h6" component="div">
                            Presto
                        </Typography>
                        <Button 
                            variant="outlined" 
                            onClick={handleOpen}
                            sx={toolbarButtonStyle}
                        >
                            New presentation
                        </Button>
                    </Box>
                    
                    {/* 右侧的 Logout 按钮 */}
                    <Button 
                        variant="contained" 
                        color="error"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Cards 容器 */}
            <Box sx={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                <MediaCard presentation={presentation}/>
            </Box>

            {/* New Presentation 模态框 */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <TextField 
                        id="presentationName" 
                        label="Presentation Name" 
                        variant="outlined" 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title}
                    />
                    <Button 
                        variant="contained" 
                        onClick={() => { postnew(); handleClose(); }} 
                        sx={{ mt: 2 }}
                    >
                        Create
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default Dashboard;
