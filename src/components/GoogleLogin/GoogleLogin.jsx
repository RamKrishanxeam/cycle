import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGooglePopup } from "../../config/firebase";
import google from "../../assets/images/google.svg";
import { useAuth } from "../../config/authProvider";

export const GoogleLogin = () => {
  const { setSuccessMessage } = useAuth();

  const navigate = useNavigate();

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    if (response.user.emailVerified) {
      localStorage.setItem("userGoogle", JSON.stringify(response.user));
      setSuccessMessage(
        "Google Login successful! Welcome to the Firefox Tribe! 🚀"
      );
      setTimeout(() => navigate("/"), 2000);
    }
  };
  return (
    <Link to="" onClick={logGoogleUser}>
      <img src={google} alt="google" className="img-fluid" />
    </Link>
  );
};
