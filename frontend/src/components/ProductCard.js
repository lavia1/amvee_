import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./productcard.css";
import { useCart } from "../context/CartContext";

const ProductCard = ({ part }) => {
  const {addToCart} = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [popKey, setPopKey] = useState(0);

  const handleAddToCart = () => {
    const quantity = 1;
    addToCart(part, quantity);

    setIsAdded(true);
    setPopKey(prev => prev +1);
    setTimeout(() => {
      setIsAdded(false);
  }, 2000);
  };

  return (
    <div className="card">
      <Link to={`/parts/${part.part_number}`} className="card-link">
        <img src={part.image_url || "placeholder.jpg"} alt={part.name} />
        <h2>{part.name}</h2>
        <p className="description">{part.description}</p>
        <p className="price">{part.price.toFixed(2)} €</p>
      </Link>

      <button 
        className="btn-hover color-9 card-btn" 
        onClick={handleAddToCart}>
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
