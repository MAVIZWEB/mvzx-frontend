 import { useEffect, useState } from 'react';
import api from '../services/api';
import MatrixStage from '../components/MatrixStage';

export default function Dashboard(){
  const [balance,setBalance]=useState(0);
  const userId = Number(localStorage.getItem('userId'));
  useEffect(()=>{ api.get(`/matrix/${userId}`).then(()=>{}); },[userId]);
  useEffect(()=>{ api.get('/health').then(()=>setBalance(Number(localStorage.getItem('cachedBal')||0))); },[]);
  return (
    <div>
      <h2>Dashboard</h2>
      <div>MVZx Balance (internal mirror): {balance}</div>
      <MatrixStage />
    </div>
  );
}
