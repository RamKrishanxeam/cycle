import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataDeletion from "./pages/DataDeletion";
import Signup from "./pages/Signup";
import MyAccount from "./pages/MyAccount";
import AddAddress from "./pages/AddAddress";
import AddList from "./pages/AddList";
import EditAddress from "./pages/EditAddress";
import Cart from "./pages/Cart";
import PaymentSuccessful from "./pages/PaymentSuccessful";
import PaymentCencel from "./pages/PaymentCencel";
import GoogleDrive from "./pages/GoogleDrive";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="cart" element={<Cart />} />
        <Route path="google-drive" element={<GoogleDrive />} />
        <Route path="account-show" element={<MyAccount />} />
        <Route path="success" element={<PaymentSuccessful />} />
        <Route path="cancel" element={<PaymentCencel />} />
        <Route path="add-address" element={<AddAddress />} />
        <Route path="address-list" element={<AddList />} />
        <Route path="edit-address/:id" element={<EditAddress />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="Bikes" element={<DataDeletion />} />
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
