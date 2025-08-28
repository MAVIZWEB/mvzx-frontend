import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function Matrix({ token }) {
  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(false);

  const load = async () => {
    if(!token) return;
    setLoading(true);
    const res = await api.myMatrix(token);
    setData(res);
    setLoading(false);
  };

  useEffect(()=> { load(); }, [token]);

  if(!token) return <div className="container">Login to see matrix</div>;

  return (
    <div className="container">
      <h3>Matrix & Rewards</h3>
      {loading && <div>Loading...</div>}
      {data && data.positions && (
        <>
          <h4>Positions</h4>
          <table>
            <thead><tr><th>ID</th><th>Stage</th><th>Depth</th><th>Legs</th><th>Tranches</th><th>Status</th></tr></thead>
            <tbody>
              {data.positions.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.stage}</td>
                  <td>{p.depth}</td>
                  <td>{p.legsFilled}/62</td>
                  <td>{p.tranchesPaid}</td>
                  <td>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {data && data.rewards && (
        <>
          <h4 style={{ marginTop:12 }}>Rewards</h4>
          <table>
            <thead><tr><th>ID</th><th>Type</th><th>Stage</th><th>Amount (USDT)</th><th>When</th></tr></thead>
            <tbody>
              {data.rewards.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.type}</td>
                  <td>{r.stage}</td>
                  <td>{Number(r.amountUSDT).toFixed(6)}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
