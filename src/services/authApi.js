import apiClient from "./apiClient";
import { tokenManager } from "./apiClient";
const authApi = {
  login: async (email, password) => {
    const response = await apiClient.post("/auth/login", { email, password });
    accessToken = response.data.accessToken;
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  },

  register: async (data) => {
    const response = await apiClient.post("/auth/register", {
      data,
    });
    return response.data;
  },
  loginGoogle: async () => {
    const response = await apiClient.get("/auth/google-redirect");
    return response.data;
  },
  getProfile: async () => {
    const response = await apiClient.get("/users/profile");
    return response.data;
  },

  logout: async () => {
    try {
      await apiClient.get("/user/logout");
    } finally {
      localStorage.removeItem("refreshToken");
      accessToken = null;
    }
  },

  setAccessToken: (token) => {
    accessToken = token;
  },

  getAccessToken: () => accessToken,
};
export default authApi;
