// src/api.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://mvzx-backend.onrender.com/api";

// create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// AUTH
export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await api.post("/auth/login", userData);
  return res.data;
};

// ADMIN (added back to satisfy imports)
export const admin = {
  getAllUsers: async () => {
    const res = await api.get("/users");
    return res.data;
  },
  getUserById: async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },
  deleteUser: async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },
};

// USERS
export const getUserProfile = async (userId) => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};

export const updateWallet = async (userId, amount) => {
  const res = await api.post(`/users/${userId}/wallet`, { amount });
  return res.data;
};

// DEPOSITS
export const createDeposit = async (data) => {
  const res = await api.post("/deposits", data);
  return res.data;
};

export const getUserDeposits = async (userId) => {
  const res = await api.get(`/deposits/${userId}`);
  return res.data;
};

export default api;

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
