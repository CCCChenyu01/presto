import React, { useState } from 'react'; 
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',  
    gap: '1rem',  
    padding: '1.5rem',
    backgroundColor: '#f5f5f5',  
    borderRadius: '8px', 
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',  
};

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [error, setError] = useState(false); // New state for error

    const login = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5005/admin/auth/login";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log("Login!");
            setError(false); // Clear any previous error if login is successful
            navigate('/dashboard')
        } else {
            console.error("Login failed!");
            setError(true); // Set error state to true to display the alert
        }
    };

    return (
        <div style={style}>
            <form onSubmit={login}>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    {error && (
                        <Alert variant="filled" severity="error">
                            Login failed. Please check your credentials.
                        </Alert>
                    )}
                    <TextField id="email" label="email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                    <TextField id="password" label="password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" variant="contained" >Submit</Button>
                    <Button variant="outlined" onClick={() => navigate('/register')}>Register</Button>
                </Stack>
            </form>
        </div>
    );
};

export default SignInForm;