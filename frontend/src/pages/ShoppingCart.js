import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/ShoppingCart.css"; 
import CheckoutForm from "../components/CheckoutForm";

const ShoppingCart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);

  // Calculate total price of items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Default shipping method: 'delivery'
  const [shippingMethod, setShippingMethod] = useState('delivery');
  
  // Set shipping cost based on method
  const shippingCost = shippingMethod === 'pickup' ? 0.00 : 10.00;

  // Calculate grand total (including shipping)
  const grandTotal = totalPrice + shippingCost;

  // Handle shipping method change
  const handleShippingMethodChange = (event) => {
    setShippingMethod(event.target.value);
  };

  // Show checkout form
  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  // Cancel checkout and return to cart
  const handleCancelCheckout = () => {
    setShowCheckout(false);
  };

  // If cart is empty, show a message
  if (cart.length === 0) {
    return <div className="cart-empty">Ostoskorisi on tyhjä.</div>;
  }

  // If checkout is active, show the checkout form
  if (showCheckout) {
    return (
      <CheckoutForm 
        cartTotal={totalPrice}
        shippingCost={shippingCost}
        grandTotal={grandTotal}
        shippingMethod={shippingMethod}
        onCancel={handleCancelCheckout}
        cartItems={cart}
        clearCart={clearCart}
      />
    );
  }

  return (
    <div className="shopping-cart">
      <h1>Ostoskori</h1>
      <div className="cart-items">
        {/* Display cart items */}
        {cart.map((item) => (
        <div key={item.part_id} className="cart-item">
          <img
            src={item.image_url ? `${process.env.REACT_APP_API_BASE_URL}${item.image_url}` : "placeholder.jpg"}
            alt={item.name}
          />


          <div className="cart-item-details">
            <h2>{item.name}</h2>
            <p>Hinta: {Number(item.price).toFixed(2)} €</p> 

          <div className="quantity-container">
            <button className="quantity-button" onClick={() => updateQuantity(item.part_id, Math.max(1, item.quantity - 1))}>-</button>
            <span>{item.quantity}</span>
            <button className="quantity-button" onClick={() => updateQuantity(item.part_id, item.quantity + 1)}>+</button>
          </div>

        </div>
    <button onClick={() => removeFromCart(item.part_id)} className="remove-btn">Poista</button>
  </div>
))}

      </div>

      {/* Show total price */}
      <div className="total-price">
        <p>Yhteensä: {totalPrice.toFixed(2)} €</p>
      </div>

      {/* Shipping method selection */}
      <div className="shipping-method">
        <h3>Valitse toimitustapa:</h3>
        <label>
          <input 
            type="radio"
            name="shippingMethod"
            value="delivery"
            checked={shippingMethod === 'delivery'}
            onChange={handleShippingMethodChange}
          />
          Postimaksu (10,00€)
        </label>
        <label>
          <input 
            type="radio"
            name="shippingMethod"
            value="pickup"
            checked={shippingMethod === 'pickup'}
            onChange={handleShippingMethodChange}
          />
          Nouto (Ilmainen)
        </label>
      </div>

      {/* Shipping cost */}
      <div className="shipping-cost">
        <p>Toimituskulut: {shippingCost.toFixed(2)} €</p>
      </div>

      {/* Grand total */}
      <div className="grand-total">
        <p>Yhteensä toimituskulujen kanssa: {grandTotal.toFixed(2)} €</p>
      </div>

      {/* Checkout buttons */}
      <div className="checkout">
        <button className="clear-cart-btn" onClick={clearCart}>Tyhjennä kori</button>
        <button className="checkout-btn" onClick={handleCheckoutClick}>Kassa</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
