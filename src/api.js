import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mvzx-backend.onrender.com';

// === User Authentication ===

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Register error:', error.response?.data || error.message);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

// Get user profile (requires token)
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Profile error:', error.response?.data || error.message);
    throw error;
  }
};

// === Deposit Handling ===
export const createDeposit = async (depositData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/deposit`, depositData);
    return response.data;
  } catch (error) {
    console.error('Deposit error:', error.response?.data || error.message);
    throw error;
  }
};

// === Withdrawal Handling ===
export const createWithdrawal = async (withdrawalData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/withdrawal`, withdrawalData);
    return response.data;
  } catch (error) {
    console.error('Withdrawal error:', error.response?.data || error.message);
    throw error;
  }
};

// === Staking ===
export const createStake = async (stakeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/stake`, stakeData);
    return response.data;
  } catch (error) {
    console.error('Stake error:', error.response?.data || error.message);
    throw error;
  }
};

// === Referral ===
export const getReferralData = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/referrals/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Referral error:', error.response?.data || error.message);
    throw error;
  }
};

// === Transactions List ===
export const getTransactions = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/transactions/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Transactions error:', error.response?.data || error.message);
    throw error;
  }
};

// === Admin Controls ===
export const admin = {
  // Fetch all pending deposits
  getPendingDeposits: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/deposits/pending`);
      return response.data;
    } catch (error) {
      console.error('Admin pending deposits error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Approve a deposit manually
  approveDeposit: async (depositId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/admin/deposits/${depositId}/approve`);
      return response.data;
    } catch (error) {
      console.error('Approve deposit error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Reject a deposit
  rejectDeposit: async (depositId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/admin/deposits/${depositId}/reject`);
      return response.data;
    } catch (error) {
      console.error('Reject deposit error:', error.response?.data || error.message);
      throw error;
    }
  },
};
