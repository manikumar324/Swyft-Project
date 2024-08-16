import React from 'react';
import './style.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/bannerbird.jpeg';
import vegfruits from '../assets/vegfruits.png';
import dairy from '../assets/dairy.jpg';
import rice from '../assets/rice.jpg';
import meat from '../assets/meat.jpg';
import masala from '../assets/masala.jpg';
import breakfast from '../assets/breakfast.jpg';
import packaged from '../assets/packaged.jpg';
import tea from '../assets/tea.jpg';
import ice from '../assets/cream.jpg';
import frozen from '../assets/iced.jpg';
import sweet from '../assets/choclate.jpg';
import drink from '../assets/coke.jpg';
import lays from '../assets/lays.jpg';
import biscuit from '../assets/biscuit.jpg';
import { Link } from 'react-router-dom';
import Cookie from "js-cookie";
import Lottie from 'react-lottie';
import iceImg from '../assets/ice.json';
import kitchen from '../assets/kitchen.json';


const Categories = () => {
  const navigate = useNavigate();

  const kitchenOptions = {
    loop: true,
    autoplay: true,
    animationData: kitchen,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    const token = Cookie.get('loginToken');
    
    if (!token) {
      
      navigate('/login');
    }
  }, [navigate]);

  const iceImgOptions = {
    loop: true,
    autoplay: true,
    animationData: iceImg,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <>
      <div className='bg-white md:ml-52'>
        <img src={banner} alt='banner' className='w-full md:h-[50vh] h-[40vh]'/>
      <div className='flex justify-center items-center pt-3 pb-2 px-4'>
        <h2 className='text-2xl font-bold md:text-4xl'>All Categories</h2>
      </div>
      <hr className='border-t border-gray-300' />
      <div>
      <div className='flex items-center p-3 py-4'>
          <div className='h-[60px]  w-[60px] md:h-[100px] md:w-[100px] shadow-sm border border-1 border-black rounded-full p-2 md:p-3'>
            <Lottie options={kitchenOptions} />
          </div>
          <h2 className='typing text-lg ml-3 md:text-2xl font-bold text-orange-500'>Grocery & Kitchen</h2>
        </div>
        <div className='grid grid-cols-4 gap-4 md:gap-6 mx-2'>
            <Link to='/categories/grocery&kitchen/vegetables-fruits'className='col-span-2' >
                <div>
                    <img src={vegfruits} loading='lazy' alt=''className=" h-[60px] w-full bg-gray-100 p-1 px-2 rounded-md md:h-[120px] md:p-2 hover:shadow-2xl transition-shadow duration-300"/>
                    <h2 className='font-medium text-center text-xs md:font-bold md:text-lg'>Fruits & <br className='md:hidden'/>Vegetables</h2>
                </div>
            </Link>
            <Link to="/categories/grocery&kitchen/dairy-bread-eggs">
                <div>
                    <img src={dairy}  loading="lazy"  alt=''className='h-[60px] w-full bg-gray-100 p-1 rounded-md md:h-[120px] hover:shadow-2xl transition-shadow duration-300'/> 
                    <h3 className='font-medium text-xs md:font-bold md:text-lg md:text-center'>Dairy,Bread<br className='md:hidden'/><span className='ml-2'>& Eggs</span></h3>
                </div>
            </Link>
            <Link to="/categories/grocery&kitchen/atta-rice-dal&more">
                <div>
                    <img src={rice} loading="lazy"  alt=''className='h-[60px] w-full bg-gray-100 p-1 rounded-md md:h-[120px] md:p-3 hover:shadow-2xl transition-shadow duration-300'/>
                    <h3 className='font-medium text-xs md:font-bold md:text-lg md:text-center'>Atta,Rice,<br className='md:hidden'/>Oil & Dals</h3>
                </div>
            </Link>
            <Link to="/categories/grocery&kitchen/meat-fish&more">
                <div>
                    <img src={meat} loading="lazy"  alt=''className='h-[60px] w-full bg-gray-100 pb-2 md:p-0 rounded-md md:h-[120px] hover:shadow-2xl transition-shadow duration-300'/>
                    <h3 className='font-medium text-xs md:font-bold md:text-lg md:text-center'>Meat,Fish<br className='md:hidden'/><span className='ml-2'>& Eggs</span></h3>
                </div>
            </Link>
            <Link to="/categories/grocery&kitchen/dry-fruits">
            <div>
                <img src={masala}  loading="lazy" alt=''className='h-[60px] w-full bg-gray-100 p-2 rounded-md md:h-[120px] md:p-3 hover:shadow-2xl transition-shadow duration-300'/>
                <h3 className='font-medium text-xs md:font-bold md:text-lg md:text-center'>Dry Fruits</h3>
            </div>
            </Link>
            <Link to="/categories/grocery&kitchen/breakfast">
            <div>
                <img src={breakfast}  loading="lazy" alt=''className='h-[60px] w-full bg-gray-100 p-2 rounded-md md:h-[120px] md:p-3 hover:shadow-2xl transition-shadow duration-300'/>
                <h3 className='font-medium text-xs md:font-bold md:text-lg md:text-center'>Breakfast &<br className='md:hidden'/><span className='ml-2'>Sauces</span></h3>
            </div>
            </Link>
            <Link to="/categories/grocery&kitchen/packaged-food">
            <div>
                <img src={packaged} loading="lazy"  alt=''className='h-[60px] w-full bg-gray-100 p-1 px-2 rounded-md md:h-[120px] md:p-2 hover:shadow-2xl transition-shadow duration-300'/>
                <h3 className='font-medium text-xs md:font-bold md:text-lg md:text-center'>Packaged<br className='md:hidden'/><span className='ml-2'>Food</span></h3>
            </div>
            </Link>
        </div>
      </div>
      <div>
        <div className='flex items-center p-2 py-8 md:py-6'>
          <div className='h-[60px] md:h-[100px] shadow-sm border border-5 border-black rounded-full p-2'>
            <Lottie options={iceImgOptions} />
          </div>
          <h2 className='typing text-lg ml-3 md:text-2xl font-bold text-orange-500'>Snacks & Drinks</h2>
        </div>
        <div className='grid grid-cols-4 gap-4 md:gap-6 mx-2 mb-20'>
        <Link to="/categories/snacks&drinks/cooldrinks-juices" className='col-span-2'>
                <div>
                    <img src={drink} loading="lazy"  alt=''className='h-[60px] w-full bg-gray-100 p-2 rounded-md md:h-[120px] md:p-5 hover:shadow-2xl transition-shadow duration-300'/>
                    <h3 className='font-medium text-xs md:font-bold text-center md:text-lg md:text-center'>Cold Drinks<br className='md:hidden'/><span className='ml-2'>& Juices</span></h3>
                </div>
            </Link>
            <Link to="/categories/snacks&drinks/tea-coffee" >
                <div >
                    <img src={tea} loading="lazy"  alt=''className=" h-[60px] w-full bg-gray-100 p-1 rounded-md md:h-[120px] hover:shadow-2xl transition-shadow duration-300"/>
                    <h2 className='font-medium text-center text-xs md:font-bold md:text-lg'>Tea, Coffee<br className='md:hidden'/>& More</h2>
                </div>
            </Link>
            <Link to="/categories/snacks&drinks/ice-creams">
                <div>
                    <img src={ice}  loading="lazy" alt=''className='h-[60px] w-full bg-gray-100 p-1 rounded-md md:h-[120px] hover:shadow-2xl transition-shadow duration-300'/> 
                    <h3 className='font-medium text-xs md:font-bold md:text-lg md:text-center'>Ice Creams<br className='md:hidden'/><span className='ml-2'>& More</span></h3>
                </div>
            </Link>
            <Link to="/categories/snacks&drinks/frozen-items">
                <div>
                    <img src={frozen} alt=''className='h-[60px] w-full bg-gray-100 p-1 rounded-md md:h-[120px] md:p-2 hover:shadow-2xl transition-shadow duration-300'/>
                    <h3 className='font-medium text-xs md:font-bold md:text-lg text-center'>Frozen<br className='md:hidden'/> Food</h3>
                </div>
            </Link>
            <Link to="/categories/snacks&drinks/sweet-items">
                <div>
                    <img src={sweet} alt=''className='h-[60px] w-full bg-gray-100 p-1 rounded-md md:h-[120px] hover:shadow-2xl transition-shadow duration-300'/>
                    <h3 className='font-medium text-xs md:font-bold md:text-lg text-center'>Sweet <br className='md:hidden'/>Cravings</h3>
                </div>
            </Link>
            <Link to="/categories/snacks&drinks/chips-munchies&more">
                <div>
                    <img src={lays} loading="lazy"  alt=''className='h-[60px] w-full bg-gray-100 p-1 rounded-md md:h-[120px] hover:shadow-2xl transition-shadow duration-300'/>
                    <h3 className='font-medium text-xs md:font-bold md:text-lg md:text-center'>Munchies<br className='md:hidden'/><span className='ml-2'>& Chips</span></h3>
                </div>
            </Link>
            <Link to="/categories/snacks&drinks/biscuits-cookies">
                <div>
                    <img src={biscuit}  loading="lazy" alt=''className='h-[60px] w-full bg-gray-100 p-1 rounded-md md:h-[120px] hover:shadow-2xl transition-shadow duration-300'/>
                    <h3 className='font-medium text-xs  md:font-bold md:text-lg text-center'>Biscuits<br className='md:hidden'/>& Cookies</h3>
                </div>
            </Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default Categories;