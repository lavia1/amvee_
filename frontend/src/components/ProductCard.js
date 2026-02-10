import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./productcard.css";
import { useCart } from "../context/CartContext";

const ProductCard = ({ part }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [popKey, setPopKey] = useState(0);

  const handleAddToCart = () => {
    addToCart(part, 1);
    setIsAdded(true);
    setPopKey(prev => prev + 1);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // --- Kuvalogiikka ---
  const getImagesArray = (part) => {
    if (!part) return [];
    if (Array.isArray(part.image_url) && part.image_url.length > 0) return part.image_url;
    if (Array.isArray(part.images) && part.images.length > 0) return part.images;
    return [];
  };

  const images = getImagesArray(part);

  const getImageUrl = (url) => {
    if (!url) return "/assets/placeholder.jpg";
    return url.startsWith("http") ? url : `${process.env.REACT_APP_API_BASE_URL}${url}`;
  };

  // --- Hinta ---
  const price = parseFloat(part.price);
  const formattedPrice = isNaN(price) ? "Invalid Price" : price.toFixed(2);

  return (
    <div className="card">
      <div className="productcard-container">
        <Link to={`/parts/${part.part_number}`} className="card-link">
          <img src={images[0] ? getImageUrl(images[0]) : "/assets/placeholder.jpg"} alt={part.name} />
          <h2>{part.name}</h2>
          <p className="price">{formattedPrice} €</p>
          {part.stock === 0 && <span className="out-of-stock">Ei varastossa</span>}
        </Link>

        <button className="btn-hover color-9 card-btn" onClick={handleAddToCart}>
          {isAdded ? (
            <i key={popKey} className="fa fa-fw fa-check icon-pop"></i>
          ) : (
            <i className="fa fa-fw fa-shopping-cart"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
