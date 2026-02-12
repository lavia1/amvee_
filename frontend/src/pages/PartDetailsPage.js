import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "../styles/PartDetails.css";
import { useCart } from "../context/CartContext";
import {Helmet} from "react-paginate";

const PartDetailsPage = () => {
  const { partNumber } = useParams();
  const [part, setPart] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [popKey, setPopKey] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- Hae osa ---
  useEffect(() => {
    const fetchPart = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/parts/${partNumber}`
        );
        setPart(response.data);
      } catch (error) {
        console.error("Error fetching part details:", error);
      }
    };
    fetchPart();
  }, [partNumber]);

  // --- Määrälogiikka ---
  const increaseQty = () => {
    if (part && quantity < part.stock) setQuantity(prev => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    addToCart(part, quantity);
    setIsAdded(true);
    setPopKey(prev => prev + 1);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // --- Kuvien käsittely sama kuin ProductCard ---
  const getImagesArray = (part) => {
    if (!part) return [];
    if (Array.isArray(part.images) && part.images.length > 0) return part.images;
    if (Array.isArray(part.image_url) && part.image_url.length > 0) return part.image_url;
    return [];
  };

  const images = getImagesArray(part);

  const getImageUrl = (url) => {
    if (!url) return "/assets/placeholder.jpg";
    return url.startsWith("http")
      ? url
      : `${process.env.REACT_APP_API_BASE_URL}${url}`;
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  if (!part) return <div>Ladataan...</div>;

  const price = isNaN(part.price) ? 0 : Number(part.price);

  return (
    <>
  <Helmet>
    <title>{part ? `${part.name} | ÄmVee Tmi` : "Varaosa | ÄmVee Tmi"}</title>
    <meta
      name="description"
      content={part ? `${part.name} (${part.model})  - ${part.description?.slice(0, 150)}...` : "Varaosa tarkempi kuvaus."}
    />
  </Helmet>
    <div className="detail-container">
      <div className="container-background">
        <h1>{part.name}</h1>

        {/* Kuva-slider */}
        <div className="image-container">
          {images.length > 0 ? (
            <div className="slider">
              <img
                src={getImageUrl(images[currentImageIndex])}
                alt={part.name}
                className="slider-image"
              />
              {images.length > 1 && (
                <>
                  <button onClick={goToPreviousImage} className="slider-btn left">&#8249;</button>
                  <button onClick={goToNextImage} className="slider-btn right">&#8250;</button>
                </>
              )}
            </div>
          ) : (
            <img
              src="/assets/placeholder.jpg"
              alt="Placeholder"
              className="slider-image"
            />
          )}
        </div>

        <p className="price">{price.toFixed(2)} €</p>
        <p>Varaosanumero: {part.part_number}</p>
        <p className="detail-description">{part.description}</p>

        {/* Määrä ja lisää koriin */}
        <div className="purchase-container">
          <div className="quantity-container">
            <button className="quantity-button" onClick={decreaseQty}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = Math.max(1, Math.min(Number(e.target.value), part.stock));
                setQuantity(val);
              }}
              min="1"
              max={part.stock}
            />
            <button className="quantity-button" onClick={increaseQty}>+</button>
          </div>
          <button className="btn-hover color-9 card-btn" onClick={handleAddToCart}>
            {isAdded ? (
              <i key={popKey} className="fa fa-fw fa-check icon-pop"></i>
            ) : (
              <i className="fa fa-fw fa-shopping-cart"></i>
            )}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default PartDetailsPage;
