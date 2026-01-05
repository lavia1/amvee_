import React, { useState, useRef } from "react";
import "../styles/palvelut.css";
import { GiCarWheel,GiSteeringWheel } from "react-icons/gi";
import Banner from "../components/Banner";
// --- DATA --- 
const slides1 = [
  {
    title: "Sähköjärjestelmien vianhaku ja korjaus",
    price: "55e/h",
    items: [
      " Airbag-järjestelmän korjaus",
      "Moduulien vaihto",
      "Auton käynnistymisviat",
    ],
  },
  {
    title: "Johtotehtävät",
    price: "55e/h",
    items: [
      "Peräkontin piuhasarjan uusiminen",
      "Poikkimenneen piuhasarjan vaihto",
    ],
  },
   {
    title: "Koodaaminen",
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
    items: [
      "JBPerformance GM, 6hp sekä 8hp vaihdelaatikko-ohjelmat",
      "Tekee kuminauhavaihdelaatikosta napakan, fiksun ja luotettavan",
      "BMW vuosimalleista 1995-2025",
    ],
  },
  {
    title: "Auton ohjelmiston päivittäminen",
    price: "60 euroa",
    items:[
      "Koko auton ohjainmoodulien päivittäminen uusimpaan versioon"
    ],
  },
];

const slides3 = [
  {
    title: "Öljynvaihto",
    price: "Alkaen 390 €",
    items: [
      "Moottorin öljynvaihto (Valvoline -öljy) 100€",
      "Automaattivaihdelaatikon öljynvaihto 150€",
      "Manuaalivaihdelaatikon öljynvaihto 60€",
      "Perä öljynvaihto 60€",
      "Jakolaatikon öljynvaihto 80€"
    ],
  },
  {
    title: "BMW-diagnostiikka ja koodaamisohjelmien asennus",
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

  const startX1 = useRef(null);
  const startX2 = useRef(null);
  const startX3 = useRef(null);

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
      transform: `translateX(${120*diff}px) scale(${1-0.2*abs}) perspective(16px) rotateY(${diff>0 ? "-1deg":"1deg"})`,
      zIndex: -abs,
      filter: "blur(5px)",
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
      {/* --- Ensimmäinen slider --- */}
      <h1 className="otsikko">Asennus- ja vianhakutyöt, koodaus sekä jälkivarustelu</h1>
      <div className="sliderContainer">
        <ArrowButtons active={active1} setActive={setActive1} slides={slides1} />
        <div className="slider"
          onMouseDown={(e) => swipeLogic(startX1, setActive1, slides1).onStart(e.clientX)}
          onMouseUp={(e) => swipeLogic(startX1, setActive1, slides1).onEnd(e.clientX)}
          onTouchStart={(e) => swipeLogic(startX1, setActive1, slides1).onStart(e.touches[0].clientX)}
          onTouchEnd={(e) => swipeLogic(startX1, setActive1, slides1).onEnd(e.changedTouches[0].clientX)}
        >
          {slides1.map((slide,i) => (
            <div key={i} className="item" style={getStyle(i,active1)}>
              <h2>{slide.title}</h2>
              {slide.price && <p className="title">{slide.price}</p>}
              {slide.items.map((it,j) => <p key={j} className="itemRow"><GiSteeringWheel /> {it}</p>)}
            </div>
          ))}
        </div>
      </div>

      {/* --- Toinen slider --- */}
      <h1 className="otsikko">Ohjelmointi</h1>
      <div className="sliderContainer">
        <ArrowButtons active={active2} setActive={setActive2} slides={slides2} />
        <div className="slider" style={sliderStyle}
          onMouseDown={(e) => swipeLogic(startX2, setActive2, slides2).onStart(e.clientX)}
          onMouseUp={(e) => swipeLogic(startX2, setActive2, slides2).onEnd(e.clientX)}
          onTouchStart={(e) => swipeLogic(startX2, setActive2, slides2).onStart(e.touches[0].clientX)}
          onTouchEnd={(e) => swipeLogic(startX2, setActive2, slides2).onEnd(e.changedTouches[0].clientX)}
        >
          {slides2.map((slide,i) => (
            <div key={i} className="item" style={getStyle(i,active2)}>
              <h2>{slide.title}</h2>
              {slide.price && <p className="title">{slide.price}</p>}
              {slide.items.map((it,j) => <p key={j} className="itemRow"><GiCarWheel /> {it}</p>)}
            </div>
          ))}
        </div>
      </div>

      {/* --- Kolmas slider --- */}
      <h1 className="otsikko">Teemme muutakin kuin sähkökorjauksia, myös muihinkin autoihin kuin BMW</h1>
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
              <h2>{slide.title}</h2>
              {slide.price && <p className="title">{slide.price}</p>}
              {slide.items.map((it,j) => <p key={j} className="itemRow"><GiCarWheel /> {it}</p>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}