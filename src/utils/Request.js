import axios from "axios";
import { refreshToken } from "../lib/thunk/userThunk";
import { logout } from "../lib/slice/userSlice";

export const api = axios.create({
  baseURL: "https://dummyjson.com/auth/",
});
api.interceptors.request.use(
  async (config) => {
    const { store } = require("../lib/store");
    const { accessToken } = store.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { store } = require("../lib/store");
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = store.dispatch(refreshToken()).unwrap();
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
