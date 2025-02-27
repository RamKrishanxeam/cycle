import axios from "axios";
import { refreshToken } from "../lib/thunk/userThunk";
import { logout } from "../lib/slice/userSlice";

export const api = axios.create({
  baseURL: "https://dummyjson.com/auth/",
});
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { store } = require("../lib/store");

    let originRequest = error.config;
    if (error.response.status === 401 && !originRequest.retry) {
      originRequest.retry = true;
      const refreshTokenAuth = localStorage.getItem("refreshToken");
      if (refreshTokenAuth) {
        const newAccessToken = store.dispatch(refreshToken()).unwrap();
        console.log(newAccessToken, "newAccessToken");
        if (newAccessToken) {
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);
