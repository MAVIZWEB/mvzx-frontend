const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

async function request(path, opts = {}) {
  const token = localStorage.getItem('mvzx_token');
  const headers = opts.headers || {};
  headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  return res.json();
}

export const auth = {
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) })
};

export const wallet = {
  create: (pin) => request('/wallet/create', { method: 'POST', body: JSON.stringify({ pin }) }),
  me: () => request('/wallet')
};

export const deposit = {
  bankManual: (payload) => request('/deposit/bank/manual', { method: 'POST', body: JSON.stringify(payload) }),
  flutterInit: (payload) => request('/deposit/flutterwave/init', { method: 'POST', body: JSON.stringify(payload) })
};

export const admin = {
  pending: () => request('/admin/deposits/pending'),
  approve: (id) => request(`/admin/deposits/${id}/approve`, { method: 'POST' }),
  reject: (id, reason) => request(`/admin/deposits/${id}/reject`, { method: 'POST', body: JSON.stringify({ reason }) })
};
