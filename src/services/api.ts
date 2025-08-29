 // frontend/src/services/api.ts
import axios from "axios";

const BASE = "https://mvzx-backend.onrender.com"; // ⬅️ your backend (baked in)

const apiClient = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

// attach token automatically if present
apiClient.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers = { ...cfg.headers, Authorization: `Bearer ${token}` };
  return cfg;
});

// ---- Auth ----
export const signup = (email: string | undefined, pin: string, ref?: string) =>
  apiClient.post("/auth/signup", { email, pin, ref });

export const login = (email: string | undefined, pin: string) =>
  apiClient.post("/auth/login", { email, pin });

// ---- Purchase ----
// Flutterwave initialize
export const purchaseFlutterwaveInit = (amountNGN: number) =>
  apiClient.post("/purchase/flw/init", { amountNGN });

// Flutterwave verify
export const purchaseFlutterwaveVerify = (txId: string) =>
  apiClient.post("/purchase/flw/verify", { txId });

// Bank deposit (create pending)
export const purchaseBank = (amountNGN: number) =>
  apiClient.post("/purchase/bank", { amountNGN });

// USDT purchase
export const purchaseUSDT = (amountUSDT: number) =>
  apiClient.post("/purchase/usdt", { amountUSDT });

// ---- Stake ----
export const stakeCreate = (amountMVZX: number) =>
  apiClient.post("/stake/create", { amountMVZX });

export const stakeClaim = (stakeId: number) =>
  apiClient.post("/stake/claim", { stakeId });

// ---- Withdraw ----
export const requestWithdrawal = (payload: {
  amountMVZX: number;
  method: "BANK" | "USDT";
  bankName?: string;
  bankAccount?: string;
  usdtAddress?: string;
}) => apiClient.post("/withdrawal/request", payload);

// ---- Matrix ----
export const getMatrix = (userId: number) => apiClient.get(`/matrix/${userId}`);

// ---- Helper: get current user info from storage (populated after signup/login) ----
export function getLocalUser() {
  const u = localStorage.getItem("mvzx_user");
  return u ? JSON.parse(u) : null;
}

export default apiClient;
