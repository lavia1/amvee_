import React, { useState } from "react";
import Axios from 'axios';
import "./checkoutform.css";

const CheckoutForm = ({
    cartTotal,
    shippingCost,
    grandTotal,
    shippingMethod,
    onCancel,
    cartItems,
    clearCart,
}) => {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        country: "",
        street_address: "",
        street_address2: "",
        city: "",
        postal_code: "",
        region: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const payload = {
            session_id: "guest-" + Date.now(),
            ...formData,
            items: cartItems.map((item) => ({
                part_id: item.part_id,
                quantity: item.quantity,
            })),
            shipping_method: shippingMethod,
        };

        try {
            const response = await Axios.post("http://localhost:3000/api/orders", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setOrderSuccess(true);

                setTimeout(() => {
                    clearCart();
                }, 3000);

            } else {
                setError(response.data.error || "Virhe tilauksen tekemisessä.");
            }
        } catch (err) {
            console.error("Order submission error:", err);
            setError("Palvelinvirhe. Yritä uudelleen.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderSuccess) {
        return <div className="order-confirmation">Kiitos tilauksestasi!</div>;
        
    }

    return (
        <div className="checkout-form">
            <div className="checkout-formContainer">
            <h1>Laskutustiedot</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nimi *</label>
                <input
                    name="full_name"
                    onChange={handleChange}
                    placeholder="Etu- ja sukunimi"
                    required
                />
                <label htmlFor="email">Sähköpostiosoite *</label>
                <input
                    
                    name="email"
                    type="email"
                    onChange={handleChange}
                    placeholder="..."
                    required
                />
                <label htmlFor="phonenumber">Puhelinnumero *</label>
                <input
                    name="phone_number"
                    onChange={handleChange}
                    placeholder="..."
                    required
                />
                <label htmlFor="address">Katuosoite *</label>
                <input
                    name="street_address"
                    onChange={handleChange}
                    placeholder="Kadunnimi ja talon numero"
                    required
                />
                <input
                    name="street_address2"
                    onChange={handleChange}
                    placeholder="Huoneisto, yksikkö jne. (valinnainen)"
                />
                <label htmlFor="postal_code">Postinumero *</label>
                <input
                    name="postal_code"
                    onChange={handleChange}
                    placeholder="..."
                    required
                />
                <label htmlFor="city">Postitoimipaikka *</label>
                <input
                    
                    name="city"
                    onChange={handleChange}
                    placeholder="..."
                    required
                />
                <label htmlFor="name">Alue</label>
                <input
                    name="region"
                    onChange={handleChange}
                    placeholder="Alue (valinnainen)"
                />
                <label htmlFor="country">Maa</label>
                <input
                    name="country"
                    onChange={handleChange}
                    placeholder="Maa (valinnainen)"
                    required
                />

                <div className="summary">
                    <p>Tuotteet: {cartTotal.toFixed(2)} €</p>
                    <p>Toimitus: {shippingCost.toFixed(2)} €</p>
                    <strong className="total">Yhteensä: {grandTotal.toFixed(2)} €</strong>
                </div>

                {error && <div className="error">{error}</div>}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Lähetetään..." : "Vahvista tilaus"}
                </button>
                <button type="button" onClick={onCancel}>
                    Takaisin
                </button>
            </form>
        </div>
        </div>
    );
};

export default CheckoutForm;
