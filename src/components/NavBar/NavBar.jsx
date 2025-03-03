import { Link } from "react-router-dom";
import React from "react";

const NavBar = () => {
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">SpeakEasy</h2>
      <div className="flex gap-4">
        <Link to="/" className="text-black hover:text-gray-600">Home</Link>
        <Link to="/login" className="text-black hover:text-gray-600">Login</Link>
        <Link to="/signup" className="text-black hover:text-gray-600">Sign Up</Link>
      </div>
    </div>
  );
};

export default NavBar;
