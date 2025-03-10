import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';

import CategoryPage from './CategoryPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import WelcomePage from './WelcomePage';
import Homepage from "./Homepage.jsx"; 


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/home" element={<Homepage />} /> 
    </Routes>
  </BrowserRouter>
);
