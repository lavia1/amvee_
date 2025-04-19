import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./productcard.css";
import { useCart } from "../context/CartContext";

const ProductCard = ({ part }) => {
  const {addToCart} = useCart();
  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    const quantity = 1;

    addToCart(part, quantity);

    setMessage(`${quantity} x ${part.name} lisätty ostoskoriin`);
    setTimeout(() => {
      setMessage("")
  }, 4000);
  };

  return (
    <div className="card">
      <Link to={`/parts/${part.part_number}`} className="card-link">
        <img src={part.image_url || "placeholder.jpg"} alt={part.name} />
        <h2>{part.name}</h2>
        <p className="price">{part.price.toFixed(2)} €</p>
        <p className="description">{part.description}</p>
      </Link>
      <button className="btn-hover color-9 card-btn" onClick={handleAddToCart}>Lisää ostoskoriin</button>
      {message&&<div className="inline-message">{message}</div>}
    </div>

    
  );
};

export default ProductCard;
