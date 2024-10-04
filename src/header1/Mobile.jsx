// Header.js
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Traveloka from "../assets/Logo1.png";

import UserInfo from "./UserInfo";
import Login from "./Login";

const Header = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setToken(userData.token);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
  };

  return (
    <header className="fixed top-0 z-50 w-full  shadow-md  items-center  p-2 bg-white">
      {/* Logo/Image */}
      <div className=" w-[80%] mx-auto flex items-center justify-between ">
        {/* Login/Register */}

        <Link to ='/'>
        <div className="flex">
          <img src={Traveloka} alt="Logo" className=" w-[100px]" />
        </div>
        </Link>
        <div className="text-center">{user ? <UserInfo /> : <Login />}</div>

      
      </div>
    </header>
  );
};

export default Header;
