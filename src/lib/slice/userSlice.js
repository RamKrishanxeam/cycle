import { createSlice } from "@reduxjs/toolkit";
import { logGoogleUser, loginUser } from "../thunk/userThunk";

const initialState = {
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
      localStorage.removeItem("userGoogle");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
      state.errorMessage = null;
      state.successMessage = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.successMessage =
        "Login successful! Welcome to the Firefox Tribe! 🚀";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = "Invalid login. Please try again or register! 🚀";
    });

    // google login
    builder.addCase(logGoogleUser.pending, (state, action) => {
      state.loading = true;
      state.errorMessage = null;
      state.successMessage = null;
    });
    builder.addCase(logGoogleUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.successMessage =
        "Google Login successful! Welcome to the Firefox Tribe! 🚀";
    });
    builder.addCase(logGoogleUser.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage =
        "Invalid login. Please try again or Google Login! 🚀";
    });
  },
});

export const userAction = userSlice.actions;
