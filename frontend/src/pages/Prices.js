import React from "react";
import Banner from "../components/Banner";
import "../styles/Prices.css";

const Pricing = () => {
    return(
        <div>
            <Banner 
                title="Hinnasto"
                imageUrl="/assets/m_logo_banner.jpg"
            />
        <div className="priceContainer">
        {/* Pricing page content */}  
        <table className = "priceTable">
            <tbody>
                <tr>
                    <td>Tuntiveloitus</td>
                    <td>55 e/h</td>
                </tr>
                <tr>
                    <td>Vikakoodien luku ja nollaus</td>
                    <td>25 euroa</td>
                </tr>
                <tr>
                    <td>Moottoriohjelmointi M47, M57</td>
                    <td>390 euroa</td>
                </tr>
                <tr>
                    <td>Moottoriohjelmointi N47, N57</td>
                    <td>450 euroa</td>
                </tr>
                <tr>
                    <td>JBPerformance GM vaihdelaatikko-ohjelma</td>
                    <td>210 euroa</td>
                </tr>
                <tr>
                    <td>6hp -vaihdelaatikko-ohjelma</td>
                    <td>220 euroa</td>
                </tr>
                <tr>
                    <td>8hp -vaihdelaatikko-ohjelma</td>
                    <td>Alkaen 310 euroa</td>
                </tr>
                <tr>
                    <td>Koko auton ohjelmiston päivitys</td>
                    <td>60 euroa</td>
                </tr>
            </tbody>
        </table>  
        </div>
        <div className="infoContainer">
            <h2>Suuremmat remontit / toimenpiteet olethan yhteydessä niin sovimme urakkahinnan</h2>
            <h2>Hinnat sisältävät alv 25.5%</h2>
        
        </div>
        </div>
    );
}

export default Pricing
