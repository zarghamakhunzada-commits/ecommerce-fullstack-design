import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // 🔥 Product ko cart mein add karne ka updated function
  const addToCart = (product) => {
    if (!product) return; // Guard clause agar product undefined ho
    
    setCartItems((prevItems) => {
      /* 🔥 Number() hata diya aur id ke bajaye _id use ki kyunki MongoDB string use karta hai */
      const exist = prevItems.find((item) => item._id === product._id);
      if (exist) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // 🔥 Cart se item remove karne ka updated function
  const removeFromCart = (id) => {
    /* 🔥 Number() hata kar string base unique _id matching lagayi */
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  // Total quantity count (Navbar ke liye)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Total amount calculate karne ke liye
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}