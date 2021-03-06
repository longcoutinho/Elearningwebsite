import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/practice.css"
import axios from "axios";
import voice_icon from "../image/voice_icon.jpg"

const Practice = function(props) {
    const [abc, setabc] = useState(JSON.parse(localStorage.getItem("windowdisplaylistcard")));
    const [value, incValue] = useState(Object.keys(abc).length - 1);
    const [displaysentence, setdisplaysentence] = useState("none");
    const [displaybutton, setDisplayButton] = useState("flex");
    const [rotateState, setrotation] = useState("none");
    const [buttonstate, setButton] = useState(false);
    
    useEffect(() => {
        var xyz = [];
        var size = Object.keys(abc).length;
       for(var i = 0; i < size; i++) {
           abc[i].display = 1;
           xyz.push(abc[i]);
       }
       if (value >=0) xyz[value].display = 0;
       else {
            setdisplaysentence("flex");
            setDisplayButton("none");
       }
       setabc(xyz);
    },[]);

    function changecard() {
        var xyz = [];
        var size = Object.keys(abc).length;
        for(var i = 0; i < size; i++) {
            xyz.push(abc[i]);
        }
        xyz[value].display = 1;
        if (value >= 0) {
            if (value > 0) {
                var newvalue = value - 1;
                xyz[newvalue].display = 0;
                incValue(newvalue);
            }
            if (value == 0) {
                setdisplaysentence("flex");
                setDisplayButton("none");
            }
        }
        setabc(xyz);
        setButton(false);
    }

    function rememberhandle() {
        setrotation("none");
        //abc[0].display = 1;
        var dateNow = new Date();
        dateNow.setHours(0,0,0,0);
        const config = {
            cardname: abc[value].name,
            deck_owner: localStorage.getItem("windowdisplaydeck"),
            owner: localStorage.getItem("windowusername"),
            box: abc[value].box + 1,
            time: dateNow.toLocaleString()
        };
        axios.post("http://localhost:3001/updatecardbox", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                console.log("Update succesfully");
            }
            else {
                console.log("No!");
            }
        })
        setButton(true);
        setTimeout(changecard, 1000);
        //console.log(abc[0].display);
        
        //setrotation2("rotateY(180deg)");
        var curremem = parseInt(localStorage.getItem("windowrememberedwords"));
        localStorage.setItem("windowrememberedwords", curremem + 1);
        var curtotal = parseInt(localStorage.getItem("windowtotalwords"));
        localStorage.setItem("windowtotalwords", curtotal + 1); 
    }

    function dontrememberhandle() {
        setrotation("none");
        var dateNow = new Date();
        dateNow.setHours(0,0,0,0);
        const config = {
            cardname: abc[value].name,
            deck_owner: localStorage.getItem("windowdisplaydeck"),
            owner: localStorage.getItem("windowusername"),
            box: 1,
            time: dateNow.toLocaleString()
        };
        axios.post("http://localhost:3001/updatecardbox", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                console.log("Update succesfully");
            }
            else {
                console.log("No!");
            }
        })
        setButton(true);
        setTimeout(changecard, 1000);
        console.log(abc[value].name);
        var curtotal = parseInt(localStorage.getItem("windowtotalwords"));
        localStorage.setItem("windowtotalwords", curtotal + 1); 
    }
    
    function backhandle() {
        var dateNow = new Date();
        dateNow.setHours(0,0,0,0);
        const config = {
            owner: localStorage.getItem("windowusername"),
            time: dateNow.toLocaleString(),
            r_words: parseInt(localStorage.getItem("windowrememberedwords")),
            t_words: parseInt(localStorage.getItem("windowtotalwords")),
        };
        console.log(config);
        axios.post("http://localhost:3001/updatecountwords", config)
        .then(res=> {
            console.log(res.data);
        })
        window.location.href="/cards";
    }

    const rotatehandle = (event) => {
        if (event.target.tagName == "DIV") setrotation("rotateY(180deg)");
        //setrotation2("none");
        console.log(3);
    }

    const rotatehandle2 = (event) => {
        setrotation("none");
        //setrotation2("rotateY(180deg)");
        console.log(2);
    }

    function readOnClick(content) {
        let utterance = new SpeechSynthesisUtterance(content);
        speechSynthesis.speak(utterance);
        console.log("kk");
    }

    const Card = (props) => {
        return (
            abc.map((item) => (
                <div onClick={rotatehandle} class="cards-study-container" style={{display:  item.display ? 'none' : 'flex'}}>
                    <div class="cards-study-name" >
                        <span>{item.name}</span>
                        <span>{item.type}</span>
                    </div> 
                    <div class="cards-study-spelling">
                        <span>{item.spelling}</span>
                    </div>
                    <i onClick={() => readOnClick(item.name)} class="fa-solid fa-volume-high"></i>
                </div>
            ))
        );
    }

    const BackCard = (props) => {
        return (
            abc.map((item) => (
                <div onClick={rotatehandle2} class="cards-study-container-2" style={{display:  item.display ? 'none' : 'flex'}}>
                    
                    <div class="cards-study-meaning">
                        <span>{item.meaning}</span>
                    </div> 
                    <div class="cards-study-word">
                        <span>Synonym: {item.synonym}</span>
                        <span>Antonym: {item.antonym}</span>
                    </div>
                    <div class="cards-study-example">
                        <span>Ex: {item.example}</span>
                    </div>
                    <div class="cards-study-image">
                        <img style={{"height":"200px", "width":"200px"}} src={item.image}></img>
                    </div>
                </div>
            ))
        );
    }

    return (
        <div class="study-container">
            <div  style={{"transform":rotateState}} class="flip-card">
                <Card></Card>
                <BackCard></BackCard>
            </div>
            
            <div class="check-container">
                <button disabled={buttonstate} onClick={() => rememberhandle()} style={{display:displaybutton}} >REMEMBER</button>
                <button disabled={buttonstate} onClick={() => dontrememberhandle()} style={{display:displaybutton}}>DONT REMEMBER</button>
            </div>
            <div class="finish-sentence" style={{display:displaysentence}}>
                <p>ALL DONE!</p>
                <button onClick={backhandle}>FINISH</button>
            </div>
        </div>
    )
}
export default Practice