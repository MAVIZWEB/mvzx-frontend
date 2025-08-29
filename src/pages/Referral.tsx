import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Referral(){
  const [link,setLink]=useState('');
  useEffect(()=>{
    const code = localStorage.getItem('referralCode');
    setLink(`${location.origin}/?ref=${code || ''}`);
  },[]);
  return (
    <div>
      <h2>Referral</h2>
      <div>Your link: {link}</div>
    </div>
  );
}
