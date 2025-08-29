 import { useEffect, useState } from 'react';
import api from '../services/api';

export default function MatrixStage(){
  const [rows, setRows] = useState<any[]>([]);
  const userId = Number(localStorage.getItem('userId'));
  useEffect(()=>{ api.get(`/matrix/${userId}`).then(r=>setRows(r.data.matrix)); },[userId]);
  return (
    <div>
      <h3>Matrix</h3>
      {rows.map(r=> (
        <div key={r.id}>Stage {r.stage} — Legs: {r.legsFilled} — Credited: {r.creditedNGN} — Pending: {r.pendingNGN} — {r.completed? 'Completed':'In progress'}</div>
      ))}
    </div>
  );
}
