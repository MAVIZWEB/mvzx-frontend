 import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
  timeout: 15000
});

export const signup = (data: { email: string; pin: string }) =>
  api.post('/signup', data);

export const login = (data: { email: string; pin: string }) =>
  api.post('/login', data);

export const purchaseMVZx = (data: { amountNGN: number; method: string }) =>
  api.post('/purchase', data);

export const withdrawEarnings = (data: { amount: number; type: 'BANK' | 'USDT' }) =>
  api.post('/withdraw', data);

export const getDashboard = () => api.get('/dashboard');
export const getMatrix = () => api.get('/matrix');
export const getStaking = () => api.get('/staking');

export default api;
