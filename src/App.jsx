import { useEffect, useState } from "react";
import "./App.css";

import TextToSpeech from "./Components/TextToSpeech";
function App() {
  const [words, setWords] = useState([]);
  const [play, setPlay] = useState(false);
  const [input, setInput] = useState("");
  const [settings, setSettings] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/words")
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePlay = () => {
    setPlay(true);
  };

  const changeSettings = () => {
    setSettings(!settings);
  };

  useEffect(() => {
    setPlay(false);
  }, [play]);

  return (
    <>
      <h1>SpeakEasy</h1>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word.word}</li>
        ))}
      </ul>
      <label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>

      <button style={{ margin: "10px" }} onClick={handlePlay}>
        Click
      </button>
      <button onClick={changeSettings}>Change settings</button>
      <TextToSpeech
        data={input}
        playAudio={play}
        displaySettings={settings}
        changeSettings={changeSettings}
      />
    </>
  );
}

export default App;
