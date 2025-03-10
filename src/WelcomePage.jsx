import { Link } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1 className="logo">SpeakEasy</h1>
        <button className="menu-button">☰</button>
      </header>
      <div className="content">
        <p className="intro-text">
          SpeakEasy is an Augmentative and Alternative Communication (AAC) web
          app designed to assist individuals in communication.
        </p>
        <Link to="/" className="start-button">
          Let's Get Started →
        </Link>
      </div>
      <footer className="welcome-footer">
        <h3>Contacts</h3>
        <ul>
          <li><i className="icon-envelope"></i> Some text</li>
          <li><i className="icon-youtube"></i> Some text</li>
          <li><i className="icon-instagram"></i> Some text</li>
        </ul>
      </footer>
    </div>
  );
};

export default WelcomePage;
