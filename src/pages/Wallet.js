import React, { useState, useEffect } from 'react';
import { wallet } from '../api';

export default function Wallet() {
  const [pin, setPin] = useState('');
  const [address, setAddress] = useState(null);
  const [msg, setMsg] = useState('');

  async function create(e) {
    e.preventDefault();
    if (!/^[0-9]{4}$/.test(pin)) return setMsg('PIN must be 4 digits');
    const res = await wallet.create(pin);
    if (res.error) setMsg(res.error);
    else setAddress(res.address);
  }

  useEffect(() => {
    (async () => {
      const r = await wallet.me();
      if (!r.error && r.address) setAddress(r.address);
    })();
  }, []);

  return (
    <div className="card">
      <h2>Wallet</h2>
      {address ? (
        <div>
          <div><strong>Address:</strong> {address}</div>
          <div>Use this address to receive MVZx tokens (internal mapping to BEP-20) in your account.</div>
        </div>
      ) : (
        <form onSubmit={create}>
          <label>Create 4-digit PIN (used to derive wallet address)</label>
          <input value={pin} onChange={e => setPin(e.target.value)} placeholder="1234" />
          <button type="submit">Create Wallet</button>
        </form>
      )}
      <div className="msg">{msg}</div>
    </div>
  );
}
