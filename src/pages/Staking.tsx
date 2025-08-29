 import React, { useState } from 'react';
import API from '../services/api';
export default function Staking(){
  const [amount, setAmount] = useState(0);
  async function start(){
    const token = localStorage.getItem('token');
    const userId = 1;
    await API.post('/staking/start', { userId, amount });
    alert('Staking started, will mature in 150 days');
  }
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-lg font-bold">Stake MVZx</h2>
      <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} className="w-full p-2 border my-2" />
      <button onClick={start} className="w-full p-2 bg-indigo-600 text-white">Start Staking</button>
    </div>
  )
}
