import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from './components/home';
import Signin from "./components/signin";
import Signup from "./components/signup";
import Decks from "./components/decks";
import Cards from "./components/cards";
import Statistic from "./components/statistic";
import Practice from "./components/practice";
import User from "./components/user";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/signin" element={<Signin/>} /> 
        <Route path="/signup" element={<Signup/>} />
        <Route path="/decks" element={<Decks/>} />
        <Route path="/cards" element={<Cards/>} />
        <Route path="/statistic" element={<Statistic/>} />
        <Route path="/practice" element={<Practice/>} />
        <Route path="/user" element={<User/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

