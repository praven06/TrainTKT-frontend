import React from "react";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-800 border-b-2 border-gray-700 z-50">
      <Link to="/home">
        <button className="text-teal-300 text-xl font-semibold hover:text-teal-400 transition duration-300">
          Home
        </button>
      </Link>

      <Link to="/profile">
        <button className="flex items-center">
          <img
            className="w-10 h-10 rounded-lg border border-white"
            src={profile}
            alt="profile"
          />
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
