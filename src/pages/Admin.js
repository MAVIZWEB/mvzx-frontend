import React, { useEffect, useState } from 'react';
import { admin } from '../api';

export default function Admin(){
  const [items,setItems] = useState([]);
  const [msg,setMsg] = useState('');

  useEffect(()=>{(async()=>{const r = await admin.pending(); if(!r.error) setItems(r);})();},[]);

  async function approve(id){
    await admin.approve(id);
    setMsg('Approved');
    setItems(items.filter(i=>i.id!==id));
  }
  async function reject(id){
    const reason = prompt('Reason for rejection');
    if(!reason) return;
    await admin.reject(id, reason);
    setMsg('Rejected');
    setItems(items.filter(i=>i.id!==id));
  }

  return (
    <div className="card">
      <h2>Admin - Pending Deposits</h2>
      {items.length===0 ? <div>No pending items</div> : items.map(i=> (
        <div key={i.id} className="item">
          <div><strong>{i.method}</strong> {i.amount} {i.currency}</div>
          <div>Ref: {i.ref}</div>
          <button onClick={()=>approve(i.id)}>Approve</button>
          <button onClick={()=>reject(i.id)}>Reject</button>
        </div>
      ))}
      <div className="msg">{msg}</div>
    </div>
  );
}
