import React from "react";
import Banner from "../components/Banner";
import "../styles//Services.css";

const Services = () => {
    return(
        <div>
            <Banner 
                title="Palvelut"
                imageUrl="/assets/banner.JPG"
            />

        {/*Ensimmäinen rivi */}
        <div className="rowHeader">
        <h2>Asennus- ja vianhakutyöt, koodaus sekä jälkivarustelu</h2>
        </div>
        
        <div className="row1">
            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/banner.JPG"
                        alt="" 
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
                    <img src="assets/banner.JPG"
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
                    <img src="assets/banner.JPG"
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
                    <img src="assets/banner.JPG"
                        alt="" 
                    />
                    <div className="serviceContainer">
                        <h2>Jälkivarustelu eli retrofit, esimerkiksi</h2>
                        <p>Ajotietokoneen jälkiasennus</p>
                        <p>Penkkien jälkiasennus</p>
                        <p>Vakionopeuden säätimien jälkiasennus</p>
                        <p>Ajovalojen jälkiasaennus</p>
                    </div>
                </div>
            </div>
        </div>

         {/*Toinen rivi */}
        <div className="rowHeader">
        <h2>Ohjelmointi</h2>
        </div>
        
        <div className="row2">
            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/banner.JPG"
                        alt="" 
                    />
                    <div className="serviceContainer">
                        <h2>Moottorin ohjelmointi</h2>
                        <p className="title">Ota kaikki irti autostasi</p>
                        <p>BMW-dieselmoottoreiden optimointi <br></br>(mm. M57, N57)</p>
                        <p>Tieliikennekäytössä olevien ajoneuvojen päivitys mahdollista ainoastaan ECE -hyväksytyillä osilla</p>
                        <p>Emme poista saastalaitteita</p>
                    </div>
                </div>
            </div>

            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/banner.JPG"
                        alt="" 
                    />
                    <div className="serviceContainer">
                        <h2>xHP vaihdelaatikko-ohjelmat</h2>
                        <h2>JBPerformance GM vaihtelaatikko-ohjelmat</h2>
                        <p className="title">Tekee kuminauhavaihdelaatikosta napakan, <br></br> fiksun ja luotettavan</p>
                        <p className="title">220 euroa</p>
                        <p>BMW vuosimalleista 1995-2025</p>
                        <p>Vain GM -vaihdelaatikot 1995-2003</p>
                        <p>2003 eteenpäin onnistuu kaikki</p>
                    </div>
                </div>
            </div>

            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/banner.JPG"
                        alt="" 
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
        <h2>Teemme muutakin kuin sähkökorjauksia, myös muihinkin autoihin kuin BMW</h2>
        <h3>Esimerkkejä töistä:</h3>
        </div>
        
        <div className="row3">
            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/banner.JPG"
                        alt="" 
                    />
                    <div className="serviceContainer">
                        <h2>Öljynvaihto</h2>
                        <p>Moottorin öljynvaihto (Valvoline -öljy) 100 euroa</p>
                        <p>Automaattivaihdelaatikon öljynvaihto 150 euroa</p>
                        <p>Manuaalivaihdelaatikon öljynvaihto 60 euroa</p>
                        <p>Perä öljynvaihto 60 euroa</p>
                        <p>Jakolaatikon öljynvaihto 80 euroa</p>
                    </div>
                </div>
            </div>

            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/banner.JPG"
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
                    <img src="assets/banner.JPG"
                        alt="" 
                    />
                    <div className="serviceContainer">
                        <h2>Esimerkkejä muista töistä</h2>
                        <p className="title">60 euroa</p>
                        <p>Diagnostiikka -työt kaiken maailman muihin vikoihin</p>
                        <p>Muiden kuin BMW -merkkisten autojen sähkövikojen korjaus</p>
                        <p>Jakoketjun/hihnan vaihdot</p>
                        <p>Tukivarsien vaihdot</p>
                        <p>Iskareiden vaihdot</p>
                        <p>Jarrujen korjaus</p>
                    </div>
                </div>
            </div>

            <div className="serviceColumn">
                <div className="serviceCard">
                    <img src="assets/banner.JPG"
                        alt="" 
                    />
                    <div className="serviceContainer">
                        <h2>Soittaja on voittaja</h2>
                        <p className="title">Kaikki muu mikä mieleen juolahtaa</p>
                        <p className="title">Ota rohkeasti yhteyttä:</p>
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