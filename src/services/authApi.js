import apiClient from "./apiClient";
import { tokenManager } from "./apiClient";
const authApi = {
  login: async (email, password) => {
    const response = await apiClient.post("/auth/login", { email, password });
    // Save tokens based on response structure: { code: 200, data: { access_token, refresh_token } }
    if (response.data.code === 200 && response.data.data) {
      tokenManager.token = response.data.data.access_token;
      localStorage.setItem("refresh_token", response.data.data.refresh_token);
    }
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

  setAccessToken: (token) => {
    accessToken = token;
  },

  getAccessToken: () => accessToken,
  logout: async (user_id) => {
    try {
      await apiClient.post("/auth/logout", { user_id });
    } finally {
      localStorage.removeItem("refresh_token");
      tokenManager.accessToken = null;
    }
  },
  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await apiClient.post("/auth/refresh", {
      refresh_token: refreshToken,
    });
    return response.data;
  },
};
export default authApi;
