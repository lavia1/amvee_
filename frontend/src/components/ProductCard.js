import React from "react";
import "./productcard.css";

const ProductCard = ({part}) => {

    return (
        <div className="card">
            <img src={part.image_url || "placeholder.jpg" } 
                alt = {part.name} 
            />
            <h2>{part.name}</h2>
            <p className="price">${part.price.toFixed(2)}</p>
            <p className="description">{part.description}</p>
            <button>Lisää ostoskoriin</button>
        </div>
    );
};
export default ProductCard;