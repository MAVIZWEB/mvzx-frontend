import { useState } from 'react';
import api from '../services/api';

export default function Home(){
  const [email,setEmail]=useState('');
  const [pin,setPin]=useState('');
  const [ref,setRef]=useState(new URLSearchParams(location.search).get('ref') || '');

  async function signup(){
    const { data } = await api.post('/auth/signup', { email, pin, ref });
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.user.id);
    alert(`Signup successful. AIRDROP: ${data.airdrop} MVZx`);
  }

  return (
    <div>
      <h2>Signup (AIRDROP 0.5 MVZx)</h2>
      <input placeholder='Email' onChange={e=>setEmail(e.target.value)} />
      <input placeholder='4-digit PIN' onChange={e=>setPin(e.target.value)} />
      <input placeholder='Referral code (optional)' value={ref} onChange={e=>setRef(e.target.value)} />
      <button onClick={signup}>Create Account</button>
    </div>
  );
}
