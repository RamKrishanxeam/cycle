import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGooglePopup } from "../../config/firebase";

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user.accessToken) {
        localStorage.setItem("user", user.accessToken);
        return user;
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logGoogleUser = createAsyncThunk(
  "logGoogleUser",
  async (data, thunkAPI) => {
    try {
      const response = await signInWithGooglePopup();
      const user = response.user;
      if (user.emailVerified) {
        localStorage.setItem("userGoogle", JSON.stringify(user));
        return user;
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
