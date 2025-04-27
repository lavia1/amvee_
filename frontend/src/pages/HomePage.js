import React from "react";
import Banner from "../components/Banner";
import "../styles/HomePage.css"

const HomePage = () => {
    return (
        <div>
             <Banner 
            
                imageUrl="/assets/car_bmw.jpg"
            />
       <div className="info">
  <img 
    src="assets/bmw_lights.jpg" 
    alt="BMW -etuvalot"
    style={{ width: "100%", height: "auto", aspectRatio: "2340/786" }} 
  />
</div>

        </div>
    );
};
export default HomePage