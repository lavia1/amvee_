import React, {useState} from "react";
import emailjs from "emailjs-com";
import "./contactform.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";


const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email) {
            setStatus("Nimi tai sähköposti puuttuu.")
            return;
        }

        const serviceId = process.env.REACT_APP_SERVICE_ID;
        const templateId = process.env.REACT_APP_TEMPLATE_ID ;
        const publicKey = process.env.REACT_APP_PUBLIC_KEY;

        // Template parameters to send with the email
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            title:title,
        };
    
        // Send the email through EmailJS
        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log("Email sent successfully", response);
                setName('');
                setEmail('');
                setMessage('');
                setTitle('');
                setStatus('Viesti lähetetty onnistuneesti :)')
            })
            .catch((error) => {
                console.log("Error sending email", error);
                setStatus('Viestin lähetys epäonnistui. Kokeile uudestaan.')
            });
    };

    return (
        <div className="checkout-container">
          <div className="contacts-section">
            <h2>Ota yhteyttä</h2>
            <a
             
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLocationDot} />
              <span className="contactText">Nivala - Oulu</span>
            </a>
            <a href="tel:+358443430792">
              <i className="fa fa-phone"></i>
              <span className="contactText">+358 443430792</span>
            </a>
            <a href="https://wa.me/+358443430792">
              <i className="fab fa-whatsapp"></i>
              <span className="contactText">+358 443430792</span>
            </a>
            <a href="mailto:amveetmi@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="contactText">amveetmi@gmail.com</span>
            </a>
      
            <div className="social-media-links">
              <a
                href="https://www.snapchat.com/add/miikka.v?share_id=x6gSUhQ3yqg&locale=fi-FI"
                className="icon-link"
              >
                <i className="fab fa-snapchat"></i>
              </a>
              <a
                href="https://www.instagram.com/miikka.valimaki?igsh=azZmYzY1a2VnOXo1"
                className="icon-link"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.tiktok.com/@amveetmi?_t=ZN-8vKVmCyJUIQ&_r=1"
                className="icon-link"
              >
                <i className="fab fa-tiktok"></i>
              </a>
              <a
                href="https://www.facebook.com/share/1AVsXGYR91/"
                className="icon-link"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://youtube.com/@valjamaki7319?si=ipuNaBfNLhcphu8d"
                className="icon-link"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
      
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <div className="form-backgroundcolor"
               style={{
                        backgroundImage: "url(/assets/engine_bmw.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                <h2>Lähetä viesti</h2>
      
                <div className="form-row">
                  <div className="col-25">
                    <label htmlFor="name">Nimi *</label>
                  </div>
                  <div className="col-75">
                    <input
                      className="inputBox"
                      id="name"
                      type="text"
                      placeholder="..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
      
                <div className="form-row">
                  <div className="col-25">
                    <label htmlFor="email">Sähköposti *</label>
                  </div>
                  <div className="col-75">
                    <input
                      className="inputBox"
                      id="email"
                      type="email"
                      placeholder="..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
      
                <div className="form-row">
                  <div className="col-25">
                    <label htmlFor="title">Aihe</label>
                  </div>
                  <div className="col-75">
                    <input
                      className="inputBox"
                      id="title"
                      type="text"
                      placeholder="..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
      
                <div className="form-row">
                  <div className="col-25">
                    <label htmlFor="message">Viesti</label>
                  </div>
                  <div className="col-75">
                    <textarea
                      className="inputBox"
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
      
                <div className="form-row">
                  <div className="buttons">
                    <button className="btn-hover color-9" type="submit">
                      Lähetä
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {status && <p>{status}</p>}
          </div>
        </div>
      );
      
};
export default ContactForm;