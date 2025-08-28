 import React, { useState } from 'react';
import { api } from '../api';

export default function Buy({ token }) {
  const [txHash,setTxHash] = useState('');
  const [ngn,setNgn] = useState('');
  const [ref,setRef] = useState('');
  const [evidence,setEvidence] = useState('');
  const [msg,setMsg] = useState('');

  const submitTx = async () => {
    if(!token) return setMsg('Login first');
    if(!txHash) return setMsg('Enter txHash');
    const res = await api.recordOnchainPurchase(token, txHash);
    setMsg(JSON.stringify(res));
  };
  const submitManual = async () => {
    if(!token) return setMsg('Login first');
    if(!ngn || !ref) return setMsg('Enter amount and reference');
    const res = await api.manualBankDeposit(token, Number(ngn), ref, evidence);
    setMsg(JSON.stringify(res));
  };

  return (
    <div className="container">
      <h3>Buy MVZX</h3>
      <section style={{ marginBottom:12 }}>
        <div>Option A — Record an on-chain USDT purchase (enter txHash)</div>
        <input placeholder="USDT txHash on BSC" value={txHash} onChange={e=>setTxHash(e.target.value)} style={{ width:'100%', marginTop:8 }} />
        <div style={{ marginTop:8 }}><button onClick={submitTx}>Record on-chain purchase</button></div>
      </section>

      <section>
        <div>Option B — Manual bank deposit (admin approval required)</div>
        <input placeholder="NGN amount (e.g. 2000)" value={ngn} onChange={e=>setNgn(e.target.value)} style={{ width:'100%', marginTop:8 }} />
        <input placeholder="Bank reference" value={ref} onChange={e=>setRef(e.target.value)} style={{ width:'100%', marginTop:8 }} />
        <input placeholder="Evidence URL (optional)" value={evidence} onChange={e=>setEvidence(e.target.value)} style={{ width:'100%', marginTop:8 }} />
        <div style={{ marginTop:8 }}><button onClick={submitManual}>Submit manual deposit</button></div>
      </section>

      {msg && <div style={{ marginTop:12 }}>{msg}</div>}
    </div>
  );
}
