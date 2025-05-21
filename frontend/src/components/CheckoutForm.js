import React, { useState } from "react";
import Axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
import "./checkoutform.css";

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe("pk_test_51RLIDHQ9NhEBHsgQ1Nkxit8D7Cos6wxnf7JLmKvRCPznNY8QJ2Fd8qXYLnlDjlcHpAXuSofTbbTh6pM2MxigFZqu00oadivhVb");

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

    try {
      const response = await Axios.post("http://localhost:3000/api/create-checkout-session", {
        items: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,

        })),
        customerData: formData,
        shippingMethod,
      });

      const sessionId = response.data.id;
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });

    } catch (err) {
      console.error("Stripe redirect error:", err);
      setError("Maksun käsittelyssä tapahtui virhe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-form">
      <div className="checkout-formContainer">
        <h1>Laskutustiedot</h1>
        <form onSubmit={handleSubmit}>
          <label>Nimi *</label>
          <input name="full_name" onChange={handleChange} placeholder="Etu- ja sukunimi" required />

          <label>Sähköpostiosoite *</label>
          <input name="email" type="email" onChange={handleChange} placeholder="..." required />

          <label>Puhelinnumero *</label>
          <input name="phone_number" onChange={handleChange} placeholder="..." required />

          <label>Katuosoite *</label>
          <input name="street_address" onChange={handleChange} placeholder="Kadunnimi ja talon numero" required />
          <input name="street_address2" onChange={handleChange} placeholder="Huoneisto, yksikkö jne. (valinnainen)" />

          <label>Postinumero *</label>
          <input name="postal_code" onChange={handleChange} placeholder="..." required />

          <label>Postitoimipaikka *</label>
          <input name="city" onChange={handleChange} placeholder="..." required />

          <label>Alue</label>
          <input name="region" onChange={handleChange} placeholder="Alue (valinnainen)" />

          <label>Maa</label>
          <input name="country" onChange={handleChange} placeholder="Maa (valinnainen)" required />

          <div className="summary">
            <p>Tuotteet: {cartTotal.toFixed(2)} €</p>
            <p>Toimitus: {shippingCost.toFixed(2)} €</p>
            <strong className="total">Yhteensä: {grandTotal.toFixed(2)} €</strong>
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Lähetetään..." : "Siirry maksamaan"}
          </button>
          <button type="button" onClick={onCancel}>Takaisin</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
