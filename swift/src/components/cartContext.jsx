import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

//This component is mainly used to get the cart length for cart section
// Create Context for the Cart
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
    
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userDataString = localStorage.getItem("userData");
        let userId = "Guest"; // Default value if userData is not available

        if (userDataString) {
          try {
            const userData = JSON.parse(userDataString);
            userId = userData.uuid || "Guest"; // Default to 'Guest' if uuid is not found
          } catch (error) {
            console.error("Error parsing userData:", error);
          }
        }

        const response = await axios.post("https://swyft-server.onrender.com/length", { userId });
        setCartLength(response.data.Cartlength);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    // Fetch cart items initially
    fetchCartItems();

    // Set up interval to fetch cart items every 2 seconds
    const intervalId = setInterval(fetchCartItems, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Runs only once on mount to set up interval

  return (
    <CartContext.Provider value={{ cartLength, setCartLength }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use Cart Context
export const useCart = () => useContext(CartContext);