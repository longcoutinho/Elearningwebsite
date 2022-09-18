import React, { useEffect } from "react";
import "../styles/decks.css"
import { useState } from "react";
import axios from "axios";
import Menu from "./Menu.js";
import { useNavigate } from "react-router";
const Decks = function(props) {
    var navigate = useNavigate();
    const [adddeckstate, setStateOfAddingBox] = useState("");
    const [editdeckstate, setStateOfEditBox] = useState("");
    const [bgopacity, setBackGroundOpacity] = useState("1");
    const [searchContent, setSearchContent] = useState("");
    const [nameInputContent, setNameInput] = useState("");
    const [DescriptionInputContent, setDiscriptionInput] = useState("");
    const [notify, setNotify] = useState("");
    const [listOfDeck, setListOfDeck] = useState([]);
    const [listDisplayDeck, setListDisplayDeck] = useState([]);
    useEffect(() => {
        setListOfDeck(props.listOfDeck);
        setListDisplayDeck(props.listOfDeck);
    }, [props.listOfDeck]);

    useEffect(() => {
        setStateOfAddingBox("none");
        setStateOfEditBox("none");
    }, []);

    const addOnClick = () => {
        setStateOfAddingBox("flex");
    }
    async function closeOnClick() {
        setNotify("");
        setStateOfAddingBox("none");
        setBackGroundOpacity("1");
    }
    
    async function closeOnClick2() {
        setStateOfEditBox("none");
        setBackGroundOpacity("1");
    }

    const DeckChange = (child_data) => {
        var newDeckList = listDisplayDeck;
        for(let i = 0; i < listDisplayDeck.length; i++) {
            if (listDisplayDeck[i].name === child_data.name) {
                newDeckList[i].name = child_data.newname;
                newDeckList[i].decription = child_data.newdecription;
            }
        }
        props.changeListOfDeck(newDeckList);
    }

    const addSubmit = (event) => {
        event.preventDefault();
        const config = {
            name: event.target.deck_name.value,
            decription: event.target.deck_decription.value,
            owner: props.username,
            deckCount: 0,
            time: new Date().toLocaleDateString(),
        };

        axios.post("http://localhost:3001/adddeck", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                console.log("Add successfully");
                var newDeckList = listDisplayDeck;
                newDeckList.push(config);
                props.changeListOfDeck(newDeckList);
                event.target.reset(); 
                closeOnClick();
            }
            else {
                setNotify("Deck's already exist!")
            }
        })
        
    }

    const searchSubmit = async (event) => {
        event.preventDefault();
        var newDisplaydeck = [];
        for(let i = 0; i < listOfDeck.length; i++) {
            if (listOfDeck[i].name.startsWith(searchContent.toUpperCase()) || listOfDeck[i].name.startsWith(searchContent.toLowerCase())) {
                newDisplaydeck.push(listOfDeck[i]);
            }
        }
        setListDisplayDeck(newDisplaydeck);
    }

    function decksubmit(content) {
        props.changeDeckUsing(content);
    }

    function edithandle(item) {
        setNameInput(item.name);
        setDiscriptionInput(item.decription);
        setStateOfEditBox("flex");
        setBackGroundOpacity("0.7");
    }

    async function deletehandle(deckname) {
        console.log(deckname);
        const config = {
            name: deckname,
            owner: props.username
        };
        await axios.post("http://localhost:3001/deletedeck", config)
        .then(res=> {
            console.log(res.data);
            props.changeListOfDeck(res.data);
        });
    }

    const onChangehandle = (event) => {
        setSearchContent(event.target.value);
    }

    
    const Deck = (props) => {
        return (
            listDisplayDeck.map((item, index) => (
                <div class="decks-cards-container">
                    <div class="decks-cards-name">
                        
                        <a onClick={() => decksubmit(item.name)} href="/cards">{item.name}</a>
                        
                    </div> 
                    <div class="decks-cards-content">
                        <h1>Description: {item.decription}</h1>
                    </div>
                    <div class="decks-cards-info">
                        <div class="decks-cards-number">
                            <i class="fa-solid fa-layer-group"></i>
                            <h1>{item.deckCount}</h1>
                        </div>
                        <div class="decks-cards-date">
                            <i class="fa-solid fa-calendar-days"></i>
                            <h1>{item.time}</h1>
                        </div>
                    </div>
                    <div class="handle-icon">
                        <i onClick = {() => edithandle(item)} class="fa-solid fa-pen-to-square"></i>
                        <i onClick = {() => deletehandle(item.name)} class="fa-solid fa-trash-can"></i>
                    </div>
                </div>
            ))
        );
    }

    const AddDeck = (props) => {
        return (
            <div class="add-decks" style={{"display":props.display}}>
            <p>CREATE NEW DECK</p>
            <button class="close-button" onClick={closeOnClick}>X</button>
            <form onSubmit={addSubmit}>
                <div class="input-in4">
                    <span>Name</span>
                    <input type="text" name="deck_name" />
                </div>
                <div class="input-in4">
                    <span>Description</span>
                    <input type="text" name="deck_decription" />
                </div>
                <p>{notify}</p>
                <input type="submit" value="ADD" />
            </form>
        </div>
        )
        
    }

    const EditDeck = (props) => {
        const [name, setName] = useState("");
        const [description, setDescription] = useState("");
        useEffect(() => {
            setName(props.currentName);
            setDescription(props.currentDescription);
        },[props]);
        const editSubmit = (event) => {
            event.preventDefault();
            const config = {
                name: props.currentName,
                newname: event.target.edit_deck_name.value,
                newdecription: event.target.edit_deck_decription.value,
                owner: props.username,
            };
            axios.post("http://localhost:3001/editdeck", config)
            .then(res=> {
                console.log(res.data);
                if (res.data == "0") {
                    console.log("Edit successfully");
                    props.changeDeck(config);
                    event.target.reset(); 
                    closeOnClick2();
                }
                else {
                    setNotify("Deck's already exist!")
                }
            })
        } 
        return (
            <div class="edit-decks" style={{"display":props.display}}>
            <p>EDIT DECKS</p>
            <button class="close-button" onClick={closeOnClick2}>X</button>
            <form onSubmit={editSubmit}>
                <div class="input-in4">
                    <span>Name</span>
                    <input onChange={(e) => {setName(e.target.value)}} value={name} type="text" name="edit_deck_name" />
                </div>
                <div class="input-in4">
                    <span>Description</span>
                    <input onChange={(e) => {setDescription(e.target.value)}} value={description} type="text" name="edit_deck_decription" />
                </div>
                <p>{notify}</p>
                <input type="submit" value="EDIT" />
            </form>
        </div>
        )
    }

  return (
    <div>
        <Menu {...props}></Menu>
        <div class="decks-content" style={{"opacity":bgopacity}}>
            <div class="decks-back">
                <a href="/">&lt; Back</a>
            </div>
            <div class="decks-title">
                <h1>DECKS</h1>
            </div>
            <div class="decks-search">
                <form>
                    <input onChange={onChangehandle} type="text" name="inputdecksearch" placeholder="Search" />
                    <i onClick={searchSubmit} class="fa-solid fa-magnifying-glass" type="submit" value="search"></i>
                    
                </form>
            </div>
            <div class="decks-display">
                <div class="decks-plus">
                    <button onClick={addOnClick}><i class="fa-solid fa-plus"></i></button>
                </div>
                
                <Deck></Deck>
            </div>
        </div>
        <AddDeck display={adddeckstate}  ></AddDeck>
        <EditDeck display={editdeckstate} 
        currentName={nameInputContent} 
        currentDescription={DescriptionInputContent}
        username={props.username}
        changeDeck={DeckChange}></EditDeck>
    </div>
  )
}
export default Decks;