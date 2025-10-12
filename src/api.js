// src/api.js
import axios from "axios";

// Use environment variable for backend base URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ------------------ AUTH ------------------
export const registerUser = async (data) => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

// ------------------ DASHBOARD / USER ------------------
export const getUserProfile = async (token) => {
  const res = await api.get("/api/user/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ------------------ STAKING ------------------
export const stakeTokens = async (data, token) => {
  const res = await api.post("/api/staking/stake", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ------------------ REFERRALS ------------------
export const getReferrals = async (token) => {
  const res = await api.get("/api/referrals", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ------------------ ADMIN ------------------
export const admin = {
  getAllUsers: async (token) => {
    const res = await api.get("/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  getAllTransactions: async (token) => {
    const res = await api.get("/api/admin/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export default api;
