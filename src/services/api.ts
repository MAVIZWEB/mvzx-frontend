 import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "https://your-backend-domain.com";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// -------------------- USER --------------------

// Signup user with email + 4-digit PIN
export const signup = async (email: string, pin: string) => {
  const res = await apiClient.post("/users/signup", { email, pin });
  return res.data;
};

// Login user with email + PIN
export const login = async (email: string, pin: string) => {
  const res = await apiClient.post("/users/login", { email, pin });
  return res.data;
};

// Get user balance and MVZx info
export const balance = async () => {
  const res = await apiClient.get("/users/balance");
  return res.data;
};

// -------------------- BUY MVZX --------------------

// Standard buy via wallet
export const buyMVZX = async (amount: number) => {
  const res = await apiClient.post("/purchase/buy", { amount });
  return res.data;
};

// Direct transfer buy (pending admin approval)
export const directTransferBuy = async (amount: number, txRef: string) => {
  const res = await apiClient.post("/purchase/direct", { amount, txRef });
  return res.data;
};

// -------------------- MINING --------------------

export const miningClaim = async () => {
  const res = await apiClient.post("/mining/claim");
  return res.data;
};

// -------------------- AIRDROP --------------------

export const airdropClaim = async () => {
  const res = await apiClient.post("/airdrop/claim");
  return res.data;
};

// -------------------- VOTING --------------------

export const getBallot = async () => {
  const res = await apiClient.get("/voting/ballot");
  return res.data;
};

export const castVote = async (choice: "UP" | "FLAT" | "DOWN") => {
  const res = await apiClient.post("/voting/cast", { choice });
  return res.data;
};

// -------------------- ESCROW / P2P --------------------

// List all active offers
export const listOffers = async () => {
  const res = await apiClient.get("/escrow/offers");
  return res.data;
};

// Create new offer
export const createOffer = async (offer: { type: "BUY"|"SELL"; price: number; min: number; max: number }) => {
  const res = await apiClient.post("/escrow/create", offer);
  return res.data;
};

// -------------------- ADMIN --------------------

// Admin login or signup via email + PIN
export const adminLogin = async (data: { email: string; pin: string }) => {
  const res = await apiClient.post("/admin/login", data);
  return res.data;
};

// Fetch admin dashboard info (pending approvals, stats)
export const adminDashboard = async () => {
  const res = await apiClient.get("/admin/dashboard");
  return res.data;
};

// Approve Direct Transfer Buy
export const approveDirectBuy = async (purchaseId: string) => {
  const res = await apiClient.post(`/admin/direct/approve/${purchaseId}`);
  return res.data;
};

// Reject Direct Transfer Buy
export const rejectDirectBuy = async (purchaseId: string) => {
  const res = await apiClient.post(`/admin/direct/reject/${purchaseId}`);
  return res.data;
};

export const api = {
  signup,
  login,
  balance,
  buyMVZX,
  directTransferBuy,
  miningClaim,
  airdropClaim,
  getBallot,
  castVote,
  listOffers,
  createOffer,
  adminLogin,
  adminDashboard,
  approveDirectBuy,
  rejectDirectBuy,
};
