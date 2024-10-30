import axios from "axios";

const api = axios.create({
  baseURL: "https://rsvp-backend.ajayproject.com",
  withCredentials: true, // Needed for cookies
});

// Transform request data to URLSearchParams for POST requests
api.interceptors.request.use((config) => {
  if (config.method === "post" && config.data) {
    // Convert data to URLSearchParams if it isn't already
    if (!(config.data instanceof URLSearchParams)) {
      config.data = new URLSearchParams(config.data);
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject({
        success: false,
        error: error.response.data.code || "SERVER_ERROR",
        message: error.response.data.message || "Server error occurred",
      });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        success: false,
        error: "NETWORK_ERROR",
        message: "Network error occurred",
      });
    } else {
      // Something else happened
      return Promise.reject({
        success: false,
        error: "CLIENT_ERROR",
        message: error.message,
      });
    }
  }
);

export const useApi = () => {
  const handleApiCall = async (apiCall) => {
    try {
      const response = await apiCall();
      return { success: true, data: response };
    } catch (error) {
      // console.error("API Error:", error);
      return error;
    }
  };

  return {
    verifyAuth: () => handleApiCall(() => api.get("/verify")),

    login: (credentials) =>
      handleApiCall(() => api.post("/login", new URLSearchParams(credentials))),

    logout: () => handleApiCall(() => api.post("/logout")),

    // Add more API calls as needed
  };
};
