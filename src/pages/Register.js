import React, { useState } from 'react';
import { auth } from '../api';

export default function Register({ onDone }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function submit(e) {
    e.preventDefault();
    const res = await auth.register({ email, password });
    if (res.error) setMsg(res.error);
    else { setMsg('Registered. Please login.'); onDone && onDone(); }
  }

  return (
    <form onSubmit={submit} className="card">
      <h2>Register</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
      <button type="submit">Register</button>
      <div className="msg">{msg}</div>
    </form>
  );
}
