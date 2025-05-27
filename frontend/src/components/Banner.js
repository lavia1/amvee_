import React from "react";
import "./banner.css";


function Banner({ title, subtitle, imageUrl }) {
  return (
    <section
      className="banner"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="banner-overlay">
        <h1 className="banner-title">{title}</h1>
        <p className="banner-subtitle">{subtitle}</p>
      </div>
    </section>
  );
}

export default Banner;