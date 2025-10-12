// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://mvzx-backend.onrender.com",
  headers: { "Content-Type": "application/json" },
});

/* ============================
   AUTHENTICATION
============================ */
export const register = async (userData) => {
  const res = await api.post("/api/auth/register", userData); // ✅ fixed endpoint
  return res.data;
};

export const registerUser = register; // ✅ alias to fix build error

export const login = async (credentials) => {
  const res = await api.post("/api/auth/login", credentials); // ✅ fixed endpoint
  return res.data;
};

export const loginUser = login; // alias for compatibility

/* ============================
   WALLET
============================ */
export const createWallet = async (userId, pin) => {
  const res = await api.post("/api/wallet/create", { userId, pin });
  return res.data;
};

export const fetchWallet = async (userId) => {
  const res = await api.get(`/api/wallet/${userId}`);
  return res.data;
};

export const verifyPin = async (userId, pin) => {
  const res = await api.post("/api/wallet/verify", { userId, pin });
  return res.data;
};

/* ============================
   PAYMENTS / DEPOSITS
============================ */
export const initFlutterwavePayment = async (paymentData) => {
  const res = await api.post("/api/payments/flutterwave/init", paymentData);
  return res.data;
};

export const verifyFlutterwavePayment = async (transactionId) => {
  const res = await api.get(`/api/payments/flutterwave/verify/${transactionId}`);
  return res.data;
};

export const createManualDeposit = async (depositData) => {
  const res = await api.post("/api/payments/manual", depositData);
  return res.data;
};

export const createDeposit = createManualDeposit; // ✅ alias to avoid “not exported” errors

export const getPendingDeposits = async (adminId) => {
  const res = await api.get(`/api/payments/manual/pending/${adminId}`);
  return res.data;
};

export const approveDeposit = async (depositId) => {
  const res = await api.post(`/api/payments/manual/approve/${depositId}`);
  return res.data;
};

/* ============================
   TOKENS
============================ */
export const buyToken = async (data) => {
  const res = await api.post("/api/token/buy", data);
  return res.data;
};

export const sellToken = async (data) => {
  const res = await api.post("/api/token/sell", data);
  return res.data;
};

/* ============================
   STAKING
============================ */
export const stakeTokens = async (data) => {
  const res = await api.post("/api/stake", data);
  return res.data;
};

export const getStakes = async (userId) => {
  const res = await api.get(`/api/stake/${userId}`);
  return res.data;
};

/* ============================
   REFERRALS
============================ */
export const getReferralData = async (userId) => {
  const res = await api.get(`/api/referrals/${userId}`);
  return res.data;
};

/* ============================
   TRANSACTIONS
============================ */
export const getUserTransactions = async (userId) => {
  const res = await api.get(`/api/transactions/${userId}`);
  return res.data;
};

/* ============================
   ADMIN
============================ */
export const admin = {
  async getUsers() {
    const res = await api.get("/api/admin/users");
    return res.data;
  },
  async getTransactions() {
    const res = await api.get("/api/admin/transactions");
    return res.data;
  },
  async getStats() {
    const res = await api.get("/api/admin/stats");
    return res.data;
  },
  async approveDeposit(depositId) {
    const res = await api.post(`/api/admin/deposits/approve/${depositId}`);
    return res.data;
  },
};

/* ============================
   DEFAULT EXPORT
============================ */
export default api;
