import "./App.css";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import Homepage from "./Homepage";
import CategoryPage from "./CategoryPage";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";


function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
