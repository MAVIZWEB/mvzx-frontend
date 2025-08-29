import React, { useState } from 'react';
import API from '../services/api';
export default function Withdraw(){
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);
  async function withdrawUSDT(){
    const userId = 1;
    await API.post('/withdraw/usdt', { userId, toAddress: to, amount });
    alert('Withdrawal requested');
  }
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-lg font-bold">Withdraw USDT</h2>
      <input value={to} onChange={e=>setTo(e.target.value)} placeholder="BEP20 address" className="w-full p-2 border my-2" />
      <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} placeholder="amount" className="w-full p-2 border my-2" />
      <button onClick={withdrawUSDT} className="w-full p-2 bg-orange-600 text-white">Withdraw</button>
    </div>
  )
}
