import axios from "axios";

const API_BASE_URL = "https://subscription-tracker-api-xpd5.onrender.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach the JWT token to every outgoing request, if one exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the backend ever responds with 401 (expired/invalid token), log the user out
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;