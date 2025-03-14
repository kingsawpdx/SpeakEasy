import { useEffect } from "react";

function TextToSpeech({
  data,
  playAudio,
  displaySettings,
  changeSettings,
  voice,
  setVoice,
  pitch,
  setPitch,
  rate,
  setRate,
}) {
  const handleVoiceChange = (event) => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices.find((v) => v.name === event.target.value));
  };

  const handlePitchChange = (event) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleRateChange = (event) => {
    setRate(parseFloat(event.target.value));
  };

  return displaySettings ? (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <label>
        Voice:
        <select value={voice?.name || ""} onChange={handleVoiceChange}>
          {window.speechSynthesis.getVoices().map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label>
        Pitch:
        <input 
        type="range" 
        min="0.5" 
        max="2" 
        step="0.1" 
        value={pitch} onChange={handlePitchChange} />
      </label>
      <br />
      <label>
        Speed:
        <input 
        type="range" 
        min="0.5" 
        max="2" step="0.1" 
        value={rate} 
        onChange={handleRateChange} />
      </label>
      <br />
      <button onClick={changeSettings}>Submit</button>
    </div>
  ) : null;
}

export default TextToSpeech;
