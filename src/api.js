import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://mvzx-backend.onrender.com/api",
});

// ===================== AUTH =====================

// Register new user
export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

// Login existing user
export const loginUser = async (userData) => {
  const res = await api.post("/auth/login", userData);
  return res.data;
};

// ===================== DEPOSITS =====================

// Create a new deposit
export const createDeposit = async (depositData) => {
  const res = await api.post("/deposits", depositData);
  return res.data;
};

// Get all deposits by user ID
export const getUserDeposits = async (userId) => {
  const res = await api.get(`/deposits/${userId}`);
  return res.data;
};

// ===================== WALLET =====================

// Get wallet balance by user ID
export const getWalletBalance = async (userId) => {
  const res = await api.get(`/users/${userId}/wallet`);
  return res.data;
};

// Update wallet balance (admin or system use)
export const updateWalletBalance = async (userId, amount) => {
  const res = await api.put(`/users/${userId}/wallet`, { amount });
  return res.data;
};

// ===================== ADMIN =====================

// Fetch all users (admin use)
export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export default api;
