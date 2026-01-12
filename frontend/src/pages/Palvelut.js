import React, { useState, useRef } from "react";
import "../styles/palvelut.css";
import { GiCarWheel,GiSteeringWheel } from "react-icons/gi";
import Banner from "../components/Banner";
// --- DATA --- 
const slides1 = [
  {
    title: "Sähköjärjestelmien vianhaku ja korjaus",
    price: "55e/h",
    image:"assets/bmw_etukuva.jpg",
    items: [
      " Airbag-järjestelmän korjaus",
      "Moduulien vaihto",
      "Auton käynnistymisviat",
    ],
  },
  {
    title: "Johtotehtävät",

    image:"/assets/wires.jpg",
    price: "55e/h",
    items: [
      "Peräkontin piuhasarjan uusiminen",
      "Poikkimenneen piuhasarjan vaihto",
    ],
  },
   {
    title: "Koodaaminen",
    image:"/assets/back_lights.jpg",
    items: [
      "Jenkkiparkkien aktivointi",
      "Tervetulo-valojen koodaus",
      "Päiväajovalot takavalojen kanssa",
      "Kaikki muu koodaus valojen kanssa",
      "Start/stop -järjestelmä käynnistäessä pois päältä",
      "Elokuvien ja TV:n katsominen liikkeessä",
      "M-HUD-koodaaminen",
      "Kattoluukun sulkeminen sateen tunnistaessa",
      "Sivupeilien kääntyminen ovet lukitessa",
      "Mittariston valojen koodaus valkoiseksi",
    ],
  },
  {
    title: "Jälkivarustelu eli retrofit, esimerkiksi",
    image:"assets/sisusta.jpg",
    items: [
      "Ajotietokoneen jälkiasennus",
      "Penkkien jälkiasennus",
      "Vakionopeuden säätimien jälkiasennus",
      "Ajovalojen jälkiasennus"
    ],
  },
];

const slides2 = [
  {
    title: "Moottorin ohjelmointi",
    image:"assets/engine_bmw.jpg",
    price: "Ota kaikki irti autostasi. Alkaen 390 euroa",
    items: [
      "BMW-dieselmoottoreiden optimointi",
      "(mm. M47, M57, N47, N57)",
      "Tieliikennekäytössä olevien ajoneuvojen päivitys mahdollista ainoastaan ECE -hyväksytyillä osilla",
      "Emme poista saastalaitteita",
      
      
    ],
  },
  {
    title: "Vaihdelaatikko-ohjelmat",
    image:"assets/gearbox.jpg",
    items: [
      "JBPerformance GM, 6hp sekä 8hp vaihdelaatikko-ohjelmat",
      "Tekee kuminauhavaihdelaatikosta napakan, fiksun ja luotettavan",
      "BMW vuosimalleista 1995-2025",
    ],
  },
  {
    title: "Auton ohjelmiston päivittäminen",
     image:"assets/bmw_etukuva.jpg",
    price: "60 euroa",
    items:[
      "Koko auton ohjainmoodulien päivittäminen uusimpaan versioon"
    ],
  },
];

const slides3 = [
  {
    title: "Jakoketjuremontit",
    image:"assets/otuskylki.jpg",
    items: [
      "Bmw N57/N47 Jakoketjuremontti 2100e",
      "Kaikki muutkin jakoketjun/hihnan vaihdot onnistuvat. Esim M57, volvot, foordit yms.",
      
      
      
    ],
  },
  {
    title: "Moottorinvaihdot",
    image:"assets/moottori.jpg",
    items: [
      "Bmw M47/M57/N47/N57 Venttiilikopan tiivistevaihto 220e",
      "Turbon vaihto pelkän keskiön kanssa. Normaalia paljon halvempi",
      
    ],
  },
  {
    title: "Apulaitteiden vaihdot",
    image:"assets/startstop.jpg",
    items:[
      "Startti",
      "Laturi",
      "Ilmastoinnin kompura jne.",
      "Hehkun rele ja hehkujen vaihto"
    ],
  },
];


