 import axios from "axios";

const BASE_URL = "https://yourbackend.com"; // change to your deployed backend

// Signup with email and PIN
export const signup = (email: string, pin: string, confirmPin: string) =>
  axios.post(`${BASE_URL}/user/signup`, { email, pin, confirmPin });

// Login with email and PIN
export const login = (email: string, pin: string) =>
  axios.post(`${BASE_URL}/user/login`, { email, pin });

// Spin the game
export const spinGame = (token: string) =>
  axios.post(`${BASE_URL}/games/spin`, {}, { headers: { Authorization: `Bearer ${token}` } });

// Get user's token balance
export const getBalance = (token: string) =>
  axios.get(`${BASE_URL}/user/balance`, { headers: { Authorization: `Bearer ${token}` } });

// Purchase MVZx tokens via selected method
export const purchaseTokens = (token: string, amount: number, method: string) =>
  axios.post(
    `${BASE_URL}/user/purchase`,
    { amount, method },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// Get user's matrix positions and rewards
export const getMatrix = (token: string) =>
  axios.get(`${BASE_URL}/user/matrix`, { headers: { Authorization: `Bearer ${token}` } });

// Request withdrawal
export const requestWithdrawal = (token: string, amount: number, method: string) =>
  axios.post(
    `${BASE_URL}/user/withdraw`,
    { amount, method },
    { headers: { Authorization: `Bearer ${token}` } }
  );
