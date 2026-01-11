import React from "react";
import "../styles/Photogallery.css";
import Banner from "../components/Banner";

export default function PhotoGallery() {
  return (
    
    <div className="photo-gallery-container">
      <Banner
                title="Kuvagalleria"
                subtitle={
                    <>
               Kuvia projekteista – autoja, asennuksia ja kaikkea siltä väliltä
                </>}
                imageUrl="/assets/mustaheroimage.jpg"
                className="home-banner"
      />

      <aside className="sidebar">
        <div className="logo">&#8734;</div>
      </aside>

      <main className="main">
        

        <div className="gallery">
          <figure>
            <img
              src="/assets/otusetukuva.jpg"
              alt="BMW E61 535d"
            />
            <figcaption>
              <h3 className="kuvateksti">BMW E61 535d</h3>
              <h4 className="kuvaus">Retrofitattu comfort penkit, Logic 7 äänentoisto, Cic, Bluetooth, Lci valot, takapenkinlämmittimet</h4>
            </figcaption>
          </figure>

          <figure>
            <img
              src="/assets/fkylki.jpg"
              alt="BWM 535d F11"
            />
            <figcaption>
              <h3>BMW 535d F11</h3>
              <h4>Ketju-, laakeri- ja ahdinremontti tehty</h4>
              
            </figcaption>
          </figure>

          <figure>
            <img
              src="/assets/back_lights.jpg"
              alt="BMW E61 535d takavalot"
            />
           
          </figure>
          
          <figure>
            <img src="/assets/e46.jpg" alt="moottori" />
            
           
          </figure>
           <figure>
            <img src="/assets/vannekuva.jpg" alt="BMW vanteet" />
            
              
          </figure>

           <figure>
            <img
              src="/assets/moottori.jpg"
              alt="BMW E46"
            />
            <figcaption>
              <h3>E46 330d</h3>
              <h4>hx55+gtb2260vk</h4>
              
            </figcaption>
            
          </figure>
           <figure>
            <img
              src="/assets/fsisusta.jpg"
              alt="BMW sisusta"
              
            />
           
          </figure>
           <figure>
            <img
              src="/assets/fvanne.jpg"
              alt="BMW E61 535d etuvalo"
            />
            
            
          </figure>
           <figure>
            <img
              src="/assets/wires.jpg"
              alt="johtosarja"
            />
            
            
          </figure>
          <figure>
            <img
              src="/assets/mustatakakuva.jpg"
              alt="BMW takakuva"
            />
            <figcaption>
              <h3 className="kuvateksti">E92 335d</h3>
              <h4>Moottori vaihdettu, hybridiahtimet asennettu, ohjelmoitu 450hv/900nm</h4>
              
            </figcaption> 
            
          </figure>
          <figure>
            <img
              src="/assets/bmwmerkki.jpg"
              alt="BMW merkki "
            />
            
           
          </figure>
          <figure>
            <img
              src="/assets/sisusta.jpg"
              alt="BMW sisusta"
            />
            
          </figure>
          <figure>
            <img
              src="/assets/otuskylki.jpg"
              alt="BMW E61 535d kylki"
            />
            
          </figure>
          <figure>
            <img
              src="/assets/otusvalo.jpg"
              alt="BMW keula"
            />
             <figcaption>
              <h4>Umpio käytetty auki, laitettu Led projektorit, enkelin silmät ja kulmakarva mustaksi</h4>
              
            </figcaption> 
            
          
          </figure>
            <figure>
            <img
              src="/assets/mustaetu.jpg"
              alt="BMW E61 535d etuosa"
            />
            
            
          
          </figure>
          
          

          
        </div>
      </main>
    </div>
  );
}