const slides4 = [
  {
    title: "Öljynvaihto",
    image:"assets/engine_bmw.jpg",
    price: "Alkaen 390 €",
    items: [
      "Moottorin öljynvaihto (Valvoline -öljy) 100€",
      "Automaattivaihdelaatikon öljynvaihto 150€",
      "Manuaalivaihdelaatikon öljynvaihto 60€",
      "Perän öljynvaihto 60€",
      "Jakolaatikon öljynvaihto 80€"
    ],
  },
  {
    title: "BMW-diagnostiikka & koodaamisohjelmien asennus",
    image:"assets/bmw_logo.jpg",
    price: "Asennus onnistuu joko etänä tai paikanpäällä",
    items: [
      "Ista+ (ISTA D ja ISTA P) ",
      "(E, F, G, I-sarjalaisten diagnostiikkaan ja koodaamiseen. E-sarjalaiseen pelkkä diagnostiikka)",
      "Inpa (E -sarjalaiseen pelkkä diagnostiikka)",
      "NCS Dummy ja Expert (E-sarjalaiset)",
      "ISTA P Launcher (E-sarjalaiset)",
      "WinKFP (Moduulien pävitykseen ja asentamiseen)",
      "E-SYS (F,G,I-sarjalaisten koodaamiseen)"

    ],
  },
    {
    title: "Esimerkkejä muista töistä",
    image:"assets/fvanne.jpg",
    price: "60 euroa",
    items: [
      "Diagnostiikka -työt kaiken maailman muihin vikoihin",
      "Muiden kuin BMW -merkkisten autojen sähkövikojen korjaus",
      "Jakoketjun/hihnan vaihdot",
      "Katsastusremontit",
      "Tukivarsien vaihdot",
      "Iskareiden vaihdot",
      "Jarrujen korjaus"

    ],
    
  },
    {
    title: "Soittaja on voittaja",
    image:"assets/wheel_banner.jpg",
    price: "Kaikki muu mikä mieleen juolahtaa",
    items: [
     
      "Ota rohkeasti yhteyttä:",
      <a className="linkki" href="tel:+358443430792">
                                <span>puh. +358 443430792</span>
                            </a>
       

    ],
  },
];



