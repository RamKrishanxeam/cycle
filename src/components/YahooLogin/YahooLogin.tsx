import { Link, useNavigate } from "react-router-dom";
import yahoo from "../../assets/images/yahoo-login.svg";
import { auth,  yahooAuth } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { useEffect } from "react";
import { YahooLoginAuth } from "../../lib/thunk/userThunk";

const YahooLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => navigate("/"), 1000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);
  
   const handleYahooLogin = () => {
    dispatch(YahooLoginAuth());
    };
  return (
    <>
      <Link to="" onClick={handleYahooLogin}>
      <img src={yahoo} alt="yahoo" className="img-fluid" />
      </Link>
    </>
  );
};
export default YahooLogin;
