// src/services/api.ts
const API = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "";

let AUTH = "";
export function setAuth(token: string) { AUTH = token; localStorage.setItem("mvzx_jwt", token); }
export function loadAuth() { AUTH = localStorage.getItem("mvzx_jwt") || ""; }

async function jfetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(AUTH ? { Authorization: `Bearer ${AUTH}` } : {}),
      ...(init.headers || {}),
    },
    ...init,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || res.statusText || "Request failed");
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const api = {
  // Auth
  signup: (email: string, wallet: string) => jfetch("/auth/register", { method: "POST", body: JSON.stringify({ email, wallet }) }),
  login: (email: string, wallet: string) => jfetch("/auth/login", { method: "POST", body: JSON.stringify({ email, wallet }) }),

  // Wallet / matrix
  wallet: () => jfetch("/wallet/me"),
  matrixStatus: () => jfetch("/matrix/status/me"),

  // Game / leaderboard
  spin: () => jfetch("/game/spin", { method: "POST" }),
  leaderboard: () => jfetch("/public/leaderboard"),

  // Buy flow
  quote: (amount:number, currency:"USDT"|"NGN") => jfetch("/payments/quote", { method: "POST", body: JSON.stringify({ amount, currency }) }),
  createOrder: (params:any) => jfetch("/payments/create", { method: "POST", body: JSON.stringify(params) }),
  flwVerify: (txId:string) => jfetch(`/payments/flutterwave/verify/${txId}`, { method: "GET" }),
  manualDeposit: (payload:any) => jfetch("/payments/manual/submit", { method: "POST", body: JSON.stringify(payload) }),

  // Escrow
  listOffers: () => jfetch("/escrow/offers"),
  createOffer: (payload:any) => jfetch("/escrow/offers", { method: "POST", body: JSON.stringify(payload) }),
};
