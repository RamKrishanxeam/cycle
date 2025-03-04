import { createSlice } from "@reduxjs/toolkit";
import {
  FacebookLoginAuth,
  githubLoginAuth,
  logGoogleUser,
  loginUser,
  phoneNumberUser,
  SignUpUser,
  YahooLoginAuth,
} from "../thunk/userThunk";

interface AuthStateType {
  user: { email: string | null } | null;
  phoneNumber: string | null;
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: AuthStateType = {
  user: null,
  phoneNumber: null,
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
      state.errorMessage = "You have already signed up";
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
        "Account exists with Google. Please sign in with Google first";
    });
    // githubLoginAuth
    builder.addCase(githubLoginAuth.pending, (state, action) => {
      state.loading = true;
      state.errorMessage = null;
      state.successMessage = null;
      state.user = null;
    });
    builder.addCase(githubLoginAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload as { email: string };
      state.successMessage =
        "Github Login successful! Welcome to the Firefox Tribe! 🚀";
    });
    builder.addCase(githubLoginAuth.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage =
        "Account exists with Google. Please sign in with Google first";
      state.user = null;
    });

     // Yahoo Login Auth
     builder.addCase(YahooLoginAuth.pending, (state, action) => {
      state.loading = true;
      state.errorMessage = null;
      state.successMessage = null;
      state.user = null;
    });
    builder.addCase(YahooLoginAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload ?? null;
      state.successMessage =
        "Yahoo Login successful! Welcome to the Firefox Tribe! 🚀";
    });
    builder.addCase(YahooLoginAuth.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage =
        "Account exists with Google. Please sign in with Google first";
      state.user = null;
    });
    // send OTP
    builder.addCase(phoneNumberUser.pending, (state, action) => {
      state.loading = true;
      state.errorMessage = null;
      state.successMessage = null;
    });
    builder.addCase(phoneNumberUser.fulfilled, (state, action) => {
      state.loading = false;
      state.phoneNumber = action.payload.phoneNumber;
      state.successMessage =
        "send OTP successful! Welcome to the Firefox Tribe! 🚀";
    });
    builder.addCase(phoneNumberUser.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = "";
    });
  },
});

export const { logout } = userSlice.actions;
