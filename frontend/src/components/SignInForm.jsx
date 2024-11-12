import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
}

const SignInForm=()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async()=>{
        const url = "http://localhost:5005/admin/auth/login"
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-type': 'application/json',
            },
            body:JSON.stringify({
                email,
                password,
            }),
        })
    }
    return(
        <div style={style}>
            <TextField id="email" label="email" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
            <TextField id="password" label="password" variant="outlined" onChange={(e)=>setPassword(e.target.value)}/>
            <Button variant="contained">Submit</Button>
            <Button variant="outlined">Register</Button>
        </div>
    )
}

export default SignInForm