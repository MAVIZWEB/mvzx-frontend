 import { useState } from 'react';
import api from '../services/api';

export default function Stake(){
  const [amount,setAmount]=useState(0);
  async function doStake(){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    await api.post('/stake/create', { amountMVZX: amount }, { headers });
    alert('Staked. Matures in 150 days.');
  }
  return (
    <div>
      <h2>Special Staking — 100% in 150 days</h2>
      <input type='number' placeholder='Amount MVZX' onChange={e=>setAmount(Number(e.target.value))} />
      <button onClick={doStake}>Stake</button>
    </div>
  );
}
