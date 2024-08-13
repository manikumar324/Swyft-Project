import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { MailOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { GrSwift } from "react-icons/gr";
import axios from 'axios';
import Cookie from "js-cookie";
import { Toaster, toast } from 'react-hot-toast';
import LoginSuccess from './loginSuccess'; // Ensure this is the correct path
import Dashboard from './Dashboard'; // Assuming you have a Dashboard component
import { Link } from 'react-router-dom';

const Loginform = () => {
  const [modal2Open, setModal2Open] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loginSuccessState, setLoginSuccessState] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://swyft-server.onrender.com/signIn', { email, password });
      if (response.data.success) {
        toast.success(response.data.message);
        
        setModal2Open(false);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        Cookie.set("loginToken", response.data.token);
        setLoginSuccessState(true);

        setTimeout(() => {
          setLoginSuccessState(false);
          setShowDashboard(true); 
        }, 5000);
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred during login');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://swyft-server.onrender.com/signup', { name, email, password });
      if (response.data.success) {
        toast.success(response.data.message);
        setIsSignup(false); 
      } else {
        toast.error(response.data.message || 'Signup failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred during signup');
    }
  };

  return (
    <>
      <Toaster />

      {loginSuccessState ? (
        <LoginSuccess /> 
      ) : showDashboard ? (
        <Dashboard /> 
      ) : (
        <Modal
          centered
          open={modal2Open}
          onCancel={() => setModal2Open(false)}
          footer={null}
        >
          <br />
          <form className="h-auto flex flex-col justify-around items-center" onSubmit={isSignup ? handleSignup : handleLogin}>
            <div className='flex justify-center items-center p-3 border-t-orange-400 border-l-black border-4 rounded-sm'>
              <h1 className='text-orange-400 text-xl font-bold'>
                Welcome to <span className='text-black font-serif font-semibold'>Swyft </span>
              </h1>
              <GrSwift />
            </div>
            <br />
            {isSignup && (
              <Input
                size="large"
                placeholder="Name"
                prefix={<MailOutlined className='text-orange-500' />}
                className="border border-orange-500 b-4 p-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <br />
            <Input
              size="large"
              placeholder="E-mail"
              prefix={<MailOutlined className='text-orange-500' />}
              className="border border-orange-500 b-4 p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<LockOutlined className='text-orange-500' />}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="border border-orange-500 b-4 p-3 text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              visibilityToggle
            />
            <br />
            <button type="submit" className='bg-black font-semibold text-orange-500 w-full p-3 mx-auto'>
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
            <br />
            <div className='flex justify-center items-center'>
              <hr className='h-1 bg-slate-700 w-24' />
              <span className='bg-orange-500 text-white rounded-[90%] p-2 border border-slate-700 border-3'>OR</span>
              <hr className='h-1 bg-slate-700 w-24' />
            </div>
            <br />
            <span>
              {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
            </span>
            <br />
            <button 
              className='bg-orange-500 font-semibold text-black w-full p-3 mx-auto' 
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
            <br />
            {!isSignup && (
              <span className="text-orange-500">Don't have an account? <Link to="/login">Sign Up</Link></span>
            )}
          </form>
        </Modal>
      )}
    </>
  );
};

export default Loginform;
