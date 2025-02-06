import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "./authProvider";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

export const useAuthFunctions = () => {
  const navigate = useNavigate();
  const { setSuccessMessage, setErrorMessage } = useAuth();

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.accessToken) {
        localStorage.setItem("user", user.accessToken);
        setSuccessMessage("Login successful! Welcome to the Firefox Tribe! 🚀");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setErrorMessage("Invalid login. Please try again or register! 🚀");
      console.error(error.message);
    }
  };

  return { signIn };
};
