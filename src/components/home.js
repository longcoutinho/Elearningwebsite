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
                    <h3>Đường cong lãng quên</h3>
                    <p class="problem-text">Hơn một thế kỷ trước, Hermann Ebbinghaus – một bác sĩ tâm thần học và nhà vật lý người Đức – đã cho ra đời một định lý mang tên ông hay còn gọi là định lý Đường cong lãng quên (Forgetting Curve).Trong định lý này, ông giả định: Nếu một người có trí nhớ hoàn hảo và có khả năng nhớ 100% những gì được giảng dạy trên lớp thì 20 phút saukhi tan lớp, anh ta chỉ còn nhớ khoảng 58,2%bài, 1 giờ sau còn 44,2%... Cứ thế cho đến đúng 1 tháng sau, anh ta chỉ còn nhớ được21,1%.

                    </p>
                    <button class="read-btn">
                            <a href="#">Read more</a>
                    </button>
                </div>
            </div>
            <div class="solution">
                <div class="solution-content">
                    <h3>Spaced Repetition - Hệ thống Leitner</h3>
                    <span>Kỹ thuật lặp lại ngắt quãng (Spaced Repetition) của Hermann Ebbinghaus là kỹ thuật gia tăng thời gian giữa những lần ôn tập để khai thác hiệu ứng tâm lý ngắt quãng (spacing effect), giúp cải thiện khả năng ghi nhớ cùng một khối lượng nội dung trong một khoảng thời gian trải dài.</span> <br/>
                    <span> “Hệ thống Leitner” – hệ thống giúp ôn tập nhiều lần để đạt được các thành tích thông qua việc sử dụng flashcards</span><br/>
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
                <div>Address: Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội</div>
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