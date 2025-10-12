 // src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://mvzx-backend.onrender.com",
  headers: { "Content-Type": "application/json" },
});

//
// ================= AUTH =================
//
export const register = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};

// ✅ Aliases for backward compatibility
export const registerUser = register;
export const loginUser = login;

//
// ================= WALLET =================
//
export const fetchWallet = async (userId) => {
  const res = await api.get(`/wallet/${userId}`);
  return res.data;
};

export const createWallet = async (userId, pin) => {
  const res = await api.post("/wallet/create", { userId, pin });
  return res.data;
};

export const verifyPin = async (userId, pin) => {
  const res = await api.post("/wallet/verify", { userId, pin });
  return res.data;
};

//
// ================= DEPOSIT / PAYMENT =================
//
export const initFlutterwavePayment = async (paymentData) => {
  const res = await api.post("/payments/flutterwave/init", paymentData);
  return res.data;
};

export const verifyFlutterwavePayment = async (transactionId) => {
  const res = await api.get(`/payments/flutterwave/verify/${transactionId}`);
  return res.data;
};

// Manual deposit (bank transfer)
export const createManualDeposit = async (depositData) => {
  const res = await api.post("/payments/manual", depositData);
  return res.data;
};

// ✅ Alias for legacy imports
export const createDeposit = createManualDeposit;

export const getPendingDeposits = async (adminId) => {
  const res = await api.get(`/payments/manual/pending/${adminId}`);
  return res.data;
};

export const approveDeposit = async (depositId) => {
  const res = await api.post(`/payments/manual/approve/${depositId}`);
  return res.data;
};

//
// ================= TOKEN (BUY/SELL) =================
//
export const buyToken = async (data) => {
  const res = await api.post("/token/buy", data);
  return res.data;
};

export const sellToken = async (data) => {
  const res = await api.post("/token/sell", data);
  return res.data;
};

//
// ================= STAKING =================
//
export const stakeTokens = async (data) => {
  const res = await api.post("/stake", data);
  return res.data;
};

export const getStakes = async (userId) => {
  const res = await api.get(`/stake/${userId}`);
  return res.data;
};

//
// ================= REFERRALS =================
//
export const getReferralData = async (userId) => {
  const res = await api.get(`/referrals/${userId}`);
  return res.data;
};

//
// ================= TRANSACTIONS =================
//
export const getUserTransactions = async (userId) => {
  const res = await api.get(`/transactions/${userId}`);
  return res.data;
};

//
// ================= ADMIN =================
//
export const admin = {
  async getUsers() {
    const res = await api.get("/admin/users");
    return res.data;
  },
  async getTransactions() {
    const res = await api.get("/admin/transactions");
    return res.data;
  },
  async getStats() {
    const res = await api.get("/admin/stats");
    return res.data;
  },
  async approveDeposit(depositId) {
    const res = await api.post(`/admin/deposits/approve/${depositId}`);
    return res.data;
  },
};

//
// ================= DEFAULT EXPORT =================
//
export default api;
