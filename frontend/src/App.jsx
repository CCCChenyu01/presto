import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/login" element={<SignInForm/>}></Route>
      <Route path="/register" element={<SignUpForm/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
