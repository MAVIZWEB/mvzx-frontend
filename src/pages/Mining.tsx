 import React, { useState } from "react";
import { api } from "../services/api";

const Mining: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const claim = async () => {
    setLoading(true); setMsg(null);
    try {
      const res = await api.miningClaim();
      setMsg(`✅ Mining reward claimed: +${res?.amount ?? 0} MVZx`);
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-yellow-50">
      <h1 className="text-3xl font-bold text-yellow-600 mb-2">⛏️ MVZx Mining</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Tap to claim mining rewards (cooldown & rate controlled by admin).
      </p>
      <button onClick={claim} disabled={loading}
              className={`px-8 py-3 rounded-xl text-white ${loading?"bg-gray-400":"bg-yellow-600 hover:bg-yellow-700"}`}>
        {loading ? "Claiming..." : "Claim Reward"}
      </button>
      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
};

export default Mining;
