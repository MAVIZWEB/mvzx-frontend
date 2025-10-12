const API_URL = "https://mvzx-backend.onrender.com";

// ===== AUTH =====
export async function registerUser(data) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

// ===== WALLET =====
export async function fetchWallet(token) {
  const res = await fetch(`${API_URL}/api/wallet`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load wallet");
  return res.json();
}

export async function createWallet(pin, token) {
  const res = await fetch(`${API_URL}/api/wallet/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pin }),
  });
  if (!res.ok) throw new Error("Failed to create wallet");
  return res.json();
}

// ===== DEPOSIT =====
export async function createDeposit(data, token) {
  const res = await fetch(`${API_URL}/api/deposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Deposit failed");
  return res.json();
}

export async function initFlutterwavePayment(amount, currency, email, token) {
  const res = await fetch(`${API_URL}/api/deposit/flutterwave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount, currency, email }),
  });
  if (!res.ok) throw new Error("Flutterwave payment failed");
  return res.json();
}
