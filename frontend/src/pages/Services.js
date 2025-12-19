import React from "react";
import Banner from "../components/Banner";
import "../styles//Services.css";
const Services = () => {
    return(
        <div>
            <Banner 
                className="home-banner"
                imageUrl="/assets/wheel_banner.jpg"
            />

        {/*Ensimmäinen rivi */}
        <div className="rowHeader">
        <h1>Asennus- ja vianhakutyöt, koodaus sekä jälkivarustelu</h1>
        </div>
        
        <div className="row1">
            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/startstop.jpg"
                        alt="Moottorin starttaus -nappi" 
                    />
                    <div className="serviceContainer">
                        <h2>Sähköjärjestelmien vianhaku ja korjaus</h2>
                        <p className="title">55e/h</p>
                        <p>Airbag-järjestelmän korjaus</p>
                        <p>Moduulien vaihto</p>
                        <p>Auton käynnistymisviat</p>
                    </div>
                </div>
            </div>

            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/wires.jpg"
                        alt="" 
                    />
                    <div className="serviceContainer">
                        <h2>Johtotehtävät</h2>
                        <p>Peräkontin piuhasarjan uusiminen</p>
                        <p>Poikkimenneen piuhasarjan vaihtaminen</p>
                    </div>
                </div>
            </div>

            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/back_lights.jpg"
                        alt="" 
                    />
                    <div className="serviceContainer">
                        <h2>Koodaaminen</h2>
                        <p>Jenkkiparkkien aktivointi</p>
                        <p>Tervetulo -valojen koodaus</p>
                        <p>Päiväajovalot takavalojen kanssa</p>
                        <p>Kaikki muu koodaus valojen kanssa</p>
                        <br></br>
                        <p>Start/stop -järjestelmä käynnistäessä pois päältä</p>
                        <p>Elokuvien ja TV:n katsominen liikkeessä</p>
                        <p>M-HUD-koodaaminen</p>
                        <p>Kattoluukun sulkeminen sateen tunnistaessa</p>
                        <p>Sivupeilien kääntyminen ovet lukitessa</p>
                        <p>Mittariston valojen koodaus valkoiseksi</p>
                    </div>
                </div>
            </div>

            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/speeder.jpg"
                        alt="Nopeusmittari" 
                    />
                    <div className="serviceContainer">
                        <h2>Jälkivarustelu eli retrofit, esimerkiksi</h2>
                        <p>Ajotietokoneen jälkiasennus</p>
                        <p>Penkkien jälkiasennus</p>
                        <p>Vakionopeuden säätimien jälkiasennus</p>
                        <p>Ajovalojen jälkiasennus</p>
                    </div>
                </div>
            </div>
        </div>

         {/*Toinen rivi */}
        <div className="rowHeader">
        <h1>Ohjelmointi</h1>
        </div>
        
        <div className="row2">
            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/engine.jpg"
                        alt="BMW -moottori" 
                    />
                    <div className="serviceContainer">
                        <h2>Moottorin ohjelmointi</h2>
                        <p className="title">Ota kaikki irti autostasi. Alkaen 390 euroa</p>
                        <p>BMW-dieselmoottoreiden optimointi <br></br>(mm. M47, M57, N47, N57)</p>
                        <p>Tieliikennekäytössä olevien ajoneuvojen päivitys mahdollista ainoastaan ECE -hyväksytyillä osilla</p>
                        <p>Emme poista saastalaitteita</p>
                    </div>
                </div>
            </div>

            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/gearbox.jpg"
                        alt="Vaihdelaatikko" 
                    />
                    <div className="serviceContainer">
                        <h2>Vaihdelaatikko-ohjelmat</h2>
                        <h2>JBPerformance GM, 6hp sekä 8hp vaihdelaatikko-ohjelmat</h2>
                        <p className="title">Alkaen 210 euroa</p>
                        <p>Tekee kuminauhavaihdelaatikosta napakan, <br></br> fiksun ja luotettavan</p>
                       
                        <p>BMW vuosimalleista 1995-2025</p>
                    </div>
                </div>
            </div>

            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/car.jpg"
                        alt="BMW -auto" 
                    />
                    <div className="serviceContainer">
                        <h2>Auton ohjelmiston päivittäminen</h2>
                        <p className="title">60 euroa</p>
                        <p>Koko auton ohjainmoodulien <br></br>päivittäminen uusimpaan versioon</p>
                    </div>
                </div>
            </div>
        </div>

         {/*Kolmas rivi */}
        <div className="rowHeader">
        <h1>Teemme muutakin kuin sähkökorjauksia, myös muihinkin autoihin kuin BMW</h1>
        <h2 className="esimerkki">Esimerkkejä töistä:</h2>
        </div>
        
        <div className="row3">
            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/engine_bmw.jpg"
                        alt="BMW -moottori" 
                    />
                    <div className="serviceContainer">
                        <h2>Öljynvaihto</h2>
                        <p>Moottorin öljynvaihto (Valvoline -öljy) 100 €</p>
                        <p>Automaattivaihdelaatikon öljynvaihto 150 €</p>
                        <p>Manuaalivaihdelaatikon öljynvaihto 60 €</p>
                        <p>Perä öljynvaihto 60 €</p>
                        <p>Jakolaatikon öljynvaihto 80 €</p>
                    </div>
                </div>
            </div>

            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/bmw_speeder.jpg"
                        alt="" 
                    />
                    <div className="serviceContainer">
                        <h2>BMW-diagnostiikka ja koodaamisohjelmien asennus</h2>
                        <p className="title">Asennus onnistuu joko etänä tai paikanpäällä</p>
                        <p>Ista+ (ISTA D ja ISTA P)
                            
                        <li>(E, F, G, I-sarjalaisten diagnostiikkaan ja koodaamiseen. <br></br>E-sarjalaiseen pelkkä diagnostiikka)</li>
                        </p>
                        <br></br>
                        <p>Inpa <br></br>(E -sarjalaiseen pelkkä diagnostiikka)</p>
                        <p>NCS Dummy ja Expert<br></br> (E-sarjalaisten koodaamiseen)</p>
                        <p>ISTA P Launcher <br></br>(E-sarjalaisten koodaamiseen)</p>
                        <p>WinKFP (Moduulien pävitykseen ja asentamiseen)</p>
                        <p>E-SYS (F,G,I-sarjalaisten koodaamiseen)</p>
                    </div>
                </div>
            </div>

            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/bmw_wheel.jpg"
                        alt="BMW -vanne" 
                    />
                    <div className="serviceContainer">
                        <h2>Esimerkkejä muista töistä</h2>
                        <p className="title">60 euroa</p>
                        <p>Diagnostiikka -työt kaiken maailman muihin vikoihin</p>
                        <p>Muiden kuin BMW -merkkisten autojen sähkövikojen korjaus</p>
                        <p>Jakoketjun/hihnan vaihdot</p>
                        <p>Katsastusremontit</p>
                        <p>Tukivarsien vaihdot</p>
                        <p>Iskareiden vaihdot</p>
                        <p>Jarrujen korjaus</p>
                    </div>
                </div>
            </div>

            <div className="serviceColumn">
                <div className="serviceCard">
                    
                    <div className="serviceContainer">
                        <h2>Soittaja on voittaja</h2>
                        <p>Kaikki muu mikä mieleen juolahtaa</p>
                        <p>Ota rohkeasti yhteyttä:</p>
                        <p>
                            <a href="tel:+358443430792">
                                <i className="fa fa-phone"></i>
                                <span>0443430792</span>
                            </a>
                         </p>
                    </div>
                </div>
            </div>

            

        </div>

 


        </div>

        
    );
}

export default Services