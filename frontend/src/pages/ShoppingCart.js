import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/ShoppingCart.css"; // Make sure to style your page

const ShoppingCart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Shipping method state (default to delivery)
  const [shippingMethod, setShippingMethod] = useState('delivery');

  // Shipping cost based on shipping method
  const shippingCost = shippingMethod === 'pickup' ? 0.00 : 10.00;

  // Grand total
  const grandTotal = totalPrice + shippingCost;

  // Handle shipping method change
  const handleShippingMethodChange = (event) => {
    setShippingMethod(event.target.value);
  };

  if (cart.length === 0) {
    return <div className="cart-empty">Ostoskorisi on tyhjä.</div>;
  }

  return (
    <div className="shopping-cart">
      <h1>Ostoskori</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.part_id} className="cart-item">
          <img src={item.image_url || "placeholder.jpg"} alt={item.name} />
          <div className="cart-item-details">

            <h2>{item.name}</h2>
            <p>Hinta: {item.price.toFixed(2)} €</p>
            <div className="quantity-container">
              <button
                onClick={() =>
                  updateQuantity(item.part_id, Math.max(1, item.quantity - 1))
                }
              >
                -
              </button>
              <span style={{ margin: "0 10px" }}>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.part_id, item.quantity + 1)
                }
              >
                +
              </button>
            </div>
          </div>
          <button onClick={() => removeFromCart(item.part_id)} className="remove-btn">
            Poista
          </button>
        </div>
        
        ))}

      </div>

      <div className="total-price">
        <p>Yhteensä: {totalPrice.toFixed(2)} €</p>
      </div>

      {/*Shipping method selection */}
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
          Postimaksu (10,00e)
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

      <div className="shipping-cost">
        <p>Toimituskulut: {shippingCost.toFixed(2)} e</p>
      </div>


      <div className="grand-total">
        <p>Yhteensä toimituskulujen kanssa: {grandTotal.toFixed(2)} e</p>
      </div>

      <div className="checkout">
        <button className="clear-cart-btn" onClick={clearCart}>
          Tyhjennä kori
        </button>
        {/* You could add a checkout button here */}
        <button className="checkout-btn">
          Kassa
        </button>
      </div>

    </div>
  );
};

export default ShoppingCart;
