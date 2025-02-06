import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/images/google.svg";
import { logGoogleUser } from "../../lib/thunk/userThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const GoogleLogin = () => {
  // const { setSuccessMessage } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setTimeout(() => navigate("/"), 1000);
    }
  }, [user, navigate]);

  return (
    <Link to="" onClick={() => dispatch(logGoogleUser())}>
      <img src={google} alt="google" className="img-fluid" />
    </Link>
  );
};
