import { Link, useNavigate } from "react-router-dom";
import github from "../../assets/images/github.svg";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, GithubAuth } from "../../config/firebase";
import { useEffect } from "react";
import { githubLoginAuth } from "../../lib/thunk/userThunk";

export const GithubLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  console.log(user, "user");

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => navigate("/"), 1000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleGithubLogin = () => {
    dispatch(githubLoginAuth());
  };

  return (
    <Link to="" onClick={handleGithubLogin}>
      <img src={github} alt="githubgithub" className="img-fluid" />
    </Link>
  );
};
