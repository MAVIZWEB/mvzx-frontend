import React, { useState } from 'react';
import { api } from '../api';

export default function Signup({ onSignedIn }) {
  const [email,setEmail] = useState('');
  const [pin,setPin] = useState('');
  const [msg,setMsg] = useState('');
  const [loading,setLoading] = useState(false);

  const submit = async () => {
    if(!email || pin.length !== 4) { setMsg('Email and 4-digit PIN required'); return; }
    setLoading(true);
    try {
      const res = await api.signup(email, pin);
      if(res.token) {
        localStorage.setItem('token', res.token);
        setMsg(`Signed up. Wallet: ${res.user.walletAddress}. Airdrop: ${res.airdrop?.success ? 'SENT tx '+res.airdrop.tx : 'PENDING'}`);
        onSignedIn && onSignedIn(res.token);
      } else setMsg(JSON.stringify(res));
    } catch(e) { setMsg('Error: ' + e.message); }
    setLoading(false);
  };

  return (
    <div className="container">
      <h3>Signup</h3>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width:'100%', marginBottom:8 }} />
      <input placeholder="4-digit PIN" value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,''))} maxLength={4} style={{ width:120 }} />
      <div style={{ marginTop:12 }}>
        <button onClick={submit} disabled={loading}>{loading ? '...' : 'Sign up'}</button>
      </div>
      {msg && <div style={{ marginTop:12 }}>{msg}</div>}
      <p style={{ color:'#666', marginTop:12 }}>After signup an airdrop of 0.5 MVZX is attempted to your assigned wallet.</p>
    </div>
  );
}
