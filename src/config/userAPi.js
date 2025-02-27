import { api } from "../utils/Request";

export const login = (data) => api.post("/login", data);
export const refreshTokenAuth = (data) => api.post("/refresh", data);
