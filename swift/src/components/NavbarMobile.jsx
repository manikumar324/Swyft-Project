import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext"; // Correct import
import { TbCategory2 } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { IoIosFlash } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import Lottie from "react-lottie";
import { TbTruckDelivery } from "react-icons/tb";
import laptopHello from "../assets/laptophello.json";

const NavbarMobile = () => {
  const [login, setLoginStatus] = useState(false);
  const { cartLength } = useCart(); // Use the hook to get cartLength
  console.log(cartLength);
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(null); // New error state

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: laptopHello,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const LoginFormFunction = () => {
    setLoginStatus(!login);
  };

  return (
    <div>
      {/* Mobile and small screens */}
      <div className="navbar-mobile fixed bottom-0 left-0 right-0 h-[12vh] bg-gray-300 shadow-lg rounded-tr-lg rounded-tl-lg flex justify-around items-center text-gray-700 md:hidden">
        <Link to="/categories" aria-label="Categories">
          <div className="flex flex-col items-center text-sm">
            <TbCategory2 className="text-2xl text-gray-500 hover:text-orange-600 transition duration-200 ease-in-out" />
            <p className="font-semibold text-orange-500">Categories</p>
          </div>
        </Link>
        <Link to="/" aria-label="Home">
          <div className="flex flex-col items-center text-sm">
            <FaHome className="text-2xl text-gray-500 hover:text-orange-600 transition duration-200 ease-in-out" />
            <p className="font-semibold text-orange-500">Home</p>
          </div>
        </Link>
        <Link to="/cart" aria-label="Cart">
          <div className="relative flex flex-col items-center text-sm">
            <div className="relative">
              <HiShoppingCart className="text-3xl text-gray-500  transition duration-200 ease-in-out" />
              {loading ? (
                <span className="flex items-center justify-center absolute top-0 right-0 h-4 w-4 text-xs text-white bg-gray-400 font-bold p-2 rounded-full">
                  ...
                </span>
              ) : error ? (
                <span className="flex items-center justify-center absolute top-0 right-0 h-4 w-4 text-xs text-white bg-red-400 font-bold p-2 rounded-full">
                  !
                </span>
              ) : cartLength > 0 ? (
                <span className="absolute top-0 right-0 w-4 h-4 text-xs flex items-center justify-center bg-black text-white font-bold p-2 rounded-full">
                  {cartLength}
                </span>
              ) : (
                <span className="flex items-center justify-center absolute top-0 right-0 h-4 w-4 text-xs text-white bg-black font-bold p-2 rounded-full">
                  0
                </span>
              )}
            </div>
            <p className="font-semibold text-orange-500">Cart</p>
          </div>
        </Link>
        <Link to="/orders" aria-label="Orders">
          <div className="flex flex-col items-center text-sm">
            <TbTruckDelivery className="text-2xl text-gray-500 hover:text-orange-600 transition duration-200 ease-in-out" />
            <p className="font-semibold text-orange-500">Orders</p>
          </div>
        </Link>
        <Link to="/contact">
          <div
            className="flex flex-col items-center text-sm"
            onClick={LoginFormFunction}
            aria-label="Contact"
          >
            <FaRegUserCircle className="text-2xl text-gray-500 hover:text-orange-600 transition duration-200 ease-in-out" />
            <p className="font-semibold text-orange-500">Contact</p>
          </div>
        </Link>
      </div>

      {/* Medium and larger screens */}
      <div className="hidden md:ml-1 md:flex md:flex-col md:justify-evenly md:w-[20vw] lg:w-[15vw] bg-white shadow-lg fixed top-0 bottom-0 left-0 p-4">
        <div className="flex justify-center">
          <Lottie options={defaultOptions} height={100} width={150} />
        </div>
        <Link
          to="/categories"
          className="flex items-center mb-4 text-sm md:text-xl bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600 p-2 rounded-lg shadow-lg"
          aria-label="Types"
        >
          <TbCategory2 className="text-3xl text-gray-500 hover:text-orange-600" />
          <p className="ml-2 font-semibold">Types</p>
        </Link>
        <Link
          to="/"
          className="flex items-center mb-4 p-3 text-sm md:text-xl bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600  rounded-lg shadow-lg"
          aria-label="Home"
        >
          <FaHome className="text-3xl text-gray-500 hover:text-orange-600" />
          <p className="ml-2 font-semibold">Home</p>
        </Link>
        <Link to="/cart" aria-label="Cart">
          <div className="relative flex bg-white shadow-lg top-0 bottom-0 left-0 p-4 items-center">
            <div className="relative">
              <HiShoppingCart className="text-3xl text-orange-600" />
              {loading ? (
                <span className="flex items-center justify-center absolute top-0 right-0 h-4 w-4 text-xs text-white bg-gray-400 font-bold p-2 rounded-full">
                  ...
                </span>
              ) : error ? (
                <span className="flex items-center justify-center absolute top-0 right-0 h-4 w-4 text-xs text-white bg-red-400 font-bold p-2 rounded-full">
                  !
                </span>
              ) : cartLength > 0 ? (
                <span className="absolute top-0 right-0 w-4 h-4 text-xs flex items-center justify-center bg-black text-white font-bold p-2 rounded-full">
                  {cartLength}
                </span>
              ) : (
                <span className="flex items-center justify-center absolute top-0 right-0 h-4 w-4 text-xs text-white bg-black font-bold p-2 rounded-full">
                  0
                </span>
              )}
            </div>
            <p className="font-semibold text-orange-500 ml-2 md:text-xl">
              Cart
            </p>
          </div>
        </Link>
        <Link
          to="/orders"
          className="flex items-center mb-4 p-3 text-sm md:text-xl bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600  rounded-lg shadow-lg"
          aria-label="Orders"
        >
          <TbTruckDelivery className="text-3xl text-gray-500 hover:text-orange-600" />
          <p className="ml-2 font-semibold">Orders</p>
        </Link>
        <Link to="/contact">
          <div
            className="flex items-center mb-4 p-3 text-sm md:text-xl bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600  rounded-lg shadow-lg"
            onClick={LoginFormFunction}
            aria-label="Contact"
          >
            <FaRegUserCircle className="text-3xl text-gray-500 hover:text-orange-600" />
            <p className="ml-2 font-semibold">Contact</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavbarMobile;
