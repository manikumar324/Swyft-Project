import React, { useEffect, useState } from 'react';
import ScreenSaver from '../assets/ScreenSaver.gif';
import Dashboard from './Dashboard';
import SignupModal from "./signupModal"
const InitialScreen = () => {
  const [isScreenSaverActive, setIsScreenSaverActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScreenSaverActive(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isScreenSaverActive ? (
        <div className='flex justify-center items-center h-[100vh]'>
          <div>
            <img src={ScreenSaver} className='w-40 md:w-56 m-auto rounded-tr-[20%] rounded-bl-[20%] ' alt="Screen Saver"/>
          </div>
        </div>
      ) : (
        <SignupModal/>
      )}
    </>
  );
};

export default InitialScreen;
