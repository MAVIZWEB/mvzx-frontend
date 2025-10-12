// frontend/src/api.js

import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://mvzx-backend.onrender.com";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ==============================
// AUTHENTICATION
// ==============================

// Register a new user
export const registerUser = async (formData) => {
  const response = await api.post("/auth/register", formData);
  return response.data;
};

// Login user
export const loginUser = async (formData) => {
  const response = await api.post("/auth/login", formData);
  return response.data;
};

// Fetch logged-in user profile
export const getUserProfile = async (token) => {
  const response = await api.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ==============================
// WALLET & PAYMENTS
// ==============================

// Fetch user wallet balance & transactions
export const fetchWallet = async (userId) => {
  const response = await api.get(`/wallet/${userId}`);
  return response.data;
};

// Initialize Flutterwave payment
export const initFlutterwavePayment = async (paymentData) => {
  const response = await api.post("/payments/flutterwave/init", paymentData);
  return response.data;
};

// Confirm payment status
export const verifyPayment = async (transactionId) => {
  const response = await api.get(`/payments/verify/${transactionId}`);
  return response.data;
};

// ==============================
// TOKEN PURCHASES / TRADING
// ==============================

// Buy tokens
export const buyToken = async (purchaseData) => {
  const response = await api.post("/token/buy", purchaseData);
  return response.data;
};

// Fetch token price info
export const getTokenPrice = async () => {
  const response = await api.get("/token/price");
  return response.data;
};

// ==============================
// REFERRALS & STAKING
// ==============================

// Fetch referral stats
export const getReferralData = async (userId) => {
  const response = await api.get(`/referrals/${userId}`);
  return response.data;
};

// Fetch staking rewards or stats
export const getStakingInfo = async (userId) => {
  const response = await api.get(`/staking/${userId}`);
  return response.data;
};

// ==============================
// EXPORTS
// ==============================
export {
  api,
};
