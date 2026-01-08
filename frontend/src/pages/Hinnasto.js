import React from "react";
import Banner from "../components/Banner";
import "../styles/Prices.css";





const Hinnasto = () => {
    return (

        <div>
            {/* --- Hero image --- 
      <div className="heroImage"
                style={{
                    backgroundImage: "url(/assets/bmw_logo_banner.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "400px",
                    width: "100%",

                }}
                >
                    <div className="heroText">
                        
                    </div>
                
            </div>
          */}

            <div className="priceContainer"  
                    style={{
                        backgroundImage: "url(/assets/gearbox.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                        
                    }}>
                    
                    <p className="priceinfo">Hinnat sisältävät alv 25.5%</p>
                <table
                    className="priceTable"
                    style={{
                        backgroundImage: "url(/assets/bmwmerkki.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <tbody>
                        
                        <tr>
                            <td className="tuntiveloitus">Tuntiveloitus</td>
                            <td>55 e/h</td>
                        </tr>
                         <tr>
                            <td>JBPerformance GM vaihdelaatikko-ohjelma</td>
                            <td>320 euroa</td>
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
                            <td>Kontin piuhasarja</td>
                            <td>120 euroa</td>
                        </tr>
                          <tr>
                            <td>Koko auton ohjelmiston päivitys</td>
                            <td>60 euroa</td>
                        </tr>
                        <tr>
                            <td>Vikakoodien luku ja nollaus</td>
                            <td>25 euroa</td>
                        </tr>
                        <tr>
                            <td>6hp -vaihdelaatikko-ohjelma</td>
                            <td>220 euroa</td>
                        </tr>
                        <tr>
                            <td>8hp -vaihdelaatikko-ohjelma</td>
                            <td>Alkaen 310 euroa</td>
                        </tr>
                        

                      
                       
                        
                    </tbody>
                    
                </table>
                <div className="infoContainer">
                <h3 className="infoText">
                    Suuremmat remontit / toimenpiteet olethan yhteydessä niin
                    sovimme urakkahinnan
                </h3>
                
            </div>
            </div>
               
                       
        </div>
    );
};

export default Hinnasto;
