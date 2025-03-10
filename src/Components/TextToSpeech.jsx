import { useState, useEffect } from "react";  //load avaible voices
import React from 'react';

function TextToSpeech({ data, playAudio, displaySettings, changeSettings }) {
  //const [voice, setVoice] = useState(null);
  //const [pitch, setPitch] = useState(1);
  //const [rate, setRate] = useState(1);

  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
 
  //Load available voices
  useEffect(() => {
    const synth = window.speechSynthesis; //get speech synthesis 
    const loadVoices = () => {
      const availableVoices = synth.getVoices(); //fetch available voices
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0]?.name || null); //set default voice
    };

    //make sure voice is loaded 
    synth.onvoiceschanged = loadVoices; 
    loadVoices();
    
    //clean up
    return () => {
      synth.cancel();
    };
    
  }, []);

  //update utterant whenever text to be spoken changes 
  useEffect(() => {
    if (data) {
      const u = new SpeechSynthesisUtterance(data);
      setUtterance(u);
    }
  }, [data]);

  //play text when playeaudio is true 
  useEffect(() => {
    if (playAudio && utterance) {
      handlePlay();
    }
  }, [playAudio, utterance]);
  
  //funtion to play speech
  const handlePlay = () => {
    if (!utterance) return;

    const synth = window.speechSynthesis;
    if (isPaused) {
      synth.resume();
    } else {
      //set setting 
      utterance.voice = voices.find((v) => v.name === selectedVoice);
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }
    setIsPaused(false);
  };

  //function too pause
  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  //function to stop speech
  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPaused(false);
  };

  //function to handle voice selecttion changes 
  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  //maybe needed, if false 
  if (!displaySettings) return null;

//
return (
  <div
    style={{
      position: "fixed",
      top: "20%",
      right: "10px",
      backgroundColor: "white",
      padding: "15px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
      borderRadius: "10px",
      width: "250px",
    }}
  >
    <h4>Text-to-Speech Settings</h4>

    {/*selecting voice dropdown*/}
    <label>Voice:</label>
    <select
      value={selectedVoice}
      onChange={handleVoiceChange}
      style={{ width: "100%", marginBottom: "10px" }}
    >
      {voices.map((voice) => (
        <option key={voice.name} value={voice.name}>
          {voice.name}
        </option>
      ))}
    </select>

    {/*pitch control */}
    <label>Pitch:</label>
    <input
      type="range"
      min="0.5"
      max="2"
      step="0.1"
      value={pitch}
      onChange={(e) => setPitch(parseFloat(e.target.value))}
      style={{ width: "100%", marginBottom: "10px" }}
    />

    {/*rate control */}
    <label>Rate:</label>
    <input
      type="range"
      min="0.5"
      max="2"
      step="0.1"
      value={rate}
      onChange={(e) => setRate(parseFloat(e.target.value))}
      style={{ width: "100%", marginBottom: "10px" }}
    />

    {/*volume control */}
    <label>Volume:</label>
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      value={volume}
      onChange={(e) => setVolume(parseFloat(e.target.value))}
      style={{ width: "100%", marginBottom: "10px" }}
    />

    {/*playback controls */}
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
      <button onClick={handlePlay} style={{ backgroundColor: "green", color: "white", padding: "5px" }}>
        Play
      </button>
      <button onClick={handlePause} style={{ backgroundColor: "orange", color: "white", padding: "5px" }}>
        Pause
      </button>
      <button onClick={handleStop} style={{ backgroundColor: "red", color: "white", padding: "5px" }}>
        Stop
      </button>
    </div>

    {/*close button */}
    <button
      onClick={() => changeSettings(false)}
      style={{
        backgroundColor: "grey",
        color: "white",
        borderRadius: "5px",
        width: "100%",
        padding: "5px",
        marginTop: "10px",
      }}
    >
      Close
    </button>
  </div>
);

/*
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
  );*/
}

export default TextToSpeech;
