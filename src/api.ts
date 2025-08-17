const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path: string, opts: RequestInit = {}) {
  const url = `${BASE}${path}`;
  const token = localStorage.getItem("maviz_token");
  const headers: Record<string,string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string,string> || {})
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(url, { ...opts, headers });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export async function signup(email: string, wallet: string, pin: string) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, wallet, pin })
  });
}

export async function login(email: string, pin: string) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, pin })
  });
}

export async function startMining() {
  return request("/mining/start", { method: "POST" });
}

export async function miningStatus() {
  return request("/mining/status");
}

export async function claimAirdrop() {
  return request("/airdrop/claim", { method: "POST" });
}

export async function createFlutterwavePayment(amount: number) {
  return request("/payment/flutterwave", {
    method: "POST",
    body: JSON.stringify({ amount })
  });
}
