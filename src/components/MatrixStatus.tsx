 // src/components/MatrixStatus.tsx
import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function MatrixStatus(){
  const [data,setData]=useState<any|null>(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{ let ok=true; api.matrixStatus().then(d=>{ if(ok) setData(d)}).catch(()=>{}).finally(()=>ok && setLoading(false)); return ()=>{} },[]);
  if(loading) return <div className="p-4">Loading matrix status…</div>;
  if(!data) return <div className="p-4 text-red-600">No matrix data</div>;
  const legsPerStage = 2; // 2x2: per-stage legs to fill (for display)
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-3"><h3 className="text-lg font-bold">Matrix</h3><div className="text-sm text-gray-600">{data?.badge?.name}</div></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-2 border rounded"><div className="text-xs text-gray-500">Stage</div><div className="font-semibold">Stage {data.stage}</div></div>
        <div className="p-2 border rounded"><div className="text-xs text-gray-500">Position</div><div className="font-semibold">{data.position}</div></div>
      </div>
      <div className="mt-3">
        <div className="text-xs text-gray-500">Earnings (stage)</div>
        <div className="text-lg font-semibold">{Number(data.earnings||0).toFixed(2)} MVZx</div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2"><div className="bg-green-500 h-2 rounded-full" style={{width:"50%"}} /></div>
        <div className="text-xs text-gray-500 mt-2">Credit triggers when 2 legs filled. Auto-credit to wallet in USDT on second leg completion.</div>
      </div>
    </div>
  );
}
