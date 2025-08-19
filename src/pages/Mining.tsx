import React, { useEffect, useState } from "react";
import MatrixStatus from "../components/MatrixStatus";

export default function Mining() {
  const [userId] = useState<string>(() => localStorage.getItem("mvzx_user") || "demo-user");
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const b = parseFloat(localStorage.getItem("mvzx_balance") || "0");
    setBalance(isNaN(b) ? 0 : b);
  }, []);
  const save = (v:number) => {
    setBalance(v);
    localStorage.setItem("mvzx_balance", v.toString());
  };

  const mine = () => save(balance + 0.05); // small tap-to-mine payout
  const reset = () => save(0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Free Mining</h1>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="text-lg">Your MVZx Balance: <b>{balance.toFixed(3)}</b></div>
        <div className="mt-4 flex gap-3">
          <button onClick={mine} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">Tap to Mine +0.05</button>
          <button onClick={reset} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded">Reset (Test)</button>
        </div>
        <p className="text-xs text-gray-500 mt-3">Mining and Spin share the same local balance for now; backend wallet will replace this later.</p>
      </div>

      <MatrixStatus userId={userId} />
    </div>
  );
}
