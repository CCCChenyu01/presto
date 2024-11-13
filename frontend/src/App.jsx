import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import LandingPage from './components/LandingPage';
import Dashboard from './components/dashboard';
import SingleSlide from './components/Singleslide';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/login" element={<SignInForm/>}></Route>
        <Route path="/register" element={<SignUpForm/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/presentation/:id/:currentIndex" element={<SingleSlide/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
