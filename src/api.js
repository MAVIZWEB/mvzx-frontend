// src/api.js
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://mvzx-backend.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

// ✅ AUTH ENDPOINTS
export const register = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

// ✅ WALLET ENDPOINTS
export const fetchWallet = async (userId) => {
  const res = await api.get(`/wallet/${userId}`);
  return res.data;
};

// ✅ PAYMENT ENDPOINTS
export const initFlutterwavePayment = async (paymentData) => {
  const res = await api.post('/payments/flutterwave/init', paymentData);
  return res.data;
};

// ✅ TOKEN ENDPOINTS
export const buyToken = async (data) => {
  const res = await api.post('/token/buy', data);
  return res.data;
};

export const sellToken = async (data) => {
  const res = await api.post('/token/sell', data);
  return res.data;
};

// ✅ STAKING ENDPOINTS
export const stakeTokens = async (data) => {
  const res = await api.post('/stake', data);
  return res.data;
};

export const getStakes = async (userId) => {
  const res = await api.get(`/stake/${userId}`);
  return res.data;
};

// ✅ REFERRAL ENDPOINTS
export const getReferralData = async (userId) => {
  const res = await api.get(`/referrals/${userId}`);
  return res.data;
};

// ✅ ADMIN DASHBOARD ENDPOINT (Added to fix your build)
export const admin = {
  async getUsers() {
    const res = await api.get('/admin/users');
    return res.data;
  },
  async getTransactions() {
    const res = await api.get('/admin/transactions');
    return res.data;
  },
  async getStats() {
    const res = await api.get('/admin/stats');
    return res.data;
  },
};

// ✅ DEFAULT EXPORT (optional use)
export default api;
