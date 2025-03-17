//npm install react-icons
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import { FaEnvelope, FaYoutube, FaInstagram  } from "react-icons/fa";

const WelcomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(`http://localhost:3000/words?query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };



  return (
    <div className="welcome-container" >
      <header className="welcome-header">
      <h1 className="logo">SpeakEasy</h1>

        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">🔍</button>
        </form>


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

      /* Display Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((word) => (
              <li key={word.id}>{word.name}</li>
            ))}
          </ul>
        </div>
      )}

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