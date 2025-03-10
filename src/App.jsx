import "./App.css";
//import { Routes, Route } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import Homepage from "./Homepage";
import { useState } from "react";


function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <>
      {showWelcome ? (
        <WelcomePage onStart={() => setShowWelcome(false)} />
      ) : (
        <Homepage />
      )}
    </>
  );
}

export default App;
