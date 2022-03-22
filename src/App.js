import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from './components/home';
import Signin from "./components/signin";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/sigin" element={<Signin/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

