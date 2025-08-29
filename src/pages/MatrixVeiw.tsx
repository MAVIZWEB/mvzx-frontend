 import React, { useEffect, useState } from 'react';
import API from '../services/api';
export default function MatrixView(){
  const [stages, setStages] = useState<any[]>([]);
  useEffect(()=>{ (async ()=>{
    // get user id from token in production
    const userId = 1;
    const r = await API.get(`/matrix/me/${userId}`);
    setStages(r.data.stages);
  })() },[]);
  return (
    <div className="p-6">
      <h2 className="text-lg font-bold">My Matrix</h2>
      <div className="space-y-2 mt-4">
        {stages.map(s=> (
          <div key={s.id} className="p-3 border rounded">
            <div>Stage: {s.stage}</div>
            <div>Earnings: {s.earnings}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
