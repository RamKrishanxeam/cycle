import { createSlice } from "@reduxjs/toolkit";
import { authUser, logGoogleUser, loginUser } from "../thunk/userThunk";

const initialState = {
  user: null,
  loading: false,
  errorMessage: null,
  successMessage: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    // setCredentials: (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    //   state.refreshToken = action.payload.refreshToken;
    //   state.user = action.payload.user;
    // },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("userGoogle");
      state.user = null;
      state.successMessage = null;
      state.errorMessage = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(authUser.pending, (state, action) => {
      state.user = null;
      state.loading = true;
      state.errorMessage = null;
      state.successMessage = null;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.successMessage =
        "Login successful! Welcome to the Firefox Tribe! 🚀";
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    });
    builder.addCase(authUser.rejected, (state, action) => {
      state.user = null;
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

export const { logout } = userSlice.actions;
export default userSlice;
