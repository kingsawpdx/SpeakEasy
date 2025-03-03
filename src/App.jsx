import { useState, useEffect } from "react";
import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar"; // Ensure the correct path
import Login from "../Login/Login"; // Corrected path
import SignUp from "../SignUp/SignUp"; // Ensure correct import
import Home from "../Home/Home"; // Ensure correct import


function App() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/words")
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );

}

export default App;
