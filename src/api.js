// src/api.js
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://mvzx-backend.onrender.com/api";

// ✅ Create axios instance ONCE
const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ AUTH
export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await api.post("/auth/login", userData);
  return res.data;
};

// ✅ ADMIN (added to fix missing import)
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

// ✅ USERS
export const getUserProfile = async (userId) => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};

export const updateWallet = async (userId, amount) => {
  const res = await api.post(`/users/${userId}/wallet`, { amount });
  return res.data;
};

// ✅ DEPOSITS
export const createDeposit = async (data) => {
  const res = await api.post("/deposits", data);
  return res.data;
};

export const getUserDeposits = async (userId) => {
  const res = await api.get(`/deposits/${userId}`);
  return res.data;
};

// ✅ Default export (only once)
export default api;
