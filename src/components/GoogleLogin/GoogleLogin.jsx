import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/images/google.svg";
import { logGoogleUser } from "../../lib/thunk/userThunk";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../config/hooks";

export const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => navigate("/"), 1000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    dispatch(logGoogleUser());
  };

  return (
    <Link to="" onClick={handleGoogleLogin}>
      <img src={google} alt="google" className="img-fluid" />
    </Link>
  );
};
