//npm install react-icons
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import { FaEnvelope, FaYoutube, FaInstagram } from "react-icons/fa";

const WelcomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1 className="logo">SpeakEasy</h1>
        <button className="menu-button" onClick={toggleMenu}>☰</button>

        {menuOpen && (
          <div className="dropdown-menu">
            <Link to="/login" className="menu-item">Login</Link>
            <Link to="/signup" className="menu-item">Sign Up</Link>
          </div>
        )}
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
          <li><FaEnvelope /> <a href="mailto:SpeakEasy@gmail.com">SpeakEasy@example.com</a></li>
          <li><FaYoutube style={{ color: "red" }} /> <a href="https://www.youtube.com/yourchannel" target="_blank" rel="noopener noreferrer">YouTube Channel</a></li>
          <li><FaInstagram style={{ color: "#E1306C" }} /> <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">Instagram Profile</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default WelcomePage;
