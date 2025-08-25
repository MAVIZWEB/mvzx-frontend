import axios from "axios";

const API_BASE = "https://your-backend-url.com"; // Replace with Render URL

export const signup = async (email: string, pin: string) => {
  return axios.post(`${API_BASE}/users/signup`, { email, pin });
};

export const login = async (email: string, pin: string) => {
  return axios.post(`${API_BASE}/users/login`, { email, pin });
};
