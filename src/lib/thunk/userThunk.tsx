import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  User,
} from "firebase/auth";
import {
  auth,
  db,
  signInWithGooglePopup,
  facebookAuth,
  GithubAuth,
  signInWithYahooPopup,
} from "../../config/firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface ValuesType {
  FName: string;
  LName: string;
  PNumber: string;
  email: string;
  password: string;
  CPassword: string;
  CheckBox: boolean;
}

interface loginType {
  email: string;
  password: string;
}

interface PhoneNumberUserData {
  auth: any;
  appVerifier: any;
  phoneNumber: string;
}
export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }: loginType, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      if (idToken) {
        const idToken = await user.getIdToken();
        console.log(user, "user");
        localStorage.setItem("user", JSON.stringify({ ...user, idToken }));
        return { ...user, idToken };
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const SignUpUser = createAsyncThunk(
  "SignUpUser",
  async (values: ValuesType, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      if (user) {
        const userData = {
          uid: user.uid,
          FName: values.FName,
          LName: values.LName,
          PNumber: values.PNumber,
          email: values.email,
        };
        await setDoc(doc(db, "users", user.uid), userData, { merge: true });
        localStorage.setItem("user", JSON.stringify({ ...userData }));
        return { ...userData };
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logGoogleUser = createAsyncThunk(
  "logGoogleUser",
  async (data, thunkAPI) => {
    try {
      const response = await signInWithGooglePopup();
      const user = response.user;
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const accessToken = credential?.accessToken;
      const userDetails = Object.assign({}, user, { oAuth_token: accessToken });
      if (user.emailVerified) {
        localStorage.setItem(
          "userGoogleAndFacebook",
          JSON.stringify(userDetails)
        );
        return user;
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const FacebookLoginAuth = createAsyncThunk(
  "FacebookLoginAuth",
  async (data, thunkAPI) => {
    try {
      const result = await signInWithPopup(auth, facebookAuth);
      const user = result.user as User;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      if (user.uid) {
        localStorage.setItem("userGoogleAndFacebook", JSON.stringify(user));
        await (user as any).linkWithCredential(credential);
        return user;
      }
    } catch (error: any) {
      if (error.code === "auth/account-exists-with-different-credential") {
        console.log(
          "Account exists with Google. Please sign in with Google first.",
          error
        );
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const githubLoginAuth = createAsyncThunk(
  "githubLoginAuth",
  async (data, thunkAPI) => {
    try {
      const response = await signInWithPopup(auth, GithubAuth);
      console.log(response, "response");

      const user = response.user;
      const credential = GithubAuthProvider.credentialFromResult(response);
      const accessToken = credential?.accessToken;
      const userDetails = Object.assign({}, user, { oAuth_token: accessToken });
      console.log(userDetails, "userDetails");

      if (user) {
        localStorage.setItem(
          "userGoogleAndFacebook",
          JSON.stringify(userDetails)
        );
        return user;
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const YahooLoginAuth = createAsyncThunk(
  "YahooLoginAuth",
  async (data, thunkAPI) => {
    try {
      const response = await signInWithYahooPopup();
      const user = response.user;
      console.log(user, "user");
      const credential = OAuthProvider.credentialFromResult(response);
      const accessToken = credential?.accessToken;
      const userDetails = Object.assign({}, user, { oAuth_token: accessToken });
      console.log(userDetails, "userDetails");

      if (user) {
        localStorage.setItem(
          "userGoogleAndFacebook",
          JSON.stringify(userDetails)
        );
        return user;
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const phoneNumberUser = createAsyncThunk(
  "phoneNumberUser",
  async ({ auth, appVerifier, phoneNumber }: PhoneNumberUserData, thunkAPI) => {
    try {
      console.log("OTP function!");
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      console.log("OTP sent!");
      window.confirmationResult = confirmationResult;
      const userData = {
        confirmationResult,
        phoneNumber: phoneNumber || null,
      };
      console.log("OTP sent and user data:", userData);
      return userData;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const authUser = createAsyncThunk(
//   "auth/authUser",
//   async (data, thunkAPI) => {
//     try {
//       const response = await login({
//         username: "emilys",
//         password: "emilyspass",
//         expiresInMins: 30,
//       });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const refreshToken = createAsyncThunk(
//   "auth/refreshToken",
//   async (_, thunkAPI) => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       console.log(refreshToken, "refreshToken");

//       const response = await refreshTokenAuth(refreshToken);
//       localStorage.setItem("accessToken", response.data.accessToken);
//       return response.data.accessToken;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
