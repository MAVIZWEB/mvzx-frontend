 // frontend/src/pages/Stake.tsx
import React, { useState } from "react";
import { createStake, claimStake } from "../services/api";

export default function StakePage() {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [claimId, setClaimId] = useState<number | null>(null);

  async function doStake() {
    setMessage("Creating stake...");
    try {
      const res = await createStake(amount);
      setMessage("Stake created: " + JSON.stringify(res.data));
    } catch (e: any) {
      setMessage("Stake failed: " + (e?.response?.data?.error || e.message));
    }
  }

  async function doClaim() {
    if (!claimId) return setMessage("Provide stakeId to claim");
    try {
      const res = await claimStake(claimId);
      setMessage("Claim result: " + JSON.stringify(res.data));
    } catch (e: any) {
      setMessage("Claim failed: " + (e?.response?.data?.error || e.message));
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Special Stake (100% in 150 days)</h2>
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="border p-2 w-full mb-3" placeholder="Amount MVZx" />
      <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={doStake}>Stake</button>

      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2">Claim</h3>
        <input type="number" value={claimId || ""} onChange={(e) => setClaimId(Number(e.target.value))} className="border p-2 w-full mb-3" placeholder="Stake ID" />
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={doClaim}>Claim Stake</button>
      </div>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
