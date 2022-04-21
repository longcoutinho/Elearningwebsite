import React, { useEffect } from "react";
import "../styles/decks.css"
import { useState } from "react";
import axios from "axios";
import edit_icon from "../image/edit_icon.png"
import delete_icon from "../image/delete_icon.jpg"
import { VAR_STRING } from "mysql/lib/protocol/constants/types";

const Decks = function(props) {
    var state = {
        users: [
        ]
      };
    const [userinfostate, setDisplay] = useState(localStorage.getItem("windowuserinfoboxstate"));
    const [loginsignupstate, setDisplay2] = useState(localStorage.getItem("windowloginboxstate"));
    const [adddeckstate, setStateOfAddingBox] = useState("none");
    const [editdeckstate, setStateOfEditBox] = useState("none");
    const [bgopacity, setBackGroundOpacity] = useState("1");
    useEffect( async () => {
        await listofDecks(localStorage.getItem("windowusername"), "").then(value => {
            setabc(value);
        })
    },[]);
    const [abc, setabc] = useState(state.users);
    const signoutOnclick = () => {
        setDisplay("none");
        setDisplay2("block");
        localStorage.setItem("windowuserinfoboxstate", "none");
        localStorage.setItem("windowloginboxstate", "block");
        localStorage.setItem("windowusername", "");
        console.log("1");
        window.location.href="/";
    }
    const addOnClick = () => {
        setStateOfAddingBox("flex");
        setBackGroundOpacity("0.7");
        //state.users = abc;
        //console.log(state.users);
    }
    async function closeOnClick() {
        setStateOfAddingBox("none");
        setBackGroundOpacity("1");
        await listofDecks(localStorage.getItem("windowusername"), "").then(value => {
            setabc(value);
        })
    }
    
    async function closeOnClick2() {
        setStateOfEditBox("none");
        setBackGroundOpacity("1");
        await listofDecks(localStorage.getItem("windowusername"), "").then(value => {
            setabc(value);
        })
    }

    async function listofDecks(username, nameOfDeck) {
        const config = {
            username: username,
            nameOfDeck: nameOfDeck
        };
        var returnValue = [];
        await axios.post("http://localhost:3001/searchdeck", config)
        .then(res=> {
            //localStorage("arrayOfDecks", res.data);
            //console.log(JSON.parse(res.data));
            //console.log(res.data);
            //var obj = JSON.parse(res.data);
            //console.log(obj[0]);
            var currentValue = res.data;
            for(let i = 0; i < currentValue.length; i++) {
                if (currentValue[i].name.startsWith(nameOfDeck)) {
                    returnValue.push(currentValue[i]);
                }
            }
        })
        return returnValue;
    }

    const addSubmit = (event) => {
        event.preventDefault();
        const config = {
            name: event.target.deck_name.value,
            decription: event.target.deck_decription.value,
            owner: localStorage.getItem("windowusername"),
            deckCount: 0,
            time: new Date().toLocaleString(),
        };
        axios.post("http://localhost:3001/adddeck", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                console.log("Add successfully");
            }
            else {
                console.log("Deck da ton tai!");
            }
        })
        
    }

    const editSubmit = (event) => {
        event.preventDefault();
        const config = {
            name: localStorage.getItem("windowdisplaydeckname"),
            newname: event.target.edit_deck_name.value,
            newdecription: event.target.edit_deck_decription.value,
            owner: localStorage.getItem("windowusername"),
        };
        axios.post("http://localhost:3001/editdeck", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                console.log("Edit successfully");
            }
            else {
                console.log("Deck da ton tai!");
            }
        })
        
    }

    const searchSubmit = async (event) => {
        console.log(1);
        event.preventDefault();
        await listofDecks(localStorage.getItem("windowusername"), event.target.inputdecksearch.value).then(value => {
            setabc(value);
        })
    }

    function decksubmit(content) {
        localStorage.setItem("windowdisplaydeck", content);
    }

    async function edithandle(name) {
        setStateOfEditBox("flex");
        setBackGroundOpacity("0.7");
        localStorage.setItem("windowdisplaydeckname", name);
    }

    async function deletehandle(deckname) {
        console.log(deckname);
        const config = {
            name: deckname,
            owner: localStorage.getItem("windowusername")
        };
        await axios.post("http://localhost:3001/deletedeck", config)
        .then(res=> {
            console.log(res.data);
            setabc(res.data);
        });
    }

    const Deck = (props) => {
        return (
            abc.map((item, index) => (
                <div class="decks-cards-container">
                    <div class="decks-cards-name">
                        
                        <a onClick={() => decksubmit(item.name)} href="/cards">{item.name}</a>
                        
                    </div> 
                    <div class="decks-cards-content">
                        <h1>Description: {item.decription}</h1>
                    </div>
                    <div class="decks-cards-info">
                        <div class="decks-cards-number">
                            <h1>{item.deckCount}</h1>
                        </div>
                        <div class="decks-cards-date">
                            <h1>{item.time}</h1>
                        </div>
                    </div>
                    <div class="handle-icon">
                        <img onClick = {() => edithandle(item.name)} src={edit_icon} />
                        <img onClick = {() => deletehandle(item.name)} src={delete_icon} />
                    </div>
                </div>
            ))
        );
    }
  return (
    <div>
        {/* header menu */} 
        <div class="container-fluid">
            {/* logo */} 
            <div class="header-logo">
                <span class="name">IamRoht</span>
            </div>
            {/* menu */}
            <div class="header-menu collapse navbar-collapse" id="navbarResponsive">
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav__item"><a href="/" class="nav__link active">Home</a></li>
                    <li class="nav__item"><a href="/decks" class="nav__link">Decks</a></li>
                    <li class="nav__item"><a href="/statistic" class="nav__link">Statistics</a></li>
                    <li class="nav__item"><a href="#" class="nav__link">About</a></li>
                </ul>
            </div>
            <div class="user-info" style={{display:userinfostate}}>
                <div class="user-displayname">
                    <span>Hello, </span>
                    <a href="/user">{localStorage.getItem("windowdisplayname")}</a>
                </div>
                <button onClick={signoutOnclick}>Sign out </button>
            </div>

            {/* signin signup */}
            <div class="header-signin collapse navbar-collapse" id="navbarResponsive" style={{display:loginsignupstate}}>
                <span class="btn signin"><a href="/signin">Sign in </a></span>
                <span class="btn-or"> / </span>
                <span class="btn signup"><a href="/signup">Sign up</a></span>
            </div>
        </div>
        <div class="decks-content" style={{"opacity":bgopacity}}>
            <div class="decks-back">
                <a href="/">&lt; Back</a>
            </div>
            <div class="decks-title">
                <h1>DECKS</h1>
            </div>
            <div class="decks-search">
                <button onClick={addOnClick}>ADD</button>
                <form onSubmit={searchSubmit}>
                    <input type="text" name="inputdecksearch" />
                    <input type="submit" value="SEARCH" />
                </form>
            </div>
            <div class="decks-display">
                <Deck></Deck>
            </div>
        </div>
        <div class="add-decks" style={{"display":adddeckstate}}>
            <p>ADD DECKS</p>
            <button class="close-button" onClick={closeOnClick}>X</button>
            <form onSubmit={addSubmit}>
                <label>NAME</label>
                <input type="text" name="deck_name" />
                <label>DECRIPTION</label>
                <input type="text" name="deck_decription" />
                <input type="submit" value="ADD" />
            </form>
        </div>
        
        <div class="edit-decks" style={{"display":editdeckstate}}>
            <p>EDIT DECKS</p>
            <button class="close-button" onClick={closeOnClick2}>X</button>
            <form onSubmit={editSubmit}>
                <label>NAME</label>
                <input type="text" name="edit_deck_name" />
                <label>DECRIPTION</label>
                <input type="text" name="edit_deck_decription" />
                <input type="submit" value="EDIT" />
            </form>
        </div>

    </div>
  )
}
export default Decks;