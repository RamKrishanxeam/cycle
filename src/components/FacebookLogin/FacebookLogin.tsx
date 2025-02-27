import facebook from "../../assets/images/facebook.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { FacebookLoginAuth } from "../../lib/thunk/userThunk";
import { useEffect } from "react";

const FacebookLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setTimeout(() => navigate("/"), 1000);
    }
  }, [user, navigate]);
  return (
    <>
      <Link to="#" onClick={() => dispatch(FacebookLoginAuth())}>
        <img src={facebook} alt="facebook" className="img-fluid" />
      </Link>
    </>
  );
};
export default FacebookLogin;
