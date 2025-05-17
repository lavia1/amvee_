import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
    const {clearCart} = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        clearCart();

        const timer = setTimeout(() => {
            navigate("/")
        }, 5000);

        return () => clearTimeout(timer);
    }, [clearCart, navigate]);

    return (
        <div>
            <h1>Kiitos ostoksestasi</h1>
            <p>Maksu onnistui ja ostoskori on tyhjennetty</p>
            <p>Sinut ohjataan pian takaisin etusivulle</p>
        </div>
    );
};

export default CheckoutSuccess;