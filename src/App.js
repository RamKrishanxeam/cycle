import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataDeletion from "./pages/DataDeletion";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="Bikes" element={<DataDeletion />} />
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
