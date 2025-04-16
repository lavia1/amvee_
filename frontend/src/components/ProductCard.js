import React from "react";
import { Link } from "react-router-dom";
import "./productcard.css";

const ProductCard = ({ part }) => {
  return (
    <Link to={`/parts/${part.part_number}`} className="card-link">
      <div className="card">
        <img src={part.image_url || "placeholder.jpg"} alt={part.name} />
        <h2>{part.name}</h2>
        <p className="price">${part.price.toFixed(2)}</p>
        <p className="description">{part.description}</p>
        <button>Lisää ostoskoriin</button>
      </div>
    </Link>
  );
};

export default ProductCard;
