// Lightweight API client with auth token + JSON helpers
const BASE = import.meta.env.VITE_API_BASE || "";

export function setAuth(token: string) {
  localStorage.setItem("mvzx_token", token);
}
export function getAuth(): string | null {
  return localStorage.getItem("mvzx_token");
}

async function req(path: string, opts: RequestInit = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string> | undefined),
  };
  const token = getAuth();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...opts, headers });
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const j = await res.json();
      if (j?.error) msg = j.error;
    } catch {}
    throw new Error(msg);
  }
  // some endpoints may return 204
  try { return await res.json(); } catch { return null; }
}

export const api = {
  // auth
  signup: (email: string, pin: string) =>
    req("/auth/signup", { method: "POST", body: JSON.stringify({ email, pin }) }),
  login: (email: string, pin: string) =>
    req("/auth/login", { method: "POST", body: JSON.stringify({ email, pin }) }),

  // user / balance / matrix
  summary: () => req("/user/summary"),
  matrixStatus: () => req("/matrix/status"),
  balance: () => req("/wallet/balance"),
  leaderboard: () => req("/game/leaderboard"),

  // purchases
  quote: (amount: number, currency: "USDT" | "NGN") =>
    req("/purchase/quote", { method: "POST", body: JSON.stringify({ amount, currency }) }),
  createOrder: (payload: {
    method: "USDT" | "FLW" | "MANUAL";
    amount: number;
    currency: "USDT" | "NGN";
  }) => req("/purchase", { method: "POST", body: JSON.stringify(payload) }),
  manualDeposit: (payload: {
    payerName: string;
    receiptDate: string;
    receiptTime: string;
    phone: string;
    amount: number;
    currency: "NGN";
  }) => req("/purchase/manual", { method: "POST", body: JSON.stringify(payload) }),

  // airdrop
  airdropClaim: () => req("/airdrop/claim", { method: "POST" }),

  // mining
  miningClaim: () => req("/mining/claim", { method: "POST" }),

  // escrow
  listOffers: () => req("/escrow/offers"),
  createOffer: (payload: { type: "BUY" | "SELL"; price: number; min: number; max: number }) =>
    req("/escrow/offers", { method: "POST", body: JSON.stringify(payload) }),

  // voting
  getBallot: () => req("/voting/current"),
  castVote: (choice: "UP" | "FLAT" | "DOWN") =>
    req("/voting/vote", { method: "POST", body: JSON.stringify({ choice }) }),

  // game
  spin: () => req("/game/spin", { method: "POST" }),
};
