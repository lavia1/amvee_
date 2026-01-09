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
              <h3>BMW E61 535d</h3>
              
            </figcaption>
          </figure>

          <figure>
            <img
              src="/assets/fkylki.jpg"
              alt="BWM 535d F11"
            />
            <figcaption>
              <h3>BMW 535d F11</h3>
              
            </figcaption>
          </figure>

          <figure>
            <img
              src="/assets/back_lights.jpg"
              alt="BMW E61 535d takavalot"
            />
           
          </figure>
             <figure>
            <img src="/assets/moottori.jpg" alt="moottori" />
           
          </figure>
           <figure>
            <img src="/assets/vannekuva.jpg" alt="BMW vanteet" />
            
              
          </figure>

           <figure>
            <img
              src="/assets/e46.jpg"
              alt="BMW E46"
            />
            
          </figure>
           <figure>
            <img
              src="/assets/fsisusta.jpg"
              alt="BMW sisusta"
            />
           
          </figure>
           <figure>
            <img
              src="/assets/otusvalo.jpg"
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
              src="/assets/mustaetu.jpg"
              alt="BMW keula"
            />
          
          </figure>
            <figure>
            <img
              src="/assets/otusetu.jpg"
              alt="BMW E61 535d etuosa"
            />
          
          </figure>
          

          
        </div>
      </main>
    </div>
  );
}
