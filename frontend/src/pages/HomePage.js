import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import {Helmet} from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/HomePage.css"
import ProductCard from '../components/ProductCard';
import Axios from "axios";


const HomePage = () => {
    const [randomParts, setRandomParts] = useState([]);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/parts`);
                const availableParts = response.data.filter(part => part.stock > 0);

                const shuffled = availableParts.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 4);
                setRandomParts(selected);
            } catch (error) {
                console.error("Failed to fetch parts", error);
            }
        };
        fetchParts();
    }, []);

    return (
        <>
        <Helmet>
            <title>BMW korjaus Nivala & Oulu | Ämvee Tmi </title>
            <meta 
                name="description"
                content="BMW sähkökorjaus, remontointi ja varaosamyynti Nivala-Oulu"
            />
        </Helmet>
        <div>
             <Banner
                title="ÄmVee Tmi"
                subtitle={
                    <>
                    BMW sähkökorjaus, huolto ja varaosien myyntiliike 
                    <br /> 
                    
                    Nivala - Oulu
                </>}
                imageUrl="/assets/car_bmw.jpg"
                className="home-banner"
            />
            <h1 style={{ display: "none" }}>
            BMW sähkökorjaus ja varaosat Nivala & Oulu
            </h1>

        <div className="information-container">
  {/* Left - Offer */}
  <div className="offer-section">
    <h2 className="offer-title">Ajankohtaiset tarjoukset</h2>
    
    <p className="offer-text">E-sarjan 6HP XHP -lootasoftat vain 120e</p>
     <Link to ="/Palvelut#ohjelmointi" className="offer-button">
    Tutustu →
    
    </Link>
  </div>

  {/* Center - Text */}
  <div className="information-text">
    <p>
      Korjaamme ja huollamme sähköjärjestelmät, teemme peruskorjaukset, jälkivarustelut sekä moottorin ja vaihteiston ohjelmoinnit. Hoidamme myös leimaremontit – ei pelkästään BMW:lle, vaan muillekin merkeille.
    </p>
    <p><Link to="/Palvelut" className="palvelutLinkki">
            <span>Palveluihin</span></Link> kuuluu mm. JBPerformance GM -ohjelmat, jakoketjuremontit sekä vikakoodien luku.</p>
    <p>
      Jos kiinnostuit 
      <Link className="information-link" to="/Yhteystiedot">
        ota yhteyttä  
      </Link> 
    </p>
  </div>

  {/* Right - Image */}
  <div className="information-image">
    <img src="/assets/bmw_etukuva.jpg" alt="BMW headlights" />
  </div>
</div>

        

        </div>
    </>
    );
};
export default HomePage;