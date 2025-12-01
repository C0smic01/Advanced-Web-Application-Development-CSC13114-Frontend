import apiClient from "./apiClient";
import { tokenManager } from "./apiClient";

const emailApi = {
  getThreads: async () => {
    const response = await apiClient.get(
      "/emails/threads?category=primary&size=20"
    );
    return response.data;
  },
  getThreadById: async (id) => {
    if (id != "") {
      const response = await apiClient.get(`/emails/threads/${id}`);
      return response.data;
    }
    return null;
  },
  sendEmail: async (data) => {
    const response = await apiClient.post("/emails/messages/send", data);
    return response.data;
  },
  modifyEmail: async (data) => {
    const response = await apiClient.post("/emails/messages/modify", data);
    return response.data;
  },
};
export default emailApi;
