import { createSlice } from "@reduxjs/toolkit";
import {
  FacebookLoginAuth,
  logGoogleUser,
  loginUser,
  SignUpUser,
} from "../thunk/userThunk";

interface AuthStateType {
  user: { email: string | null } | null;
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: AuthStateType = {
  user: null,
  loading: false,
  errorMessage: null,
  successMessage: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("userGoogleAndFacebook");
      state.user = null;
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUser.pending, (state, action) => {
      state.user = null;
      state.loading = true;
      state.errorMessage = null;
      state.successMessage = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload ?? null;
      state.successMessage =
        "Login successful! Welcome to the Firefox Tribe! 🚀";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.errorMessage = "Invalid login. Please try again or register! 🚀";
    });

    // Sign Up
    builder.addCase(SignUpUser.pending, (state, action) => {
      state.user = null;
      state.loading = true;
      state.errorMessage = null;
      state.successMessage = null;
    });
    builder.addCase(SignUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload ?? null;

      state.successMessage =
        "Sign up successful! Welcome to the Firefox Tribe! 🚀";
    });
    builder.addCase(SignUpUser.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.errorMessage = "Email already exists! Please use a different email";
    });

    // google login
    builder.addCase(logGoogleUser.pending, (state, action) => {
      state.loading = true;
      state.errorMessage = null;
      state.successMessage = null;
    });
    builder.addCase(logGoogleUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload as { email: string };
      state.successMessage =
        "Google Login successful! Welcome to the Firefox Tribe! 🚀";
    });
    builder.addCase(logGoogleUser.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage =
        "Invalid login. Please try again or Google Login! 🚀";
    });

    // Facebook login
    builder.addCase(FacebookLoginAuth.pending, (state, action) => {
      state.loading = true;
      state.errorMessage = null;
      state.successMessage = null;
    });
    builder.addCase(FacebookLoginAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload ?? null;
      state.successMessage =
        "Facebook Login successful! Welcome to the Firefox Tribe! 🚀";
    });
    builder.addCase(FacebookLoginAuth.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage =
        "Invalid login. Please try again or Facebook Login! 🚀";
    });
  },
});

export const { logout } = userSlice.actions;
