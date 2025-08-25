import React, { useState, useEffect } from "react";
import { purchaseTokens, getBalance } from "../api/user";

export const Purchase: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [method, setMethod] = useState<"flutterwave" | "usdt" | "bank">("flutterwave");

  const token = localStorage.getItem("mvzx_token");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!token) return;
      const res = await getBalance(token);
      setBalance(res.data.balance);
    };
    fetchBalance();
  }, [token]);

  const handlePurchase = async () => {
    if (!token) return alert("Login first!");
    try {
      await purchaseTokens(token, amount, method);
      alert("Purchase request submitted!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded">
      <h2 className="text-2xl mb-4">Purchase MVZx Tokens</h2>
      <p className="mb-2">Current Balance: {balance} MVZx</p>

      <input
        type="number"
        placeholder="Amount to buy"
        className="w-full mb-2 p-2 rounded"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />

      <select
        className="w-full mb-2 p-2 rounded"
        value={method}
        onChange={(e) => setMethod(e.target.value as any)}
      >
        <option value="flutterwave">Naira (Flutterwave)</option>
        <option value="usdt">USDT</option>
        <option value="bank">Bank Deposit</option>
      </select>

      <button
        onClick={handlePurchase}
        className="w-full p-2 bg-yellow-500 text-gray-900 font-bold rounded"
      >
        Buy Tokens
      </button>
    </div>
  );
};
