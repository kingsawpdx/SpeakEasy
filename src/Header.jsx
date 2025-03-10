import { useState } from "react"; //manage TextToSpeech visibility
import TextToSpeech from "../components/TextToSpeech"; 

const Header = ({ category, text, clearHeader, playHeader }) => {
  const [showTTS, setShowTTS] = useState(false); //state to track if TextToSpeech is visible
  const [playAudio, setPlayAudio] = useState(false); //state to trigger speech playback

  const toggleTTS = () => {
    setShowTTS((prev) => !prev); //function to toggle the TextToSpeech component
  };
  
  if (category) {
    console.log(category);
    category = category.charAt(0).toUpperCase() + category.slice(1);
  }
  return (
    <div
      className="fixed-top bg-light text-dark p-3"
      style={{
        height: "120px",
        display: "flex",
        alignItems: "center",
        //zIndex: 1,
        zIndex: 2, //make sure it's above other content
      }}
    >
      {/*show selected text */}
      {text ? (
        <h5>{text}</h5>
      ) : (
        <h5 className="mx-auto">Selected Words Will Appear Here</h5>
      )}

      {/*a button to toggle the TextToSpeech settings */}
      <button
          onClick={toggleTTS}
          style={{
            backgroundColor: "blue",
            color: "white",
            borderRadius: "10px",
            padding: "5px 10px",
          }}
        >
          {showTTS ? "Hide Voice Settings" : "Show Voice Settings"}
        </button>

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
            marginRight: "10px",
          }}
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
              marginRight: "10px",
            }}
          >
            Clear
          </button>
          <button
            onClick={playHeader}
            style={{
              backgroundColor: "grey",
              borderRadius: "10px",
              marginRight: "10px",
            }}
          >
            Play
          </button>
        </div>
      </div>

      {/*render the TextToSpeech component if showTTS = true */}
      {showTTS && (
        <TextToSpeech
        data={text} // Pass selected text
        playAudio={playAudio} // Play when triggered
        displaySettings={showTTS} // Control visibility
        changeSettings={setShowTTS} // Toggle function
      />
      )}

    </div>
  );
};

export default Header;
