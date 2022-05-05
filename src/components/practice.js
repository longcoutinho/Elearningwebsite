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

    function rememberhandle() {
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
        //console.log(abc[0].display);
        //setrotation("none");
        //setrotation2("rotateY(180deg)");
        var curremem = parseInt(localStorage.getItem("windowrememberedwords"));
        localStorage.setItem("windowrememberedwords", curremem + 1);
        var curtotal = parseInt(localStorage.getItem("windowtotalwords"));
        localStorage.setItem("windowtotalwords", curtotal + 1); 
    }

    function dontrememberhandle() {
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

    function rotatehandle2() {
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
                    <img class="voice-icon" onClick={() => readOnClick(item.name)} src={voice_icon} />
                     <div class="cards-study-name" >
                            <h1>{item.name}</h1>
                        </div> 
                        <div class="card-study-type">
                            <h1>{item.type}</h1>
                        </div>
                        <div class="cards-study-spelling">
                            <h1>{item.spelling}</h1>
                        </div>
                </div>
            ))
        );
    }

    const BackCard = (props) => {
        return (
            abc.map((item) => (
                <div onClick={rotatehandle2} class="cards-study-container-2" style={{display:  item.display ? 'none' : 'flex'}}>
                    <img style={{"height":"200px", "width":"200px"}} src={item.image}></img>
                    <div class="cards-study-name">
                        <h1>{item.meaning}</h1>
                    </div> 
                    <div class="card-study-type">
                        <h1>{item.synonym}</h1>
                    </div>
                    <div class="cards-study-name">
                        <h1>{item.antonym}</h1>
                    </div>
                    <div class="cards-study-spelling">
                        <h1>{item.example}</h1>
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
                <button onClick={() => rememberhandle()} style={{display:displaybutton}} >REMEMBER</button>
                <button onClick={() => dontrememberhandle()} style={{display:displaybutton}}>DONT REMEMBER</button>
            </div>
            <div class="finish-sentence" style={{display:displaysentence}}>
                <p>ALL DONE!</p>
                <button onClick={backhandle}>FINISH</button>
            </div>
        </div>
    )
}
export default Practice