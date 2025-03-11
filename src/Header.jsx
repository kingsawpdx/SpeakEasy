import { useState } from "react"; 
import TextToSpeech from "./Components/TextToSpeech";

const Header = ({ category, text, clearHeader, playHeader }) => {
  const [showTTS, setShowTTS] = useState(false);
  
  const toggleTTS = () => {
    setShowTTS((prev) => !prev); 
  };
  
  if (category) {
    console.log(category);
    category = category.charAt(0).toUpperCase() + category.slice(1);
  }
  
  return (
    <header
    className="fixed-top bg-light text-dark p-3"
    style={{
      height: "120px",
      display: "flex",
      alignItems: "center",
      zIndex: 2, 
    }}
  >
    <h1>SpeakEasy</h1>
    <h1>SpeakEasy</h1>
      {/* Floating button to open TextToSpeech settings */}
      <button className="tts-toggle-button" onClick={changeSettings}>🎤</button>

      <div
        className="fixed-top bg-black text-white fw-bold"
        style={{
          top: "120px",
          width: "100%",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          zIndex: 1,
        }}
      >
        <button
          onClick={() => history.back()}
          style={{
            backgroundColor: "grey",
            borderRadius: "10px",
            marginRight: "10px",}}
        >
          Back
        </button>
        <p>{category}</p>
        <div>
          <button
            onClick={clearHeader}
            style={{
              backgroundColor: "grey",
              borderRadius: "10px",
              marginRight: "10px",}}
          >
            Clear
          </button>
          <button
            onClick={playHeader}
            style={{
              backgroundColor: "grey",
              borderRadius: "10px",
              marginRight: "10px",}}
          >
            Play
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
