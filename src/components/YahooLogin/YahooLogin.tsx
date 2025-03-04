import { Link } from "react-router-dom";
import { auth, signInWithGooglePopup, yahooAuth } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";

const YahooLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, yahooAuth);
      const user = result.user;
      console.log("Yahoo User Info:", user);
    } catch (error: any) {
      console.error("Error during Yahoo login:", error.message);
    }
  };
  return (
    <>
      <Link to="" onClick={handleGoogleLogin}>
        YahooLogin
      </Link>
    </>
  );
};
export default YahooLogin;
