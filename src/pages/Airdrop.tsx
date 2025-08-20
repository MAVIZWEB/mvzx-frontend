 import React, { useState } from "react";
import { api } from "../services/api";

const Airdrop: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const claim = async () => {
    setLoading(true); setMsg(null);
    try {
      const res = await api.airdropClaim();
      setMsg(`✅ Airdrop claimed: +${res?.amount ?? "some"} MVZx`);
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-pink-100 to-pink-300">
      <h1 className="text-3xl font-bold text-pink-700 mb-2">🎁 Instant Spin & Earn Airdrop</h1>
      <p className="text-gray-700 mb-6 text-center">Boost your start with a free MVZx drop.</p>
      <button onClick={claim} disabled={loading}
              className={`px-8 py-3 rounded-xl text-white ${loading?"bg-gray-400":"bg-pink-600 hover:bg-pink-700"}`}>
        {loading ? "Claiming..." : "Claim Airdrop"}
      </button>
      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
};

export default Airdrop;
