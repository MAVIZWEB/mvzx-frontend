 import axios from "axios";

const API_BASE = "https://your-backend-domain.com"; // replace with your deployed backend URL

// ==================== USER SIGNUP ====================
export const signup = async (email: string, pin: string, confirmPin: string) => {
  return axios.post(`${API_BASE}/users/signup`, {
    email,
    pin,
    confirmPin,
  });
};

// ==================== USER LOGIN ====================
export const login = async (email: string, pin: string) => {
  return axios.post(`${API_BASE}/users/login`, { email, pin });
};

// ==================== GET USER PROFILE ====================
export const getProfile = async (token: string) => {
  return axios.get(`${API_BASE}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ==================== GET WALLET INFO ====================
export const getWallet = async (token: string) => {
  return axios.get(`${API_BASE}/users/wallet`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ==================== PURCHASE MVZx TOKENS ====================
export const purchaseTokens = async (
  token: string,
  amount: number,
  method: "flutterwave" | "usdt" | "manual",
  details?: any
) => {
  return axios.post(
    `${API_BASE}/users/purchase`,
    { amount, method, details },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// ==================== GET MATRIX INFO ====================
export const getMatrix = async (token: string) => {
  return axios.get(`${API_BASE}/users/matrix`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ==================== WITHDRAW TOKENS ====================
export const withdrawTokens = async (
  token: string,
  amount: number,
  method: "flutterwave" | "usdt" | "manual",
  details?: any
) => {
  return axios.post(
    `${API_BASE}/users/withdraw`,
    { amount, method, details },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// ==================== LOGOUT ====================
export const logout = () => {
  localStorage.removeItem("mvzx_token");
  localStorage.removeItem("mvzx_wallet");
};
