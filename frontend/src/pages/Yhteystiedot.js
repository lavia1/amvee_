import React from "react";
import "../styles/Contact.css";
import ContactForm from "../components/ContactForm";
import { Helmet } from "react-helmet";

const Yhteystiedot = () => {
    return (
        <>
        <Helmet>
            <title>Yhteystiedot | ÄmVee Tmi, Nivala & Oulu</title>
            <meta name="description" 
            content="Ota yhteyttä ÄmVee Tmi:hin Nivalassa tai Oulussa. Sähköposti, puhelin ja osoite. BMW remontointi ja varaosamyynti"
            />
        </Helmet>
        <div>
           
           <ContactForm />
          
        </div>
        </>
    );
}

export default Yhteystiedot;
