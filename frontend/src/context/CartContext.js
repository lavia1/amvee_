import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));  
      }
    } catch (error) {
      console.error("Error loading cart from LocalStorage", error);
    }
  }, []); 

  
  useEffect(() => {
    if (cart.length > 0) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));  
      } catch (error) {
        console.error("Error saving cart to LocalStorage", error);
      }
    }
  }, [cart]); 

  // Add a part to the cart or update the quantity if it's already in the cart
  const addToCart = (part, quantity) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.part_id === part.id);
      if (existing) {
        return prev.map((item) =>
          item.part_id === part.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          part_id: part.id,
          part_number: part.part_number || part.partNumber,
          name: part.name,
          price: part.price,
          image_url: Array.isArray(part.image_url) ? part.image_url[0] : part.image_url,
          quantity,
        },
      ];
    });
  };
  

  // Remove a part from the cart
  const removeFromCart = (part_id) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.part_id !== part_id);
  
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    
      return updatedCart;
  });
};


  // Clear the entire cart
  const clearCart = () => {
    localStorage.removeItem("cart"); 
    setCart([]);  
  };

  // Update the quantity of a part in the cart
  const updateQuantity = (part_id, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.part_id === part_id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};