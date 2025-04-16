import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Axios from "axios";
import "../styles/PartDetails.css";

const PartDetailsPage = () => {
    const {partNumber} = useParams();
    const [part, setPart] = useState(null);
    const [quantity, setQuantity] = useState(1);


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

    // Määrän lisäys ostoskoria varten
    const increaseQty = () => {
        if (quantity < part.stock) {
            setQuantity(prev => prev +1);
        }
    };

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity(prev => prev -1);
        }
    };

    const handleAddToCart = () => {
        console.log(`Lisätty ${quantity} ${part.name} ostoskoriin`);
    }

    if (!part) return <div>Lataa...</div>;

    return (
        <div className="detail-container">
            <img src={part.image_url || "placeholder.jpg"} alt={part.name} />
            <h1>{part.name}</h1>
            <p className="price">${part.price.toFixed(2)}</p>
            <p>Varaosanumero: {part.part_number}</p>
            <p>Määrä: {part.stock}</p>
            <p className="part-description">
                Kuvaus: <br />{part.description}
            </p>
    
            {/* ✅ Wrap quantity + button in one container */}
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
    
                <button className="add-to-cart" onClick={handleAddToCart}>
                    Lisää ostoskoriin
                </button>
            </div>
        </div>
    );
    
};

export default PartDetailsPage;