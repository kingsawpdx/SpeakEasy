//npm install react-icons
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import { FaEnvelope, FaYoutube, FaInstagram  } from "react-icons/fa";

const WelcomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  

  return (
    <div className="welcome-container" >
      <header className="welcome-header">
      <h1 className="logo">SpeakEasy</h1>
  
        <div className="auth-buttons">
          <button className="header-button" onClick={() => navigate("/login")}>Login</button>
          <button className="header-button signup-button" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </header>


      <div className="content">
        <p className="intro-text">
          SpeakEasy is an Augmentative and Alternative Communication (AAC) web
          app designed to assist individuals in communication.
        </p>
        <Link to="/home" className="start-button">
          Let's Get Started →
        </Link>
      </div>
      <footer className="welcome-footer">
        <h3>Contacts</h3>
        <ul>
          <li><FaEnvelope /> <a href="mailto:SpeakEasy@gmail.com">SpeakEasy@gmail.com</a></li>
          <li><FaYoutube style={{ color: "red" }} /> <a href="https://www.youtube.com/watch?v=qB2Fk0KdUuo&t=9s" target="_blank" rel="noopener noreferrer">YouTube Channel</a></li>
          <li><FaInstagram style={{ color: "#E1306C" }} /> <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">Instagram Profile</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default WelcomePage;