import React from "react";
import Banner from "../components/Banner";
import "../styles/Prices.css";

const Pricing = () => {
    return(
        <div>
            <Banner 
                title="Hinnasto"
                imageUrl="/assets/banner.JPG"
            />
        <div className="priceContainer">
        {/* Pricing page content */}  
        <table className = "priceTable">
            <tbody>
                <tr>
                    <td>Tuntiveloitus</td>
                    <td>55e/h</td>
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
                    <td>Xhp ja JBPerformance vaihdelaatikko-ohjelma</td>
                    <td>240 euroa</td>
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
