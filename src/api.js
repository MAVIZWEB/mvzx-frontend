import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mvzx-backend.onrender.com';

// === User Authentication ===

// Register new user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/api/users/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/api/users/login`, credentials);
  return response.data;
};

// Get user profile
export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// === Deposit Handling ===
export const createDeposit = async (depositData) => {
  const response = await axios.post(`${API_BASE_URL}/api/deposit`, depositData);
  return response.data;
};

// === Withdrawal Handling ===
export const createWithdrawal = async (withdrawalData) => {
  const response = await axios.post(`${API_BASE_URL}/api/withdrawal`, withdrawalData);
  return response.data;
};

// === Staking ===
export const createStake = async (stakeData) => {
  const response = await axios.post(`${API_BASE_URL}/api/stake`, stakeData);
  return response.data;
};

// === Referral ===
export const getReferralData = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/api/referrals/${userId}`);
  return response.data;
};

// === Transactions ===
export const getTransactions = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/api/transactions/${userId}`);
  return response.data;
};

// === Admin Controls ===
export const admin = {
  getPendingDeposits: async () => {
    const response = await axios.get(`${API_BASE_URL}/api/admin/deposits/pending`);
    return response.data;
  },
  approveDeposit: async (depositId) => {
    const response = await axios.put(`${API_BASE_URL}/api/admin/deposits/${depositId}/approve`);
    return response.data;
  },
  rejectDeposit: async (depositId) => {
    const response = await axios.put(`${API_BASE_URL}/api/admin/deposits/${depositId}/reject`);
    return response.data;
  },
};

// === Flutterwave Payment Integration ===
export const initFlutterwavePayment = async (paymentData) => {
  const response = await axios.post(`${API_BASE_URL}/api/payments/flutterwave/init`, paymentData);
  return response.data;
};

// === Bank Transfer Payments ===
export const initBankTransfer = async (transferData) => {
  const response = await axios.post(`${API_BASE_URL}/api/payments/bank/init`, transferData);
  return response.data;
};

// === USDT Payments ===
export const initUSDTTransfer = async (transferData) => {
  const response = await axios.post(`${API_BASE_URL}/api/payments/usdt/init`, transferData);
  return response.data;
};
