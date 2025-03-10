import "./App.css";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import Homepage from "./Homepage";
import CategoryPage from "./CategoryPage";
//import { useState } from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";




function App() {
  return (
    <Routes>
      <Route path="*" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
    </Routes>
  );
}
/*
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
}*/

export default App;
