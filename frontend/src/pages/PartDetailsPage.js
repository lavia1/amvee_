import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "../styles/PartDetails.css";
import { useCart } from "../context/CartContext";

const PartDetailsPage = () => {
    const { partNumber } = useParams();
    const [part, setPart] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const [popKey, setPopKey] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchPart = async () => {
            try {
                const response = await Axios.get(`http://localhost:3000/api/parts/${partNumber}`);
                setPart(response.data);
            } catch (error) {
                console.error("Error fetching part details:", error);
            }
        };

        fetchPart();
    }, [partNumber]);

    const increaseQty = () => {
        if (quantity < part.stock) {
            setQuantity(prev => prev + 1);
        }
    };

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart(part, quantity);

        setIsAdded(true);
        setPopKey(prev => prev + 1);
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    if (!part) return <div>Ladataan...</div>; // "Loading..." in Finnish

    const price = isNaN(part.price) ? 0 : Number(part.price); // Set price to 0 if it's not a valid number

    const goToPreviousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const goToNextImage = () => {
        if (currentImageIndex < part.image_url.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    return (
        <div className="detail-container">
            {/* Image Slider */}
            <div className="image-container">
                {part.image_url && Array.isArray(part.image_url) && part.image_url.length > 0 ? (
                    <div className="slider">
                        <button onClick={goToPreviousImage} className="prev-btn">Prev</button>
                        <img
                            src={`${process.env.REACT_APP_API_BASE_URL}${part.image_url[currentImageIndex]}`}
                            alt={part.name}
                        />
                        <button onClick={goToNextImage} className="next-btn">Next</button>
                    </div>
                ) : (
                    <img src="/assets/placeholder.jpg" alt="Placeholder" />
                )}
            </div>

            <h1>{part.name}</h1>
            <p className="price">{price.toFixed(2)} € </p>
            <p>Varaosanumero: {part.part_number}</p>
            <p>Määrä: {part.stock}</p>
            <p className="part-description">Kuvaus:</p>
            <p className="detail-description">{part.description}</p>

            {/* Quantity and Add to Cart */}
            <div className="purchase-container">
                <div className="quantity-container">
                    <button onClick={decreaseQty}>-</button>
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
                    <button onClick={increaseQty}>+</button>
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
    );
};

export default PartDetailsPage;
