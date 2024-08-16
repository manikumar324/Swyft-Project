import React, { useState, useEffect } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import axios from "axios";

const PackagedFood = ({ items }) => {
  const [quantities, setQuantities] = useState({});
  const [uniqueItems, setUniqueItems] = useState(new Set()); // Track unique item IDs

  const userDataString = localStorage.getItem("userData");
  let userId = "Guest";

  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString);
      userId = userData.uuid || "Guest";
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
  }

  useEffect(() => {
    // Load initial quantities and unique items from local storage
    const localCart = JSON.parse(localStorage.getItem("cart")) || {};
    const localUniqueItems = new Set(
      JSON.parse(localStorage.getItem("uniqueItems")) || []
    );
    setQuantities(localCart);
    setUniqueItems(localUniqueItems);
    updateCartLength(); // Initialize cart length
  }, []);

  const updateLocalCart = (item, action) => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || {};
    const { _id } = item;

    if (action === "increase") {
      if (!localCart[_id]) {
        localCart[_id] = 1;
        updateUniqueItems(_id, true); // Update unique items if it's a new item
      } else {
        localCart[_id] += 1;
      }
    } else if (action === "decrease") {
      if (localCart[_id]) {
        localCart[_id] = Math.max(localCart[_id] - 1, 0);
        if (localCart[_id] === 0) {
          delete localCart[_id];
          updateUniqueItems(_id, false); // Remove from unique items if quantity is zero
        }
      }
    }

    localStorage.setItem("cart", JSON.stringify(localCart));
    updateCartLength();
  };

  const updateUniqueItems = (itemId, add) => {
    const localUniqueItems =
      JSON.parse(localStorage.getItem("uniqueItems")) || [];
    const uniqueItemsSet = new Set(localUniqueItems);

    if (add) {
      uniqueItemsSet.add(itemId);
    } else {
      uniqueItemsSet.delete(itemId);
    }

    localStorage.setItem("uniqueItems", JSON.stringify([...uniqueItemsSet]));
    setUniqueItems(uniqueItemsSet);
  };

  const updateCartLength = () => {
    const uniqueItemsSet =
      JSON.parse(localStorage.getItem("uniqueItems")) || [];
    const length = uniqueItemsSet.length;
    localStorage.setItem("cartLength", length);
  };

  const increaseFunction = async (item) => {
    const { _id, name, price, discount, image } = item;

    // Calculate the new quantity
    const currentQuantity = quantities[_id] || 0;
    const newQuantity = currentQuantity + 1;

    // Update local storage and quantities state
    updateLocalCart(item, "increase");
    setQuantities((prev) => ({
      ...prev,
      [_id]: newQuantity,
    }));

    try {
      await axios.post("https://swyft-server.onrender.com/addTocart", {
        id: _id,
        name,
        price,
        discount,
        image,
        userId,
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const decreaseFunction = async (item) => {
    const { _id } = item;

    if (quantities[_id] && quantities[_id] > 0) {
      const newQuantity = Math.max(quantities[_id] - 1, 0);

      // Update quantities state
      setQuantities((prev) => ({
        ...prev,
        [_id]: newQuantity,
      }));

      // Update local storage and cart length
      updateLocalCart(item, "decrease");

      try {
        await axios.post("https://swyft-server.onrender.com/remove", {
          id: _id,
          userId,
          quantity: newQuantity,
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  return (
    <div className="grid mb-20 md:ml-48 overflow-y-auto shadow-xl backdrop-blur-lg grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:ml-64 gap-4">
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl flex flex-col justify-around h-auto p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <p className="mb-4 text-sm bg-orange-600 p-3 float-right text-white font-bold rounded-full ">
              {item.discount}% OFF
            </p>

            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-[70px] md:h-[140px] lg:h-[210px] object-cover rounded-lg"
              />
            )}
            <p className="font-semibold">{item.name}</p>
            <p>1 Piece</p>
            <p className="text-orange-500 font-semibold p-1 w-11 md:w-[60px] mt-1">
              ₹{item.price}
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => decreaseFunction(item)}
                className="bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600 p-2 rounded-lg shadow-lg"
              >
                <IoMdRemove />
              </button>
              <p>{quantities[item._id] || 0}</p>
              <button
                onClick={() => increaseFunction(item)}
                className="bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600 p-2 rounded-lg shadow-lg"
              >
                <IoMdAdd />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PackagedFood;
