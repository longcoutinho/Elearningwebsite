import React from "react";
import "../styles/home.css";
import pic_bg_content from "../image/pripic.jpg";
import { useState } from "react";
import { useEffect } from "react";
import logo from "../image/liverpool.png"
import duongcong from "../image/duongcong.png";
import box from "../image/76867.png"

const Test = function(props) {
    const [userinfostate, setDisplay] = useState(localStorage.getItem("windowuserinfoboxstate"));
    const [loginsignupstate, setDisplay2] = useState(localStorage.getItem("windowloginboxstate"));
    const signoutOnclick = () => {
        setDisplay("none");
        setDisplay2("block");
        localStorage.setItem("windowuserinfoboxstate", "none");
        localStorage.setItem("windowloginboxstate", "block");
        localStorage.setItem("windowusername", "");
        window.location.href="/";
    }
    const [decklink, setDecklink] = useState("#"); 

    useEffect( () => {
        console.log(localStorage.getItem("windowusername"));
        if (localStorage.getItem("windowusername") =="") {
            setDecklink("/signin");
        }
        else {
            setDecklink("/decks");
        }
    },[]);
  return (
    
    <div>
        {/* header menu */} 
        <div class="container-fluid">
            {/* logo */} 
            <div class="header-logo">
                <span>IamRoht</span>
            </div>
            {/* menu */}
            <div class="header-menu collapse navbar-collapse" id="navbarResponsive">
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav__item"><a href="/" class="nav__link active">Home</a></li>
                    <li class="nav__item"><a href={decklink} class="nav__link">Decks</a></li>
                    <li class="nav__item"><a href="/statistic" class="nav__link">Statistics</a></li>
                    <li class="nav__item"><a href="/about" class="nav__link">About</a></li>
                </ul>
            </div>

            <div class="user-info" style={{display:userinfostate}}>
                <div class="user-displayname">
                    <span>Hello, </span>
                    <a href="/user">{localStorage.getItem("windowdisplayname")}</a>
                </div>
            </div>

            {/* signin signup */}
            <div class="header-signin collapse navbar-collapse" id="navbarResponsive" style={{display:loginsignupstate}}>
                <span class="btn signin"><a href="/signin">Sign in </a></span>
                <span class="btn-or"> / </span>
                <span class="btn signup"><a href="/signup">Sign up</a></span>
            </div>
        </div>

        {/* study now, be proud later */} 
        <div class="content-container">
			<img class="content-picture" src={pic_bg_content} />
			<div class="carousel-caption">
				<h1 class="display-2">Study now </h1>
				<h1 class="display-2">be proud later</h1>
				<button type="button" class="content-btn"><a href="#">Get started</a></button>
			</div>
		</div>
        
         {/* 3 cols learn anything */}
         <div class="learning-container">
            <div class="learning-content">
            <i class="fa-solid fa-box-archive"></i>
                <h3>Learn anything</h3>
            </div>
            <div class="learning-content">
            <i class="fa-solid fa-box-archive"></i>
                <h3>Learn anytime</h3>
            </div>
            <div class="learning-content">
            <i class="fa-solid fa-box-archive"></i>
                <h3>Learn anywhere</h3>
            </div>
        </div>    

         {/* pp */}
         <div class="about">
            <div class="problem">
                <img src={duongcong}/>
                <div class="problem-content">
                    <h3>???????ng cong l??ng qu??n</h3>
                    <p class="problem-text">H??n m???t th???? k??? tr?????c, Hermann Ebbinghaus ??? m???t b??c s?? t??m th????n h???c v?? nh?? v???t l?? ng?????i ?????c ??? ???? cho ra ?????i m???t ?????nh l?? mang t??n ??ng hay c??n g???i l?? ?????nh l?? ???????ng cong l??ng qu??n (Forgetting Curve).Trong ?????nh l?? n??y, ??ng gi??? ?????nh: N????u m???t ng?????i c?? tr?? nh??? ho??n h???o v?? c?? kh??? n??ng nh??? 100% nh???ng g?? ???????c gi???ng d???y tr??n l???p th?? 20 ph??t saukhi tan l???p, anh ta ch??? c??n nh??? kho???ng 58,2%b??i, 1 gi??? sau c??n 44,2%... C??? th???? cho ??????n ????ng 1 th??ng sau, anh ta ch??? c??n nh??? ???????c21,1%.

                    </p>
                    <button class="read-btn">
                            <a href="#">Read more</a>
                    </button>
                </div>
            </div>
            <div class="solution">
                <div class="solution-content">
                    <h3>Spaced Repetition - H??? th???ng Leitner</h3>
                    <span>K??? thu???t l???p l???i ng???t qu??ng (Spaced Repetition) c???a Hermann Ebbinghaus l?? k??? thu???t gia t??ng th???i gian gi???a nh???ng l???n ??n t???p ????? khai th??c hi???u ???ng t??m l?? ng???t qu??ng (spacing effect), gi??p c???i thi???n kh??? n??ng ghi nh??? c??ng m???t kh???i l?????ng n???i dung trong m???t kho???ng th???i gian tr???i d??i.</span> <br/>
                    <span> ???H??? th???ng Leitner??? ??? h??? th???ng gi??p ??n t???p nhi???u l???n ????? ?????t ???????c c??c th??nh t??ch th??ng qua vi???c s??? d???ng flashcards</span><br/>
                    <button class="read-btn">
                        <a href="#">Read more</a>
                    </button>
                </div>
                <img src={box} />

            </div>
        </div>

        {/* footer */}
        <div class="footer-container">
            <div class="info-footer">
                <div>Hotline: 0363137565</div>
                <div>Address: Tr???n B??nh, Mai D???ch, C???u Gi???y, H?? N???i</div>
                <div>Email: <a href="">maitho3101@gmail.com</a> </div>
            </div>
            <div class="contactus">
                <h3>Contact us: </h3>
                <div class="social">
                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
        </div>

    </div>
  )
}
 
export default Test;