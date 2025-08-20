 import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import BadgeDisplay from "../components/BadgeDisplay";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [matrix, setMatrix] = useState<any>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    setMsg(null);
    try {
      const [s, m] = await Promise.all([api.summary(), api.matrixStatus()]);
      setSummary(s); setMatrix(m);
    } catch (err: any) { setMsg(`⚠️ ${err.message}`); }
  };

  useEffect(() => { load(); }, []);

  const stage = matrix?.stage ?? 1;
  const legsFilled = matrix?.legsFilled ?? 0;
  const legsTotal = matrix?.legsTotal ?? 62;
  const mcPerLeg = matrix?.mcPerLeg ?? 162; // 16.2% of 1000 NGN example
  const totalMC = mcPerLeg * legsTotal;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">📊 User Dashboard</h1>
            <BadgeDisplay stage={stage} />
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-xs text-gray-600">Wallet</div>
              <div className="font-mono text-sm break-all">{summary?.wallet ?? "—"}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-xs text-gray-600">MVZx</div>
              <div className="text-xl font-bold">{summary?.balances?.MVZX ?? 0}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-xs text-gray-600">USDT</div>
              <div className="text-xl font-bold">{summary?.balances?.USDT ?? 0}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50">
            <div className="font-semibold mb-2">Progress</div>
            <div className="flex items-center justify-between text-sm">
              <div>Current Stage: <b>{stage}</b></div>
              <div>Next Stage: <b>{Math.min(stage+1,10)}</b></div>
              <div>Legs: <b>{legsFilled}/{legsTotal}</b></div>
            </div>
            <div className="mt-2 text-sm">
              Total MC if stage completes: <b>{totalMC.toLocaleString()}</b>
            </div>
            <div className="mt-3 h-2 bg-white rounded-full overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: `${(legsFilled/legsTotal)*100}%` }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-3">Quick Actions</h2>
          <div className="grid gap-3">
            <Link to="/buy" className="w-full">
              <button className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white">💰 MVZx Buy & Earn</button>
            </Link>
            <Link to="/airdrop" className="w-full">
              <button className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white">🎁 Airdrop</button>
            </Link>
            <Link to="/mining" className="w-full">
              <button className="w-full py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white">⛏️ Mining</button>
            </Link>
            <Link to="/escrow" className="w-full">
              <button className="w-full py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white">🤝 Escrow P2P</button>
            </Link>
            <Link to="/voting" className="w-full">
              <button className="w-full py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white">🗳️ Voting</button>
            </Link>
            <Link to="/game" className="w-full">
              <button className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white">🎡 Spin & Earn</button>
            </Link>
          </div>
          {msg && <p className="mt-4 text-sm">{msg}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
