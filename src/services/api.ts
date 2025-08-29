 // frontend/src/services/api.ts
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "https://mvzx-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE + "/api",
  headers: { "Content-Type": "application/json" },
});

// attach token
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// auth helpers
export function signup(email?: string, pin?: string, ref?: string) {
  return api.post("/auth/signup", { email, pin, ref });
}
export function login(email?: string, pin?: string) {
  return api.post("/auth/login", { email, pin });
}

// stake
export function createStake(amount: number) {
  return api.post("/stake", { amount });
}
export function claimStake(stakeId: number) {
  return api.post("/stake/claim", { stakeId });
}

// purchase
export function purchase(amountNGN: number, method: "USDT"|"FLW"|"BANK", txHash?: string) {
  return api.post("/purchase", { amountNGN, method, txHash });
}

// user read
export function getProfile() {
  return api.get("/auth/me");
}

// admin (example)
export function adminApproveBank(purchaseId: number) {
  return api.post("/admin/approve-bank", { purchaseId });
}
export function adminPayMatrix(matrixId: number) {
  return api.post("/admin/pay-matrix-lumpsum", { matrixId });
}

export default api;
