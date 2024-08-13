import React from 'react';
import Lottie from 'react-lottie';
import LoginSuccessLottie from '../assets/hands.json'; // Ensure the path is correct

const LoginSuccess = () => {
  const defaultOptions = {
    loop: true, // Whether to loop the animation
    autoplay: true, // Whether to start the animation on load
    animationData: LoginSuccessLottie, // Import the animation JSON
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice' // Adjust the aspect ratio
    }
  };

  // Retrieve and parse userData from localStorage
  const userDataString = localStorage.getItem("userData");
  let userName = 'User';

  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString);
      userName = userData.name || 'User'; // Default to 'User' if name is not found
    } catch (error) {
      console.error('Error parsing userData:', error);
    }
  }

  return (
    <div className='flex flex-col justify-around items-center h-[100vh]'>
      <Lottie options={defaultOptions} height={400} width={330}/>
      <h1 className='text-xl font-bold'>Welcome To Swyft, <span className='animate-pulse text-orange-500'>{userName}</span>!</h1>
    </div>
  );
};

export default LoginSuccess;
