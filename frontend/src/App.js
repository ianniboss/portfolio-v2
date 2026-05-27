import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./context/I18nContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