export default function Palvelut() {
  // --- State jokaiselle sliderille ---
  const [active1, setActive1] = useState(0);
  const [active2, setActive2] = useState(0);
  const [active3, setActive3] = useState(0);
  const [active4, setActive4] = useState(0);

  const startX1 = useRef(null);
  const startX2 = useRef(null);
  const startX3 = useRef(null);
  const startX4 = useRef(null);

  // --- Swipe-logiikat ---
  const swipeLogic = (startRef, setActiveFn, slides) => ({
    onStart: (x) => { startRef.current = x; },
    onEnd: (x) => {
      if (startRef.current === null) return;
      const diff = x - startRef.current;
      if (diff > 50) setActiveFn(prev => Math.max(prev - 1, 0));
      if (diff < -50) setActiveFn(prev => Math.min(prev + 1, slides.length - 1));
      startRef.current = null;
    },
  });

  // --- Korttien tyylit ---
  const getStyle = (index, active) => {
    const diff = index - active;
    const abs = Math.abs(diff);
    if (diff === 0) return { transform: "none", zIndex: 1, filter: "none", opacity: 1 };
    return {
      transform: `translateX(${120*diff}px) scale(${1-0.2*abs})`,
      zIndex: -abs,
      filter: "blur(2px)",
      opacity: abs > 2 ? 0 : 0.6,
      transition: "0.5s"
    };
  };

  const sliderStyle = { marginTop: "10px", position: "relative" };

  // --- Nuolipainikkeet ---
  const ArrowButtons = ({active, setActive, slides}) => (
    <>
      <button className="prev" onClick={() => setActive(prev => Math.max(prev-1,0))}>&#10094;</button>
      <button className="next" onClick={() => setActive(prev => Math.min(prev+1, slides.length-1))}>&#10095;</button>
    </>
  );

  return (
    <div>
       <Banner
                title="Palvelut"
                subtitle={
                    <>
                    Ohjelmointi, asennustyöt tai mitä mieleen juolahtaa 
                </>}
                imageUrl="/assets/mustaheroimage.jpg"
                className="home-banner"
      />
          
      {/* --- Ensimmäinen slider --- */}
<h1 className="otsikko">Asennus- ja vianhakutyöt, koodaus sekä jälkivarustelu</h1>
<div className="sliderContainer">
  <ArrowButtons active={active1} setActive={setActive1} slides={slides1} />
  <div
    className="slider"
    onMouseDown={(e) => swipeLogic(startX1, setActive1, slides1).onStart(e.clientX)}
    onMouseUp={(e) => swipeLogic(startX1, setActive1, slides1).onEnd(e.clientX)}
    onTouchStart={(e) => swipeLogic(startX1, setActive1, slides1).onStart(e.touches[0].clientX)}
    onTouchEnd={(e) => swipeLogic(startX1, setActive1, slides1).onEnd(e.changedTouches[0].clientX)}
  >
    {slides1.map((slide, i) => (
      <div key={i} className="item" style={getStyle(i, active1)}>
        
        {/* Wrapper otsikolle + kuvalle */}
        <div className="titleWithImageWrapper">
          {slide.image && (
            <img src={slide.image} alt={slide.title} className="titleBgImage" />
          )}
          <h2 className="titleOverlay">{slide.title}</h2>
        </div>

        {slide.price && <p className="title">{slide.price}</p>}

        {slide.items.map((it, j) => (
          <p key={j} className="itemRow">
            <GiSteeringWheel className="steeringIcon" /> {it}
          </p>
        ))}
      </div>
    ))}
  </div>
</div>


    {/* --- Toinen slider --- */}
<h1 className="otsikko">Ohjelmointi</h1>
<div className="sliderContainer">
  <ArrowButtons active={active2} setActive={setActive2} slides={slides2} />
  <div
    className="slider"
    onMouseDown={(e) => swipeLogic(startX2, setActive2, slides2).onStart(e.clientX)}
    onMouseUp={(e) => swipeLogic(startX2, setActive2, slides2).onEnd(e.clientX)}
    onTouchStart={(e) => swipeLogic(startX2, setActive2, slides2).onStart(e.touches[0].clientX)}
    onTouchEnd={(e) => swipeLogic(startX2, setActive2, slides2).onEnd(e.changedTouches[0].clientX)}
  >
    {slides2.map((slide, i) => (
      <div key={i} className="item" style={getStyle(i, active2)}>
        
        {/* Wrapper otsikolle + kuvalle */}
        <div className="titleWithImageWrapper">
          {slide.image && (
            <img src={slide.image} alt={slide.title} className="titleBgImage" />
          )}
          <h2 className="titleOverlay">{slide.title}</h2>
        </div>

        {slide.price && <p className="title">{slide.price}</p>}

        {slide.items.map((it, j) => (
          <p key={j} className="itemRow">
            <GiSteeringWheel className="steeringIcon" /> {it}
          </p>
        ))}
      </div>
    ))}
  </div>
</div>


      {/* --- Kolmas slider --- */}
      <h1 className="otsikko">Remontit</h1>
      <div className="sliderContainer">
        <ArrowButtons active={active3} setActive={setActive3} slides={slides3} />
        <div className="slider" style={sliderStyle}
          onMouseDown={(e) => swipeLogic(startX3, setActive3, slides3).onStart(e.clientX)}
          onMouseUp={(e) => swipeLogic(startX3, setActive3, slides3).onEnd(e.clientX)}
          onTouchStart={(e) => swipeLogic(startX3, setActive3, slides3).onStart(e.touches[0].clientX)}
          onTouchEnd={(e) => swipeLogic(startX3, setActive3, slides3).onEnd(e.changedTouches[0].clientX)}
        >
          {slides3.map((slide,i) => (
            <div key={i} className="item" style={getStyle(i,active3)}>
               <div className="titleWithImageWrapper">
          {slide.image && (
            <img src={slide.image} alt={slide.title} className="titleBgImage" />
          )}
          <h2 className="titleOverlay">{slide.title}</h2>
        </div>
              {slide.price && <p className="title">{slide.price}</p>}
              {slide.items.map((it,j) => <p key={j} className="itemRow"><GiCarWheel className="wheelIcon" /> {it}</p>)}
            </div>
          ))}
        </div>
      </div>

        {/* --- Neljäs slider --- */}
<h1 className="otsikko">Teemme muutakin kuin sähkökorjauksia, myös muihinkin autoihin kuin BMW</h1>
<div className="sliderContainer">
  <ArrowButtons active={active4} setActive={setActive4} slides={slides4} />
  <div
    className="slider"
    onMouseDown={(e) => swipeLogic(startX4, setActive4, slides4).onStart(e.clientX)}
    onMouseUp={(e) => swipeLogic(startX4, setActive4, slides4).onEnd(e.clientX)}
    onTouchStart={(e) => swipeLogic(startX4, setActive4, slides4).onStart(e.touches[0].clientX)}
    onTouchEnd={(e) => swipeLogic(startX4, setActive4, slides4).onEnd(e.changedTouches[0].clientX)}
  >
    {slides4.map((slide, i) => (
      <div key={i} className="item" style={getStyle(i, active4)}>
        {/* Wrapper otsikolle + kuvalle */}
        <div className="titleWithImageWrapper">
          {slide.image && (
            <img src={slide.image} alt={slide.title} className="titleBgImage" />
          )}
          <h2 className="titleOverlay">{slide.title}</h2>
        </div>

        {slide.price && <p className="title">{slide.price}</p>}

        {slide.items.map((it, j) => (
          <p key={j} className="itemRow">
            <GiCarWheel className="wheelIcon" /> {it}
          </p>
        ))}
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
