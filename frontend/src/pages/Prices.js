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
                    <td>Moottoriohjelmointi n47, n57</td>
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
        <div className="priceContainer">
            <p>Suuremmat remontit / toimenpiteet olethan yhteydessä niin sovimme urakkahinnan</p>
            <p>Hinnat sisältävät alv 25.5%</p>
        
        </div>
        </div>
    )
}

export default Pricing
