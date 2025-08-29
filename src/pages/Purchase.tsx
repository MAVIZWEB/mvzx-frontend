 import React, { useState } from "react";
import { purchase } from "../services/api";

export default function PurchasePage() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("USDT");
  const [message, setMessage] = useState("");

  async function handlePurchase() {
    const result = await purchase({
      userId: Number(userId),
      amountNGN: Number(amount),
      method,
    });
    if (result.error) setMessage("❌ " + result.error);
    else setMessage("✅ Purchase successful!");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Buy MVZx Tokens</h1>
      <input className="border p-2 mb-2 w-full" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <input className="border p-2 mb-2 w-full" placeholder="Amount NGN" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select className="border p-2 mb-2 w-full" value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="USDT">USDT</option>
        <option value="FLW">Flutterwave</option>
        <option value="BANK">Bank</option>
      </select>
      <button className="bg-green-600 text-white p-2 rounded w-full" onClick={handlePurchase}>Purchase</button>
      <p className="mt-2">{message}</p>
    </div>
  );
}
