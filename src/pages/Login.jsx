import React, { useState } from 'react';
import { api } from '../api';

export default function Login({ onLogin }) {
  const [email,setEmail] = useState('');
  const [pin,setPin] = useState('');
  const [msg,setMsg] = useState('');
  const submit = async ()=> {
    const res = await api.login(email, pin);
    if(res.token){ localStorage.setItem('token', res.token); onLogin && onLogin(res.token); }
    else setMsg(JSON.stringify(res));
  };
  return (
    <div className="container">
      <h3>Login</h3>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width:'100%', marginBottom:8 }} />
      <input placeholder="4-digit PIN" value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,''))} maxLength={4} style={{ width:120 }} />
      <div style={{ marginTop:12 }}>
        <button onClick={submit}>Login</button>
      </div>
      {msg && <div style={{ marginTop:12 }}>{msg}</div>}
    </div>
  );
}
