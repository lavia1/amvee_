import React from "react";
import "./footer.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot} from "@fortawesome/free-solid-svg-icons";



const Footer = () => {
    return(
        <div className="footer">
             <a 
                href="https://www.google.com/maps?q=Ruuskanpääntie+99+85660+Nivala" 
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
             >
                <FontAwesomeIcon icon={faLocationDot} />
                <span className="footer-text">Ruuskanpääntie 99 85660 Nivala</span>
            </a>
            <a href="tel:+358443430792" className="footer-link">
                <i className="fa fa-phone"></i>
                <span className="footer-text">+358 443430792</span>
            </a>
            <a href="https://wa.me/+358443430792" className="footer-link">
                <i className="fab fa-whatsapp"></i>
                <span className="footer-text">+358 443430792</span>
            </a>
            <a href="mailto:amveetmi@gmail.com" className="footer-link">
                <FontAwesomeIcon icon={faEnvelope} />
                <span className="footer-text">amveetmi@gmail.com</span>
            </a>
            <div className="social-media-links">
                <a href="https://www.snapchat.com/add/miikka.v?share_id=x6gSUhQ3yqg&locale=fi-FI" className="footer-link">
                    <i className="fab fa-snapchat"></i>
                 </a>
                <a href="https://www.instagram.com/miikka.valimaki?igsh=azZmYzY1a2VnOXo1" className="footer-link">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.tiktok.com/@amveetmi?_t=ZN-8vKVmCyJUIQ&_r=1" className="footer-link">
                    <i className="fab fa-tiktok"></i>
                </a>
                <a href="https://www.facebook.com/share/1AVsXGYR91/" className="footer-link">
                    <i className="fab fa-facebook"></i>
                </a>
                <a href="https://youtube.com/@valjamaki7319?si=ipuNaBfNLhcphu8d" className="footer-link">
                    <i className="fab fa-youtube"></i>
                </a>
            </div>
           
            <p className="copyright">Copyright © 2025 ÄmVee Tmi</p>
        </div>
    )
}

export default Footer;