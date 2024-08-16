import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context for the Cart
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartLength, setCartLength] = useState(() => {
    // Initialize cart length from localStorage
    const savedLength = localStorage.getItem('cartLength');
    return savedLength ? parseInt(savedLength, 10) : 0;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const length = localStorage.getItem('cartLength');
      setCartLength(length ? parseInt(length, 10) : 0);
    };

    // Listen for localStorage changes
    window.addEventListener('storage', handleStorageChange);

    // Trigger the effect every second
    const intervalId = setInterval(() => {
      handleStorageChange();
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  // Function to update cart length
  const updateCartLength = (length) => {
    setCartLength(length);
    localStorage.setItem('cartLength', length);
  };

  return (
    <CartContext.Provider value={{ cartLength, updateCartLength }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use Cart Context
export const useCart = () => useContext(CartContext);