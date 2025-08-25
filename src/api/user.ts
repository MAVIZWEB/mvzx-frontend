 import axios from "axios";

const BASE_URL = "https://yourbackend.com"; // replace with your deployed backend

// User signup
export const signup = (email: string, pin: string, confirmPin: string) =>
  axios.post(`${BASE_URL}/user/signup`, { email, pin, confirmPin });

// User login
export const login = (email: string, pin: string) =>
  axios.post(`${BASE_URL}/user/login`, { email, pin });

// Fetch token balance
export const getBalance = (token: string) =>
  axios.get(`${BASE_URL}/user/balance`, { headers: { Authorization: `Bearer ${token}` } });

// Spin game
export const spinGame = (token: string) =>
  axios.post(`${BASE_URL}/games/spin`, {}, { headers: { Authorization: `Bearer ${token}` } });

// Purchase tokens (Flutterwave, USDT, Bank)
export const purchaseTokens = (token: string, amount: number, method: string) =>
  axios.post(`${BASE_URL}/user/purchase`, { amount, method }, { headers: { Authorization: `Bearer ${token}` } });

// Withdraw request
export const requestWithdrawal = (token: string, amount: number, method: string) =>
  axios.post(`${BASE_URL}/user/withdraw`, { amount, method }, { headers: { Authorization: `Bearer ${token}` } });

// Matrix positions & rewards
export const getMatrix = (token: string) =>
  axios.get(`${BASE_URL}/user/matrix`, { headers: { Authorization: `Bearer ${token}` } });

// Voting
export const getBallot = () => axios.get(`${BASE_URL}/voting/ballot`);
export const castVote = (choice: "UP"|"FLAT"|"DOWN") =>
  axios.post(`${BASE_URL}/voting/vote`, { choice });

// Escrow P2P
export type Offer = { id: number; type: "BUY"|"SELL"; price: number; min: number; max: number };
export const listOffers = () => axios.get<Offer[]>(`${BASE_URL}/escrow/list`).then(res => res.data);
export const createOffer = (offer: Omit<Offer, "id">) => axios.post(`${BASE_URL}/escrow/create`, offer);

// Mining
export const miningClaim = () => axios.post(`${BASE_URL}/mining/claim`);

// Airdrop
export const airdropClaim = () => axios.post(`${BASE_URL}/airdrop/claim`);
