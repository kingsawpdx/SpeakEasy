import { useState, useEffect } from "react"; 
import React from 'react';

function TextToSpeech({ data, playAudio, displaySettings, changeSettings }) {
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState([]);
 
  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const handleVoiceChange = (event) => {
    setVoice(voices.find((v) => v.name === event.target.value));
  };

  return (
    displaySettings && (
      <div className="tts-container">
        <h2>Text-to-Speech Settings</h2>

        <label>
          Voice:
          <select value={voice?.name || ""} onChange={handleVoiceChange}>
            {voices.map((v) => (
              <option key={v.name} value={v.name}>{v.name}</option>
            ))}
          </select>
        </label>

        <label>
          Pitch:
          <input 
          type="range" 
          min="0.5" 
          max="2" 
          step="0.1" 
          value={pitch} 
          onChange={(e) => setPitch(parseFloat(e.target.value))} />
        </label>

        <label>
          Speed:
          <input 
          type="range" 
          min="0.5" 
          max="2" 
          step="0.1" 
          value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} />
        </label>

        <button onClick={changeSettings}>Submit</button>
      </div>
    )
  );
}
export default TextToSpeech;
