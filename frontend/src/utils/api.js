import axios from "axios";

// Base URL for the API
const BASE_URL = "http://10.0.2.2:5000/";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API calls
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

export default api;
