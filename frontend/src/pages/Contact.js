import React from "react";
import Banner from "../components/Banner";
import "../styles/Contact.css";
import ContactForm from "../components/ContactForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
    return (
        <div>
            <Banner
                title="Yhteystiedot"
                imageUrl="/assets/banner.JPG"
            />
           
            <div className="row">
                <div className="column-smaller">
                    <div className="card">
                        <h2>Ota yhteyttä:</h2>
                            <a href="tel:+358443430792" className="contact-link">
                                <i className="fa fa-phone"></i>
                                <span className="contact-text">+358 44 3430792</span>
                            </a>
                            <a href="https://wa.me/+358443430792" className="contact-link">
                                <i className="fa fa-whatsapp"></i>
                                <span className="contact-text">+358 44 3430792</span>
                            </a>
                            <a href="mailto:amveetmi@gmail.com" className="contact-link">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span className="contact-text">amveetmi@gmail.com</span>
                            </a>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                    <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
