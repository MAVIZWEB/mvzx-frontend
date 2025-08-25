import React, { useState, useEffect } from "react";
import { requestWithdrawal, getBalance } from "../api/user";

export const Withdraw: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [method, setMethod] = useState<"naira" | "usdt" | "bank">("naira");

  const token = localStorage.getItem("mvzx_token");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!token) return;
      const res = await getBalance(token);
      setBalance(res.data.balance);
    };
    fetchBalance();
  }, [token]);

  const handleWithdraw = async () => {
    if (!token) return alert("Login first!");
    if (amount > balance) return alert("Insufficient balance");
    try {
      await requestWithdrawal(token, amount, method);
      alert("Withdrawal request submitted!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded">
      <h2 className="text-2xl mb-4">Withdraw MVZx Tokens</h2>
      <p className="mb-2">Current Balance: {balance} MVZx</p>

      <input
        type="number"
        placeholder="Amount to withdraw"
        className="w-full mb-2 p-2 rounded"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />

      <select
        className="w-full mb-2 p-2 rounded"
        value={method}
        onChange={(e) => setMethod(e.target.value as any)}
      >
        <option value="naira">Naira (Flutterwave)</option>
        <option value="usdt">USDT</option>
        <option value="bank">Bank Transfer (Admin Approval)</option>
      </select>

      <button
        onClick={handleWithdraw}
        className="w-full p-2 bg-yellow-500 text-gray-900 font-bold rounded"
      >
        Withdraw
      </button>
    </div>
  );
};
