// src/services/api.ts
const API_BASE = import.meta.env.VITE_API_BASE || "";

function headers(withAuth = true) {
  const h: Record<string,string> = { "Content-Type": "application/json" };
  if (withAuth) {
    const t = localStorage.getItem("mvzx_token");
    if (t) h["Authorization"] = `Bearer ${t}`;
  }
  return h;
}

async function req(path: string, opts: RequestInit = {}) {
  const url = `${API_BASE}${path}`;
  const r = await fetch(url, { credentials: "include", ...opts });
  if (!r.ok) {
    const txt = await r.text().catch(()=>"");
    try {
      const j = JSON.parse(txt);
      throw new Error(j?.error || j?.message || txt || r.statusText);
    } catch {
      throw new Error(txt || r.statusText);
    }
  }
  return r.json().catch(()=>null);
}

export function loadAuth() {
  const t = localStorage.getItem("mvzx_token");
  return !!t;
}
export function isAuthenticated() {
  return loadAuth();
}
export function setAuth(token: string) {
  localStorage.setItem("mvzx_token", token);
}
export function clearAuth() {
  localStorage.removeItem("mvzx_token");
}

/* AUTH */
export async function signup(email: string, pin: string, walletAddress?: string) {
  const body = { email, wallet: walletAddress || "" , pin };
  const data = await req("/auth/register", { method: "POST", body: JSON.stringify(body), headers: headers(false) });
  if (data?.token) setAuth(data.token);
  return data;
}
export async function login(email: string, pin: string, walletAddress?: string) {
  const body = { email, wallet: walletAddress || "", pin };
  const data = await req("/auth/login", { method: "POST", body: JSON.stringify(body), headers: headers(false) });
  if (data?.token) setAuth(data.token);
  return data;
}

/* PUBLIC */
export async function getLeaderboard() {
  return req("/public/leaderboard", { method: "GET", headers: headers(false) });
}

/* GAMES */
export async function spin(prizes: string[]) {
  // call backend: /games/spin returns { rewardLabel, amount } (or similar)
  try {
    const data = await req("/games/spin", { method: "POST", headers: headers(true) });
    // normalize: find index of rewardLabel in prizes
    const label = String(data?.rewardLabel ?? data?.reward ?? "");
    const idx = Math.max(0, prizes.indexOf(label));
    return { prizeIndex: idx >= 0 ? idx : Math.floor(Math.random()*prizes.length), rewardLabel: label, amount: Number(data?.amount ?? 0) };
  } catch (err) {
    // fallback to random if backend fails (demo mode)
    const idx = Math.floor(Math.random()*prizes.length);
    return { prizeIndex: idx, rewardLabel: prizes[idx], amount: 0 };
  }
}

/* WALLET / MATRIX */
export async function getWallet() {
  return req("/wallet/me", { method: "GET", headers: headers(true) });
}
export async function getMatrixStatus() {
  return req("/matrix/status/me", { method: "GET", headers: headers(true) });
}

/* PAYMENTS */
export async function getQuote(amount:number, currency:"USDT"|"NGN") {
  return req("/payments/quote", { method: "POST", body: JSON.stringify({ amount, currency }), headers: headers(true) });
}
export async function createOrder(payload:any) {
  return req("/payments/create", { method: "POST", body: JSON.stringify(payload), headers: headers(true) });
}
export async function submitManualDeposit(payload:any) {
  return req("/payments/manual/submit", { method: "POST", body: JSON.stringify(payload), headers: headers(true) });
}

export const api = {
  signup, login, loadAuth, isAuthenticated, setAuth, clearAuth,
  getLeaderboard, spin, getWallet, getMatrixStatus, getQuote, createOrder, submitManualDeposit
};
