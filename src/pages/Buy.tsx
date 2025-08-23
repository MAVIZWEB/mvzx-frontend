// src/pages/Buy.tsx
import React, { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const MIN_USDT = 1.5;
const MIN_NGN = 2000;

function positionsFrom(amount:number, currency:"USDT"|"NGN"){
  const unit = currency==="USDT" ? MIN_USDT : MIN_NGN;
  return Math.floor(amount / unit);
}

export default function Buy(){
  const [method, setMethod] = useState<"USDT"|"FLW"|"MANUAL">("USDT");
  const [currency, setCurrency] = useState<"USDT"|"NGN">("USDT");
  const [amount, setAmount] = useState<number>(3);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string|null>(null);
  const [quote, setQuote] = useState<any>(null);

  const positions = useMemo(()=>positionsFrom(amount,currency),[amount,currency]);

  useEffect(()=>{ let ok=true; api.quote(amount,currency).then(q=>{ if(ok) setQuote(q) }).catch(()=>{}); return ()=>{ok=false}},[amount,currency]);

  const submit = async (e:React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setStatus(null);
    try {
      const res:any = await api.createOrder({ method, amount, currency });
      if (res?.redirectUrl) {
        window.location.href = res.redirectUrl;
        return;
      }
      setStatus(`✅ Order processed. ${positions} matrix position(s) assigned. (Simulation or pending confirmation)`);
    } catch (err:any) {
      setStatus(`❌ ${err.message}`);
    } finally { setLoading(false); }
  };

  const min = currency==="USDT"?MIN_USDT:MIN_NGN;

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">💰 MVZx Buy & Earn</h1>
        <p className="text-gray-600 mb-6">1 MVZX = 0.15 USDT ≈ ₦200. Minimum: 1.5 USDT / ₦2000. Only multiples create matrix positions.</p>

        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="block text-sm font-semibold">Payment Method</label>
            <select className="w-full border rounded-xl p-3 text-black bg-white" value={method} onChange={e=>setMethod(e.target.value as any)}>
              <option value="USDT">USDT (BEP-20)</option>
              <option value="FLW">Flutterwave (NGN)</option>
              <option value="MANUAL">Manual Bank Deposit</option>
            </select>

            <label className="block text-sm font-semibold">Currency</label>
            <select className="w-full border rounded-xl p-3 text-black bg-white" value={currency} onChange={e=>setCurrency(e.target.value as any)}>
              <option value="USDT">USDT</option>
              <option value="NGN">NGN</option>
            </select>

            <label className="block text-sm font-semibold">Amount ({currency}) — minimum {min}</label>
            <input className="w-full border rounded-xl p-3 text-black bg-white" type="number" min={min} step={currency==="USDT"?0.01:100} value={amount} onChange={e=>setAmount(Number(e.target.value))} required />

            <div className="p-3 bg-gray-50 rounded-xl text-sm">
              <div>Positions from this order: <b>{positions}</b></div>
              {quote && (<div>Token credit: <b>{quote.tokens} MVZx</b></div>)}
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-blue-50">
              <h3 className="font-semibold mb-2">Matrix Highlights</h3>
              <ul className="list-disc ml-5 text-sm">
                <li>2×2 binary matrix — 20 stages (auto progression).</li>
                <li>MC 15% per leg, JB 10% only Stage 1, NSP 35% per leg, CR company 20%, LP 10% (+10% from Stage≥2), CP 10%.</li>
                <li>No pegging; last stage 20 users do not auto-recycle (company may).</li>
              </ul>
            </div>

            <button disabled={loading} className={`w-full rounded-xl text-white py-3 ${loading?"bg-gray-400":"bg-green-600 hover:bg-green-700"}`}>
              {loading ? "Processing..." : "Proceed to Pay"}
            </button>

            {method === "MANUAL" && <div className="text-xs text-gray-600 mt-2">Bank: <b>UBA</b> — Name: <b>Masses</b> — Acct: <b>1026664654</b></div>}
          </div>
        </form>
        {status && <p className="mt-4">{status}</p>}
      </div>
    </div>
  );
}
