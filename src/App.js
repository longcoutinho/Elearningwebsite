import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from './components/Home.js';
import Signin from "./components/Signin.js";
import Signup from "./components/Signup.js";
import Decks from "./components/decks";
import Cards from "./components/cards";
import Statistic from "./components/statistic";
import Practice from "./components/practice";
import User from "./components/user";
import About from "./components/about";
import { useLayoutEffect } from "react";

const App = () => {
  const [user_logedin, setUserLogedIn] = useState('');
  const [user_displayname, setUserDisplayname] = useState('');
  const [user_username, setUserUsername] = useState('');
  const [listOfDeck, setListOfDeck] = useState([]);
  const [deckUsing, setDeckUsing] = useState('');
  const userData = {
    logedIn: user_logedin,
    displayName: user_displayname,
    username: user_username,
    listOfDeck: listOfDeck,
    deckUsing: deckUsing
}
  const callbackFunction = (userDataChangedFromChild) => {
    setUserLogedIn(userDataChangedFromChild.logedIn);
    setUserDisplayname(userDataChangedFromChild.displayName);
    setUserUsername(userDataChangedFromChild.username);
    sessionStorage.setItem('state', userDataChangedFromChild.logedIn);
    sessionStorage.setItem('displayName', userDataChangedFromChild.displayName);
    sessionStorage.setItem('username', userDataChangedFromChild.username);
  };
  useLayoutEffect(() => {
    setUserLogedIn(sessionStorage.getItem('state'));
    setUserDisplayname(sessionStorage.getItem('displayName'));
    setUserUsername(sessionStorage.getItem('username'));
    setListOfDeck(JSON.parse(sessionStorage.getItem('listOfDeck')));
    setDeckUsing(sessionStorage.getItem('deckUsing'));
  }, []);
  const changeListOfDeckFromChild = (child_data) => {
    console.log(child_data);
    setListOfDeck(child_data);
    sessionStorage.setItem('listOfDeck', JSON.stringify(child_data));
  }
  const changeDeckUsingFromChild = (child_data) => {
    setDeckUsing(child_data);
    sessionStorage.setItem('deckUsing', child_data);
  }
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' 
          element={<Home {...userData}/>} />
          <Route path="/signin" element={<Signin {...userData} 
          changeListOfDeck = {changeListOfDeckFromChild}
          parentCallback={callbackFunction}/>} /> 
          <Route path="/signup" element={<Signup/>} />
          <Route path="/decks" element={<Decks {...userData} 
          changeListOfDeck = {changeListOfDeckFromChild}
          changeDeckUsing = {changeDeckUsingFromChild}
          />}/>
          <Route path="/cards" element={<Cards 
          {...userData}
          />} />
          <Route path="/statistic" element={<Statistic {...userData}/> } />
          <Route path="/practice" element={<Practice {...userData}/>} />
          <Route path="/user" element={<User {...userData} parentCallback={callbackFunction} />} />
          <Route path="/about" element={<About {...userData} />} />
        </Routes>
      </BrowserRouter>
      
  );
}

export default App;

