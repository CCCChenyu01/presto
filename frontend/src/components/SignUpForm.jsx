import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
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
    gap: '1.5rem',
    padding: '2rem',
    backgroundColor: '#f0f4f8',
    fontFamily: 'Arial, sans-serif',
};

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
    const [name, setName] = useState('');
    const [error, setError] = useState(''); // State to store error messages
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const url = "http://localhost:5005/admin/auth/register";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                name,
            }),
        });
        
        const data = await response.json();
        if (response.ok && data.token) {
            // Successful registration
            localStorage.setItem('token', data.token);
            setError(''); // Clear any previous error message
            navigate('/dashboard'); // Redirect to dashboard
        } else {
            // Registration failed
            setError(data.message || "Register failed. Please check your credentials.");
        }
    };

    return (
        <div style={style}>
            <form onSubmit={register}>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    {error && (
                        <Alert variant="filled" severity="error">
                            {error}
                        </Alert>
                    )}
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField
                        id="confirmPassword"
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Stack>
            </form>
        </div>
    );
};

export default SignUpForm;
