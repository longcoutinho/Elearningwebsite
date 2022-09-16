import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/user.css";
import axios from "axios";
import delete_icon from "../image/delete_icon.jpg"
import Menu from "./Menu";
const User = function(props) {
    
    var state = {
        users: [
        ]
      };
    const [abc, setabc] = useState(state.users);
    const signoutOnclick = () => {
        const userData = {
            logedIn: 'false',
            displayName: "",
            username: ""
        }
        props.parentCallback(userData);
        window.location.href="/signin";
    }
    const [displayusercard, setDisplayUser] = useState("flex");
    const [displaychangename, setDisplayChangeName] = useState("none");
    const [displaychangepassword, setDisplayChangePassword] = useState("none");
    const [searchContent, setSearchContent] = useState("");

    async function listofUserCards(text) {
        const config = {

        };
        var returnValue = [];
        await axios.post("http://localhost:3001/searchaccount", config)
        .then(res=> {
            returnValue = res.data;
        })
        var newarr = [];
        for(let i = 0; i < returnValue.length; i++) {
            if (returnValue[i].username.startsWith(text)) newarr.push(returnValue[i]);
        }
        console.log(returnValue);
        return newarr;
    }   
    
    const changenamesubmit = async (event) => {
        event.preventDefault();
        const config = {
            username: localStorage.getItem("windowusername"),
            newname: event.target.new_displayname_user.value,
        };
        axios.post("http://localhost:3001/changedisplaynameuser", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                localStorage.setItem("windowdisplayname", config.newname);
                window.location.reload(false);
            }
            else {
                console.log("Deck da ton tai!");
            }
        })
    }
    
    const changepasswordsubmit = async (event) => {
        event.preventDefault();
        console.log(1);
        const config = {
            username: localStorage.getItem("windowusername"),
            oldpassword: event.target.old_password_user.value,
            newpassword: event.target.new_password_user.value,
            confirmpassword: event.target.confirm_password_user.value
        };
        if (config.newpassword == config.confirmpassword) {
            axios.post("http://localhost:3001/changepassworduser", config).then(res=> {
                console.log(res.data);
                if (res.data == "0") {
                    console.log("Changed password!")
                }
                else {
                    console.log("Deck da ton tai!");
                }
            })
        }
        else {
            console.log("Password doesn't match");
        }
    }
    

    useEffect( async () => {
        if (localStorage.getItem("windowusername") == "admin") {
            setDisplayUser("flex");
        }
        else {
            setDisplayUser("none");
        }
        await listofUserCards("").then(value => {
            setabc(value);
        })
        
    },[]);
    
    async function deletehandle(username) {
        const config = {
            username: username,
        };
        console.log(config);
        await axios.post("http://localhost:3001/deleteuser", config)
        .then(res=> {
            console.log(res.data);
            setabc(res.data);
        });
    }

    function onChangehandle(event) {
        console.log(event.target.value);
        setSearchContent(event.target.value);
    }

    async function onClickhandle() {
        await listofUserCards(searchContent).then(value => {
            setabc(value);
        })
    }

    const UserCard = () => {
        return (
            abc.map((item, index) => (
                <div class="user-card-container" style={{display:displayusercard}}>

                   
                    
                    <table id="admin">

                        <tr>
                            <td >{index + 1}</td>
                            <td > {item.username}</td>
                            <td >{item.password}</td>
                            <td > <img class = "delete-icon" onClick = {() => deletehandle(item.username)} src={delete_icon} /></td>
                        </tr>
                        
                    </table>

                </div>
            ))
        );
    }
    
    function changenamehandle() {
        setDisplayChangeName("flex");
    }

    function changepasswordhandle() {
        setDisplayChangePassword("flex");
    }
    return (
        <div class="user-container">
            <Menu {...props}></Menu>
            <div class="title-user-info">
                <p>Thong tin ca nhan</p>
            </div>
            <div class="gg" >
                <table id="user">

                <tr>
                    <td >Username</td>
                    <td >{localStorage.getItem("windowusername")}</td>
                    <td ></td>
                </tr>
                <tr>
                    <td >Display name</td>
                    <td >{localStorage.getItem("windowdisplayname")}</td>
                    <td ><button onClick={() => changenamehandle()}>CHANGE </button></td>
                </tr>
                <tr>
                    <td >Password</td>
                    <td >********</td>
                    <td ><button onClick={() => changepasswordhandle()}>CHANGE </button></td>
                </tr>
                </table>
                {/* <p>Name: {localStorage.getItem("windowdisplayname")} </p>
                <button onClick={() => changenamehandle()}>CHANGE NAME</button> */}
            </div>


            <div class="sign-out"><button class="btn-signout" onClick={signoutOnclick}>Sign out </button></div>
            <form onSubmit={changenamesubmit} class="change-name-container" style={{display:displaychangename}}>
                <label>
                    New name:
                </label>
                <input type="text" name="new_displayname_user"/>
                <input type="submit" value="CHANGE" />
            </form>


            <form onSubmit={changepasswordsubmit} class="change-password-container" style={{display:displaychangepassword}}>
                <div class="input-password">
                    <label> Old password</label>
                    <input type="password" name="old_password_user"/>
                </div>
                <div class="input-password">
                    <label>New password</label>
                    <input type="password" name="new_password_user"/>
                </div>
                <div class="input-password">
                    <label>Confirm password</label>
                    <input type="password" name="confirm_password_user"/>
                </div>
                <div class="input-password">
                <input type="submit" value="CHANGE" />
                </div>
            </form>
            
            <p class="user-list-title" style={{display:displayusercard}}>Danh sach user</p>
            <div style={{display:displayusercard}} class="user-search-container">
                <input onChange={onChangehandle} placeholder="Search" type="text"></input>
                <i onClick={onClickhandle} class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div class="display-user-card" style={{display:displayusercard}}>
                <table id="admin">
                    <tr>
                        <th >STT</th>
                        <th >Username</th>
                        <th >Password</th>
                        <th >Action</th>
                    </tr>
                </table>
                <UserCard></UserCard>
            </div>
           
        </div>
    )
}

export default User
