// src/lib/api.ts
const BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";

export type MatrixStatus = {
  userId: string;
  stage: number;
  position: number;
  expectedEarnings: number;
  earningsSoFar: number;
  earningsLeft: number;
};

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} - ${txt}`);
  }
  return res.json() as Promise<T>;
}

// ===== Matrix =====
export const getMatrixStatus = (userId: string) =>
  http<MatrixStatus>(`/matrix/status/${encodeURIComponent(userId)}`);

// ===== Wallet / Balances =====
export const getWalletBalance = (userId: string) =>
  http<{ userId: string; balance: number }>(`/wallet/balance/${encodeURIComponent(userId)}`);

export const transferUSDT = (payload: {
  fromAddress: string; toAddress: string; amountUSDT: number;
}) => http<{ txId: string }>("/wallet/transfer-usdt", {
  method: "POST",
  body: JSON.stringify(payload),
});

// ===== Buy (Card / Flutterwave init) =====
export const initCardPayment = (payload: {
  userId: string; amountNGN: number; email: string; phone: string;
}) => http<{ checkoutUrl: string; ref: string }>("/wallet/payments/flutterwave/init", {
  method: "POST",
  body: JSON.stringify(payload),
});

// ===== Manual Deposit =====
export const submitManualDeposit = (payload: {
  userId: string;
  walletAddress: string;
  amountNGN: number; // must be multiple of 2000
  receiptDate: string; // YYYY-MM-DD
  receiptTime: string; // HH:mm
  phone: string;
  note?: string;
}) => http<{ ticketId: string; status: "pending" }>("/wallet/manual-deposit", {
  method: "POST",
  body: JSON.stringify(payload),
});
