import React from "react";
import Slider from "react-slick";
import NavbarMobile from "./NavbarMobile";
import Lottie from "lottie-react";
import animationData1 from "../assets/fruitsHero.json";
import animationData2 from "../assets/coffeeHero.json";
import animationData3 from "../assets/juiceHero.json";
import animationData4 from "../assets/sweetHero.json";
import animationData5 from "../assets/vegetablesHero.json";
import fastdelivery from "../assets/fastdelivery.json";
import payment from "../assets/payment.json";
import fresh from "../assets/fresh.json";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const animations = [
    animationData1,
    animationData2,
    animationData3,
    animationData4,
    animationData5,
  ];

  const settings = {
    autoplay: true,
    infinite: true,
    speed: 5000, // Slow down the carousel speed
    slidesToShow: 1,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    adaptiveHeight: true,
    pauseOnHover: false,
  };

  return (
    <>
      <div className="overflow-hidden md:ml-36 lg:ml-32 xl:ml-44">
        <Slider {...settings}>
          {animations.map((animation, index) => (
            <div key={index}>
              <div className="relative h-[100vh] bg-orange-100/55">
                <Lottie
                  animationData={animation}
                  loop={true}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
        <div className=" fixed  md:ml-36 lg:ml-44 xl:ml-64 inset-0 flex flex-col items-center justify-center text-center bg-opacity-0 bg-gray-900 text-clip p-4">
          <h2 className="text-4xl font-bold mb-4 text-clip text-black">
            Welcome to{" "}
            <span className="text-purple-600 animate-pulse transition-shadow">
              Swifty
            </span>{" "}
            Grocery Delivery App
          </h2>
          <p className="mb-6 text-lg text-clip">
            Get your groceries delivered fast and fresh to your doorsteps.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link to="/categories">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-orange-600 transition">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <NavbarMobile />
      <div className="bg-white bg-opacity-80 mb-20 backdrop-blur-3xl  md:ml-36 lg:ml-44 xl:ml-44  py-2 md:py-0">
        <h1 className="text-center text-xl md:text-3xl p-2 font-bold text-orange-500">
          OUR SERVICES
        </h1>
        <hr className="h-2  mx-2" />
        <div className="md:grid md:grid-cols-3 gap-4 rounded-md  lg:grid lg:grid-cols-3 xl-grid-cols-3 m-3">
          <div className="flex flex-col justify-center rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300 items-center p-6 m-2 mb-4 bg-white bg-opacity-80 backdrop-blur-3xl  md:p-6">
            <div className="flex items-center justify-center w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
              <Lottie animationData={fastdelivery} />
            </div>
            <h1 className="font-bold text-xl py-2 mt-2">Fastest Delivery</h1>
            <p className="text-gray-500 text-md">
              Get your groceries delivered at lightning speed! With our swift
              delivery service, you can count on receiving your essentials in
              record time—no more long waits or delays.
            </p>
          </div>
          <div className="flex flex-col rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300 justify-center items-center p-6 m-2 mb-4 bg-white bg-opacity-80 backdrop-blur-3xl md:p-6">
            <div className="flex items-center justify-center w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
              <Lottie animationData={fresh} />
            </div>
            <h1 className="font-bold text-xl py-2">Fresh Products</h1>
            <p className="text-gray-500 text-md">
              We offer the freshest products, carefully selected each day. Savor
              the taste of quality with every bite, knowing that we prioritize
              your health and satisfaction.
            </p>
          </div>
          <div className="flex flex-col justify-center rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300 items-center p-6 m-2 mb-4 bg-white bg-opacity-80 backdrop-blur-3xl  md:p-6">
            <div className="flex items-center justify-center w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
              <Lottie animationData={payment} />
            </div>
            <h1 className="font-bold text-xl py-2">Cash On Delivery</h1>
            <p className="text-gray-500 text-md">
              Prefer paying in cash? Choose our Cash on Delivery option and pay
              for your groceries when they arrive at your doorstep. It’s a
              convenient way to shop without needing a card or online
              payment—just order and pay when you receive your items.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
