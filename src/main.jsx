import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <App />
</React.StrictMode>
  /*<BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
    </Routes>
  </BrowserRouter>*/
);
