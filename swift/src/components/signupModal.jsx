import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { GrSwift } from "react-icons/gr";
import axios from "axios";
import Cookie from "js-cookie";
import { Toaster, toast } from "react-hot-toast";
import LoginSuccess from "./LoginSuccess";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner"; // Import the loader component

const Loginform = () => {
  const [modal2Open, setModal2Open] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loginSuccessState, setLoginSuccessState] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loader

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookie.get("loginToken");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://swyft-server.onrender.com/signIn",
        { email, password }
      );
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
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "An error occurred during login"
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://swyft-server.onrender.com/signup",
        { name, email, password }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsSignup(false);
        setEmail("");
        setPassword("");
        setName("");
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "An error occurred during signup"
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://swyft-server.onrender.com/forgot-password",
        { email, newPassword: password }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsForgotPassword(false);
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred during password reset"
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      handleSignup(e);
    } else if (isForgotPassword) {
      handleForgotPassword(e);
    } else {
      handleLogin(e);
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
          <form
            className="h-auto flex flex-col justify-around items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center items-center p-3 border-t-orange-400 border-l-black border-4 rounded-sm">
              <h1 className="text-orange-400 text-xl font-bold">
                Welcome to{" "}
                <span className="text-black font-serif font-semibold">
                  Swyft{" "}
                </span>
              </h1>
              <GrSwift />
            </div>
            <br />
            {isSignup && (
              <>
                <Input
                  size="large"
                  placeholder="Name"
                  prefix={<MailOutlined className="text-orange-500" />}
                  className="border border-orange-500 b-4 p-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <br />
                <Input
                  size="large"
                  placeholder="E-mail"
                  prefix={<MailOutlined className="text-orange-500" />}
                  className="border border-orange-500 b-4 p-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <br />
                <Input.Password
                  size="large"
                  placeholder="Password"
                  prefix={<LockOutlined className="text-orange-500" />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="border border-orange-500 b-4 p-3 text-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  visibilityToggle
                />
              </>
            )}

            {!isSignup && (
              <>
                <Input
                  size="large"
                  placeholder="E-mail"
                  prefix={<MailOutlined className="text-orange-500" />}
                  className="border border-orange-500 b-4 p-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <br />
                {isForgotPassword ? (
                  <Input.Password
                    size="large"
                    placeholder="New Password"
                    prefix={<LockOutlined className="text-orange-500" />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    className="border border-orange-500 b-4 p-3 text-gray-800"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    visibilityToggle
                  />
                ) : (
                  <Input.Password
                    size="large"
                    placeholder="Password"
                    prefix={<LockOutlined className="text-orange-500" />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    className="border border-orange-500 b-4 p-3 text-gray-800"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    visibilityToggle
                  />
                )}
              </>
            )}

            <br />
            <button
              type="submit"
              className="bg-black font-semibold text-orange-500 w-full p-3 mx-auto flex justify-center items-center"
            >
              {loading ? (
                <ThreeDots
                  height="30"
                  width="30"
                  radius="9"
                  color="#fff"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              ) : isSignup ? (
                "Sign Up"
              ) : isForgotPassword ? (
                "Reset Password"
              ) : (
                "Login"
              )}
            </button>

            <br />
            <div className="flex justify-center items-center">
              <hr className="h-1 bg-slate-700 w-24" />
              <span className="bg-orange-500 text-white rounded-[90%] p-2 border border-slate-700 border-3">
                OR
              </span>
              <hr className="h-1 bg-slate-700 w-24" />
            </div>
            <br />
            <button
              className="bg-orange-500 font-semibold text-black w-full p-3 mx-auto"
              onClick={() => {
                if (isSignup) {
                  setIsSignup(false);
                } else if (isForgotPassword) {
                  setIsForgotPassword(false);
                } else {
                  setIsForgotPassword(true);
                }
                setPassword(""); // Reset password field when switching modes
              }}
            >
              {isSignup
                ? "Login"
                : isForgotPassword
                ? "Login"
                : "Reset Password"}
            </button>
            <br />
            {!isSignup && (
              <span className="text-orange-500">
                {isForgotPassword ? null : "Don't have an account? "}
                <Link to="/login" onClick={() => setIsSignup(true)}>
                  {isForgotPassword ? "" : "Sign Up"}
                </Link>
              </span>
            )}
          </form>
        </Modal>
      )}
    </>
  );
};

export default Loginform;
