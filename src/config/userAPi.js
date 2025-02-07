import { api } from "../utils/Request";

export const login = (data) =>
  api.request({
    url: "login",
    method: "POST",
    data,
  });

export const refreshTokenAuth = (data) =>
  api.request({
    url: "refresh",
    method: "POST",
    data,
  });
