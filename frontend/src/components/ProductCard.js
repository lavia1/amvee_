import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./productcard.css";
import { useCart } from "../context/CartContext";

const ProductCard = ({ part }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [popKey, setPopKey] = useState(0);

  const handleAddToCart = () => {
    const quantity = 1;
    addToCart(part, quantity);

    setIsAdded(true);
    setPopKey(prev => prev + 1);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // Ensure part.price is a valid number
  const price = parseFloat(part.price);
  const formattedPrice = isNaN(price) ? "Invalid Price" : price.toFixed(2);

  return (
    <div className="card">
      <Link to={`/parts/${part.part_number}`} className="card-link">
        {/* Display only the first image */}
        {part.image_url && Array.isArray(part.image_url) && part.image_url.length > 0 ? (
          <img 
            src={part.image_url ? `${process.env.REACT_APP_API_BASE_URL}${part.image_url[0]}` : "placeholder.jpg"} 
            alt={part.name} 
          />
        
        ) : (
          <img src="/assets/placeholder.jpg" alt="Placeholder" />
        )}
        <h2>{part.name}</h2>
        <p className="price">{formattedPrice} €</p>
      </Link>

      <button 
        className="btn-hover color-9 card-btn" 
        onClick={handleAddToCart}
      >
        {isAdded ? (
          <i key={popKey} className="fa fa-fw fa-check icon-pop"></i> 
        ) : (
          <i className="fa fa-fw fa-shopping-cart"></i>
        )}
      </button>
    </div>
  );
};


export default ProductCard;
