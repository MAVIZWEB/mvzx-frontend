const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:10000/api';
async function apiFetch(path, token=null, opts={}) {
  const headers = opts.headers || {};
  if(!(opts.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  if(token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers, body: opts.body && typeof opts.body === 'object' && !(opts.body instanceof FormData) ? JSON.stringify(opts.body) : opts.body });
  const text = await res.text();
  try { return JSON.parse(text); } catch(e){ return text; }
}
export const api = {
  signup: (email,pin) => apiFetch('/auth/signup', null, { method: 'POST', body: { email, pin } }),
  login: (email,pin) => apiFetch('/auth/login', null, { method: 'POST', body: { email, pin } }),
  recordOnchainPurchase: (token, txHash) => apiFetch('/purchase/usdt', token, { method: 'POST', body: { txHash } }),
  manualBankDeposit: (token, ngnAmount, ref, evidenceUrl) => apiFetch('/purchase/manual', token, { method: 'POST', body: { ngnAmount, ref, evidenceUrl } }),
  myMatrix: (token) => apiFetch('/matrix/me', token),
  myRewards: (token) => apiFetch('/rewards/me', token),
  withdraw: (token, payload) => apiFetch('/withdraw', token, { method: 'POST', body: payload }),
  retryAirdrops: (token) => apiFetch('/admin/retry-airdrops', token, { method: 'POST' })
};
