import React from "react";
import "./banner.css";


function Banner({title, imageUrl}) {
    return (
        <section 
            className = "banner"
            style = {{backgroundImage: `url(${imageUrl})` }}
        >
            <div className="banner-overlay">
                <h3>{title}</h3>
            </div>
        </section>
    )
}
export default Banner;