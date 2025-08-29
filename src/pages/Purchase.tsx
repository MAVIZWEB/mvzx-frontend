 // frontend/src/pages/Purchase.tsx
import React, { useState } from "react";
import { purchase } from "../services/api";

export default function Purchase() {
  const [amount, setAmount] = useState<number>(2000);
  const [method, setMethod] = useState<"USDT"|"FLW"|"BANK">("FLW");
  const [message, setMessage] = useState<string | null>(null);

  async function doPurchase() {
    setMessage("Processing purchase...");
    try {
      const res = await purchase(amount, method);
      setMessage("Purchase success: " + JSON.stringify(res.data));
    } catch (e: any) {
      setMessage("Purchase failed: " + (e?.response?.data?.error || e.message));
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Buy MVZx</h2>
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="border p-2 w-full mb-3" />
      <select value={method} onChange={(e) => setMethod(e.target.value as any)} className="border p-2 w-full mb-3">
        <option value="FLW">Flutterwave (NGN)</option>
        <option value="USDT">USDT (BEP20)</option>
        <option value="BANK">Bank Deposit (Manual approval)</option>
      </select>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={doPurchase}>Buy</button>
      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
