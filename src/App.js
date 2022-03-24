import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from './components/home';
import Signin from "./components/signin";
import Signup from "./components/signup";
import Decks from "./components/decks";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/signin" element={<Signin/>} /> 
        <Route path="/signup" element={<Signup/>} />
        <Route path="/decks" element={<Decks/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
