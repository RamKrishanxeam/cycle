import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGooglePopup } from "../../config/firebase";
import { login, refreshTokenAuth } from "../../config/userAPi";

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

export const authUser = createAsyncThunk(
  "auth/authUser",
  async (data, thunkAPI) => {
    try {
      const response = await login({
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 30,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log(refreshToken, "refreshToken");

      const response = await refreshTokenAuth(refreshToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
