import { useState } from "react";

function TextToSpeech({ data, playAudio, displaySettings, changeSettings }) {
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);

  if (playAudio) {
    try {
      const speechSynthesis = window.speechSynthesis;
      const audio = new SpeechSynthesisUtterance(data);
      audio.voice = voice;
      audio.pitch = pitch;
      audio.rate = rate;
      speechSynthesis.speak(audio);
    } catch (error) {
      console.error("Speech synthesis failed:", error);
    }
  }

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
    <div>
      <label>
        Voice:
        <select value={voice?.name} onChange={handleVoiceChange}>
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
          value={pitch}
          onChange={handlePitchChange}
        />
      </label>

      <br />

      <label>
        Speed:
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
        />
      </label>

      <br />
      <button onClick={changeSettings}>Submit</button>
    </div>
  ) : (
    <></>
  );
}

export default TextToSpeech;
