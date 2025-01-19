import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSucess } from "../Utils";
const Login = () => {
  const [loginInfo, setloginInfo] = useState({
   
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  };

  const handlelogin = async (e) => {
    e.preventDefault();

    const {  email, password } = loginInfo;

    if ( !email || !password) {
      return handleError("All field are  required");
    }

    try {
      const url = `${import.meta.env.VITE_URL}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken,name,error } = result;
     
      
      if (success) {
        handleSucess(message);
        localStorage.setItem('token' , jwtToken);
        localStorage.setItem('loggedInUser' , name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handlelogin}>
       

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={loginInfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={loginInfo.password}
          />
        </div>

        <button> Login</button>
        <span>
          Don't have an account ? <Link to="/signup">signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
};
export default Login;
