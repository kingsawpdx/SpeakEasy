import "./App.css";
import Homepage from "./Homepage";
import { useState } from "react";
import TextToSpeech from "./Components/TextToSpeech";



function App() {
  const [displaySettings, setDisplaySettings] = useState(false);

  const changeSettings = () => {
    setDisplaySettings((prev) => !prev);
  };

  return (
    <div>
      <Homepage />
      <TextToSpeech 
        displaySettings={displaySettings} 
        changeSettings={changeSettings} 
      />
    </div>
  );
}
export default App;