 import { useState } from 'react';
import api from '../services/api';

export default function PurchaseForm(){
  const [amountNGN, setAmountNGN] = useState(0);
  const [method, setMethod] = useState<'FLW'|'USDT'|'BANK'>('FLW');

  async function submit(){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    if(method==='FLW'){
      const { data } = await api.post('/purchase/flw/init', { amountNGN }, { headers });
      window.location.href = data.init?.data?.link || '#';
    }
    if(method==='BANK'){
      await api.post('/purchase/bank', { amountNGN }, { headers });
      alert('Bank deposit recorded. Pending admin approval.');
    }
  }

  return (
    <div>
      <input type='number' placeholder='Amount (NGN)' onChange={e=>setAmountNGN(Number(e.target.value))} />
      <select onChange={e=>setMethod(e.target.value as any)}>
        <option value='FLW'>Flutterwave</option>
        <option value='BANK'>Bank Deposit</option>
      </select>
      <button onClick={submit}>Pay</button>
    </div>
  );
}
