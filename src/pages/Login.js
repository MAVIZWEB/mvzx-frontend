import React, { useState } from 'react';
import { auth } from '../api';

export default function Login({ onDone }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function submit(e) {
    e.preventDefault();
    const res = await auth.login({ email, password });
    if (res.error) setMsg(res.error);
    else {
      localStorage.setItem('mvzx_token', res.token);
      localStorage.setItem('mvzx_user', JSON.stringify(res.user));
      onDone && onDone();
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
      <button type="submit">Login</button>
      <div className="msg">{msg}</div>
    </form>
  );
}
