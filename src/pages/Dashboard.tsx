 import React, { useEffect, useState } from 'react';
import API from '../services/api';
export default function Dashboard(){
  const [wallet, setWallet] = useState<any>(null);
  useEffect(()=>{ (async ()=>{
    const token = localStorage.getItem('token');
    if (!token) return;
    // decode token to get uid or call /me endpoint in backend (not implemented above, quick fetch wallet)
  })() },[]);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p>Wallet & balances (MVZx & USDT) will display here</p>
    </div>
  )
}
