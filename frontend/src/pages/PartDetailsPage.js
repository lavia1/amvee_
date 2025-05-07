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
    const [recommendedParts, setRecommendedParts] = useState([]);

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

    useEffect(() => {
        const fetchRecommendedParts = async () => {
            try {
                const response = await Axios.get("http://localhost:3000/api/parts");
                const filtered = response.data
                    .filter(p => p.part_number !== partNumber && p.stock > 0)
                    .slice(0, 4); // take 4 parts only
                setRecommendedParts(filtered);
            } catch (error) {
                console.error("Error fetching recommended parts:", error);
            }
        };
    
        if (part) fetchRecommendedParts(); // only fetch once main part is loaded
    }, [part, partNumber]);
    
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

    const goToPreviousImage = () => {
        setCurrentImageIndex(prev =>
            prev > 0 ? prev - 1: part.image_url.length -1
        );
        
    };

    const goToNextImage = () => {
        setCurrentImageIndex(prev => 
            prev < part.image_url.length - 1 ? prev + 1 : 0
        );
    };

    if (!part) return <div>Ladataan...</div>; 

    const price = isNaN(part.price) ? 0 : Number(part.price);

    return (
        <div className="detail-container">
            <div className="container-background">
            <h1>{part.name}</h1>
            {/* Image Slider */}
            <div className="image-container">
            {part.image_url && Array.isArray(part.image_url) && part.image_url.length > 0 ? (
                <div className="slider">
                    <img
                        src={`${process.env.REACT_APP_API_BASE_URL}${part.image_url[currentImageIndex]}`}
                        alt={part.name}
                        className="slider-image"
                    />
                {part.image_url.length > 1 && (
                    <>
                        <button onClick={goToPreviousImage} className="slider-btn left">&#8249;</button>
                        <button onClick={goToNextImage} className="slider-btn right">&#8250;</button>
                    </>
                )}
            </div>
            ) : (
            <img src="/assets/placeholder.jpg" alt="Placeholder" className="slider-image"/>
            )}
        </div>

            <p className="price">{price.toFixed(2)} € </p>
            <p>Varaosanumero: {part.part_number}</p>
            <p className="detail-description">{part.description} </p>

            {/* Quantity and Add to Cart */}
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
            
            {/* Recommended parts 
            {recommendedParts.length > 0 && (
                <div className="recommended-container">
                    <h2>Suositellut osat</h2>
                    <div className="recommended-grid">
                        {recommendedParts.map((item) => (
                            <div key={item.part_number} className="recommended-card">
                                <img 
                                src={item.image_url && item.image_url[0] 
                                    ? `${process.env.REACT_APP_API_BASE_URL}${item.image_url[0]}` 
                                    : "/assets/placeholder.jpg"} 
                                alt={item.name} 
                                />
                                <h3>{item.name}</h3>
                                <p>{parseFloat(item.price).toFixed(2)} €</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}*/}

        </div>

        
    );
};

export default PartDetailsPage;
