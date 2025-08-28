import React, { useState } from 'react';
import { api } from '../api';

export default function Withdraw({ token }) {
  const [currency,setCurrency] = useState('USDT');
  const [amount,setAmount] = useState('');
  const [method,setMethod] = useState('usdt');
  const [details,setDetails] = useState('{}');
  const [msg,setMsg] = useState('');

  const submit = async () => {
    if(!token) return setMsg('Login first');
    try {
      const d = JSON.parse(details);
      const res = await api.withdraw(token, { currency, amount: Number(amount), method, details: d });
      setMsg('Requested: ' + JSON.stringify(res));
    } catch (e) {
      setMsg('Error: ' + (e.message || e));
    }
  };

  return (
    <div className="container">
      <h3>Request Withdrawal</h3>
      <div style={{ marginBottom:8 }}>
        <label>Currency</label><br/>
        <select value={currency} onChange={e=>setCurrency(e.target.value)}><option>USDT</option><option>NGN</option></select>
      </div>
      <div style={{ marginBottom:8 }}>
        <label>Amount</label><br/>
        <input value={amount} onChange={e=>setAmount(e.target.value)} />
      </div>
      <div style={{ marginBottom:8 }}>
        <label>Method</label><br/>
        <select value={method} onChange={e=>setMethod(e.target.value)}><option value="usdt">USDT Wallet</option><option value="bank">Local Bank</option></select>
      </div>
      <div style={{ marginBottom:8 }}>
        <label>Details (JSON)</label><br/>
        <textarea rows={4} value={details} onChange={e=>setDetails(e.target.value)} />
      </div>
      <button onClick={submit}>Request Withdraw</button>
      {msg && <div style={{ marginTop:12 }}>{msg}</div>}
    </div>
  );
}
