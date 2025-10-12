import React, { useState } from 'react';
import { deposit } from '../api';

export default function Deposit(){
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');

  async function bankManual(e){
    e.preventDefault();
    const res = await deposit.bankManual({ amount, currency: 'NGN' });
    if (res.error) setMsg(res.error);
    else setMsg('Deposit recorded as pending admin approval.');
  }

  async function flutter(e){
    e.preventDefault();
    const res = await deposit.flutterInit({ amount, currency: 'NGN', callback_url: window.location.href });
    if (res.error) setMsg(res.error || JSON.stringify(res));
    else setMsg('Flutterwave initialized - check response for payment link.');
  }

  return (
    <div className="card">
      <h2>Deposit</h2>
      <form onSubmit={bankManual}>
        <label>Bank Transfer - Manual</label>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" />
        <button type="submit">Record Bank Deposit (pending admin)</button>
      </form>

      <hr />

      <form onSubmit={flutter}>
        <label>Flutterwave (online)</label>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" />
        <button type="submit">Pay with Flutterwave</button>
      </form>

      <div className="msg">{msg}</div>
    </div>
  );
}
