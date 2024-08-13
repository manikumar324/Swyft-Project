import React, { useEffect } from 'react';
import NavbarMobile from './NavbarMobile';
import Lottie from 'react-lottie';
import grocery from "../assets/dashboardImg.json";
import Cookie from "js-cookie";
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookie.get('loginToken');
    
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: grocery,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <div className='h-[88vh] md:ml-40 flex flex-col md:flex-row md:justify-between md:items-center bg-orange-400 md:h-screen'>
        <div className='flex flex-col justify-center p-6 md:p-12 space-y-2'> {/* Reduced space between elements */}
          <h1 className='p-2 text-white font-semibold text-md bg-red-500 rounded-md md:w-[60%] md:px-2 w-full cursor-pointer mb-2'>Your Comfort is Our Business</h1> {/* Reduced margin at the bottom */}
          <h1 className='text-2xl md:text-5xl text-white font-bold leading-tight mb-2'>
            We Bring the <br /> Store to Your Door
          </h1>
          <p className='text-md md:text-lg text-white mb-2'>
            NOW! GET <span className='text-black font-semibold italic'>25%</span> OFF ON ALL ITEMS
          </p>
          <div className='flex justify-start'>
            <button className='text-white bg-red-500 p-2 font-semibold rounded-md'>
              Shop Now
            </button>
          </div>
        </div>
        
        {/* Lottie Animation */}
        <div className='flex items-center justify-center md:w-1/2 md:p-12'>
          <Lottie options={defaultOptions} style={{ width: '100%', height: 'auto' }} />
        </div>
      </div>
      <NavbarMobile />
    </>
  );
};

export default Dashboard;
