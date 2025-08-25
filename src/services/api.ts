 import axios from "axios";

const API_URL = "https://your-backend-url.onrender.com"; // Replace with your deployed backend

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Example: Signup
export const signupUser = (data: { name: string; email: string; password: string }) =>
  api.post("/users/signup", data);

// Example: Spin wheel
export const spinGame = (userId: string) =>
  api.post("/games/spin", { userId });

export default api;
