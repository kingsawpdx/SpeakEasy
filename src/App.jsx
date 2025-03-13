import "./App.css";
import Homepage from "./Homepage";
import WelcomePage from "./WelcomePage";
import { Routes, Route } from "react-router-dom";
import CategoryPage from "./CategoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
    </Routes>
  );
}

export default App;

//<Routes>
//<Route path="/" element={<App />} />
//<Route path="/category/:categoryId" element={<CategoryPage />} />
//</Routes>