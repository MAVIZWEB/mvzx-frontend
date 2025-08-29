 import { useState } from 'react';
import api from '../services/api';

export default function WithdrawForm(){
  const [amountMVZX, setAmount] = useState(0);
  const [method, setMethod] = useState<'BANK'|'USDT'>('BANK');
  const [bankName,setBankName]=useState('');
  const [bankAccount,setBankAccount]=useState('');
  const [usdtAddress,setUsdtAddress]=useState('');

  async function submit(){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const { data } = await api.post('/withdrawal/request', { method, amountMVZX, bankName, bankAccount, usdtAddress }, { headers });
    alert(`Withdrawal submitted. Status: ${data.status}`);
  }

  return (
    <div>
      <input type='number' placeholder='Amount (MVZX)' onChange={e=>setAmount(Number(e.target.value))} />
      <select onChange={e=>setMethod(e.target.value as any)}>
        <option value='BANK'>Bank</option>
        <option value='USDT'>USDT</option>
      </select>
      {method==='BANK' && (
        <div>
          <input placeholder='Bank Name' onChange={e=>setBankName(e.target.value)} />
          <input placeholder='Account Number' onChange={e=>setBankAccount(e.target.value)} />
        </div>
      )}
      {method==='USDT' && (
        <input placeholder='USDT (BEP20) Address' onChange={e=>setUsdtAddress(e.target.value)} />
      )}
      <button onClick={submit}>Request Withdrawal</button>
    </div>
  );
}
