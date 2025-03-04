// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnwhHvPkMylZYZB3cafFM1S9ZCmUDMjPc",
  authDomain: "firebikes-e7f12.firebaseapp.com",
  databaseURL: "https://firebikes-e7f12-default-rtdb.firebaseio.com",
  projectId: "firebikes-e7f12",
  storageBucket: "firebikes-e7f12.firebasestorage.app",
  messagingSenderId: "452023733689",
  appId: "1:452023733689:web:138e3258ad99110a1aba68",
  measurementId: "G-3477E667Y9",
};
// select an account
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/drive.file");

provider.setCustomParameters({
  prompt: "select_account ",
});
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth();
const db = getFirestore(app);
const facebookAuth = new FacebookAuthProvider();
const GithubAuth = new GithubAuthProvider();
GithubAuth.addScope("repo");
GithubAuth.setCustomParameters({
  allow_signup: "false",
});
const yahooAuth = new OAuthProvider("yahoo.com"); 


const signInWithYahooPopup = () => signInWithPopup(auth, yahooAuth);
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export {
  app,
  auth,
  db,
  facebookAuth,
  GithubAuth,
  signInWithYahooPopup,
  signInWithGooglePopup,
};
