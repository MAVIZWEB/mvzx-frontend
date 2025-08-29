 // frontend/src/pages/Stake.tsx
import React, { useState } from "react";
import { stakeCreate, stakeClaim, getLocalUser } from "../services/api";

export default function Stake() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [stakeId, setStakeId] = useState<number | "">("");

  async function handleStake() {
    setMessage("Creating stake...");
    try {
      const res = await stakeCreate(Number(amount));
      setMessage("Staked. Matures in 150 days.");
      setStakeId(res.data.id);
      // Note: backend returns stake object (id, startDate, endDate)
      console.log("stake create:", res.data);
    } catch (e: any) {
      setMessage("Stake failed: " + (e?.response?.data?.error || e.message));
    }
  }

  async function handleClaim() {
    if (!stakeId) return setMessage("Enter stake id to claim.");
    try {
      const res = await stakeClaim(Number(stakeId));
      setMessage("Stake claimed. Payout: " + res.data.payout);
    } catch (e: any) {
      setMessage("Claim failed: " + (e?.response?.data?.error || e.message));
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Special Staking — 100% in 150 days</h2>

      <input className="border p-2 w-full mb-3" placeholder="Amount MVZx" value={amount} onChange={(e)=>setAmount(e.target.value)} />
      <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={handleStake}>Start Stake</button>

      <div className="mt-4">
        <input className="border p-2 w-full mb-3" placeholder="Stake ID to claim" value={String(stakeId)} onChange={(e)=>setStakeId(e.target.value ? Number(e.target.value) : "")} />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full" onClick={handleClaim}>Claim Stake</button>
      </div>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
