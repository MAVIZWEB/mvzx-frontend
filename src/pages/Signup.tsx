import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const nav = useNavigate();
  async function submit(e: any){
    e.preventDefault();
    const r = await API.post('/auth/signup', { email, pin });
    localStorage.setItem('token', r.data.token);
    nav('/dashboard');
  }
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <form onSubmit={submit} className="space-y-4">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="w-full p-2 border" />
        <input value={pin} onChange={e=>setPin(e.target.value)} placeholder="4-digit PIN" className="w-full p-2 border" />
        <button className="w-full p-2 bg-blue-600 text-white">Signup</button>
      </form>
    </div>
  )
}
