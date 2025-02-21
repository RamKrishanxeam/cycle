import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataDeletion from "./pages/DataDeletion";
import Signup from "./pages/Signup";
import MyAccount from "./pages/MyAccount";
import AddAddress from "./pages/AddAddress";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="account-show" element={<MyAccount />} />
        <Route path="add-address" element={<AddAddress />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="Bikes" element={<DataDeletion />} />
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
