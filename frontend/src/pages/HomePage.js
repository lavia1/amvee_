import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
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
        <div>
             <Banner
                title="ÄmVee Tmi"
                subtitle=" BMW sähkökorjaus, remontointi ja varaosien myyntiliike"
                imageUrl="/assets/car_bmw.jpg"
                className="home-banner"
            />
        <div className="information-container">
            <div className="information-text">
                <p>
                    Korjaamme ja huollamme sähköjärjestelmät, teemme peruskorjaukset, jälkivarustelut sekä moottorin ja vaihteiston ohjelmoinnit. Hoidamme myös leimaremontit – ei pelkästään BMW:lle, vaan muillekin merkeille.
                </p>
                <p>Jos kiinnostuit 
                    <Link className="information-link" to = "/Contact">
                    ota yhteyttä  
                    </Link> 
                </p>
            </div>
            <div className="information-image">
                <img src="/assets/bmw-front.jpg" alt="BMW headlights" />
            </div>
        </div>

        
        <div className="Carparts-section">
            <h1>Tutustu osiin: </h1>
                <div className="parts-review-row">
                    {randomParts.length > 0 ? (
                        randomParts.map((part) => (
                        <ProductCard key={part.part_number} part={part} />
                    ))
                ) : (
                <p>Ladataan osia...</p>
                )}
                </div>
                <div className="view-all-button-wrapper">
                    <Link className="view-all-button" to = "/CarParts"> 
                        Siirry koko valikoimaan  <FontAwesomeIcon icon = {faArrowRight} className="right-icon"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default HomePage;