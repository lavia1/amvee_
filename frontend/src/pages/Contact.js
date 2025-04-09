import React from "react";
import Banner from "../components/Banner";
import "../styles/Contact.css";
import ContactForm from "../components/ContactForm";

const Contact = () => {
    return (
        <div>
            <Banner
                title="Yhteystiedot"
                imageUrl="/assets/banner.JPG"
            />
           <ContactForm />
          
        </div>
    );
}

export default Contact;
