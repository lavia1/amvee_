import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error loading cart from LocalStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to LocalStorage", error);
    }
  }, [cart]);

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

  const removeFromCart = (part_id) => {
    setCart((prev) => prev.filter((item) => item.part_id !== part_id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const updateQuantity = (part_id, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.part_id === part_id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
