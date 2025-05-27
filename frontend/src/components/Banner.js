import React from "react";
import "./banner.css";

function Banner({ title, subtitle, imageUrl, className = "" }) {
  return (
    <>
    {/* Mobile-only title below the image */}
      <div className="banner-mobile-title">
        <h1 className="banner-title">{title}</h1>
        <p className="banner-subtitle">{subtitle}</p>
      </div>
      <section
        className={`banner ${className}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Desktop overlay */}
        <div className="banner-overlay">
          <h1 className="banner-title">{title}</h1>
          <p className="banner-subtitle">{subtitle}</p>
        </div>
      </section>

    </>
  );
}

export default Banner;
