 // frontend/src/pages/Purchase.tsx
import React, { useState } from "react";
import { purchaseBank, purchaseFlutterwaveInit, purchaseUSDT } from "../services/api";
import { getLocalUser } from "../services/api";

export default function Purchase() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"FLW" | "BANK" | "USDT">("FLW");
  const [message, setMessage] = useState<string | null>(null);

  async function handleBuy() {
    setMessage("Processing...");
    try {
      if (method === "FLW") {
        const res = await purchaseFlutterwaveInit(Number(amount));
        // Flutterwave returns redirect link in res.data (depends on backend)
        const href = res.data?.init?.data?.link || res.data?.data?.link || res.data?.link;
        setMessage("Flutterwave initialized. Opening payment link...");
        if (href) window.location.href = href;
        else setMessage("Unable to find FLW pay link. Check response in console.");
        console.log("FLW init response:", res.data);
      } else if (method === "BANK") {
        const res = await purchaseBank(Number(amount));
        setMessage("Bank deposit recorded. Pending admin approval.");
        console.log(res.data);
      } else if (method === "USDT") {
        const res = await purchaseUSDT(Number(amount));
        setMessage("USDT purchase processed.");
        console.log(res.data);
      }
    } catch (e: any) {
      setMessage("Purchase failed: " + (e?.response?.data?.error || e.message));
    }
  }

  const user = getLocalUser();

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Buy MVZx Tokens</h2>
      <p className="text-sm text-gray-600 mb-4">Logged in user: {user?.id ?? "not logged"}</p>

      <input className="border p-2 w-full mb-3" placeholder="Amount (NGN for FLW/BANK, USDT for USDT)" value={amount} onChange={(e)=>setAmount(e.target.value)} />
      <select className="border p-2 w-full mb-3" value={method} onChange={(e)=>setMethod(e.target.value as any)}>
        <option value="FLW">Flutterwave (NGN)</option>
        <option value="BANK">Bank deposit (NGN)</option>
        <option value="USDT">USDT (BEP20)</option>
      </select>

      <button className="bg-green-600 text-white px-4 py-2 rounded w-full" onClick={handleBuy}>Buy</button>
      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
