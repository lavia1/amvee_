import React from "react";
import Banner from "../components/Banner";
import "../styles/Contact.css";
import ContactForm from "../components/ContactForm";

const Contact = () => {
    return (
        <div>
            <Banner
                title="Yhteystiedot"
                imageUrl="/assets/interior_banner.jpg"
            />
           <ContactForm />
          
        </div>
    );
}

export default Contact;
