 const API = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "https://your-backend.onrender.com";

let AUTH = "";
export function setAuth(token: string) { 
  AUTH = token; 
  localStorage.setItem("mvzx_jwt", token); 
}
export function loadAuth() { 
  AUTH = localStorage.getItem("mvzx_jwt") || ""; 
  return AUTH;
}
export function clearAuth() {
  AUTH = "";
  localStorage.removeItem("mvzx_jwt");
  localStorage.removeItem("mvzx_user");
  localStorage.removeItem("mvzx_wallet");
}
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("mvzx_jwt");
}

async function jfetch(path: string, init: RequestInit = {}) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(AUTH ? { Authorization: `Bearer ${AUTH}` } : {}),
    ...(init.headers || {}),
  };

  try {
    const res = await fetch(`${API}${path}`, {
      credentials: "include",
      headers,
      ...init,
    });
    
    if (res.status === 401) {
      clearAuth();
      window.location.href = "/";
      throw new Error("Session expired. Please login again.");
    }
    
    if (!res.ok) {
      const errorText = await res.text().catch(() => res.statusText);
      throw new Error(errorText || `Request failed with status ${res.status}`);
    }
    
    const contentType = res.headers.get("content-type") || "";
    return contentType.includes("application/json") ? res.json() : res.text();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export const api = {
  // Auth
  register: (email: string, wallet: string) => 
    jfetch("/auth/register", { method: "POST", body: JSON.stringify({ email, wallet }) }),
  
  login: (email: string, wallet: string) => 
    jfetch("/auth/login", { method: "POST", body: JSON.stringify({ email, wallet }) }),

  // User data
  getWallet: () => jfetch("/wallet/me"),
  getMatrixStatus: () => jfetch("/matrix/status/me"),
  getMatrixTree: () => jfetch("/matrix/tree"),

  // Payments
  getQuote: (amount: number, currency: "USDT" | "NGN") => 
    jfetch("/payments/quote", { method: "POST", body: JSON.stringify({ amount, currency }) }),
  
  createOrder: (method: string, amount: number, currency: string) => 
    jfetch("/payments/create", { method: "POST", body: JSON.stringify({ method, amount, currency }) }),

  submitManualDeposit: (data: any) => 
    jfetch("/payments/manual/submit", { method: "POST", body: JSON.stringify(data) }),

  // Game
  spin: () => jfetch("/game/spin", { method: "POST" }),
  getLeaderboard: () => jfetch("/public/leaderboard"),

  // Admin
  getDepositRequests: () => jfetch("/admin/deposits"),
  processDeposit: (id: string, action: "approve" | "reject") => 
    jfetch(`/admin/deposits/${id}`, { method: "POST", body: JSON.stringify({ action }) }),
};
