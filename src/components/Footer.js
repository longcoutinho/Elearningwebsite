import React from "react";
const Footer = (props) => {
    return (
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
    )
}

export default Footer;