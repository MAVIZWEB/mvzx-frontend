 import React, { useEffect, useState } from "react";
import { api } from "../services/api";

const sectors = [
  "0.125 MVZx","0.25 MVZx","0.375 MVZx","0.5 MVZx","0.625 MVZx","0.75 MVZx","1 MVZx","3× Free Reward"
];

const Game: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(Number(localStorage.getItem("mvzx_balance")||"0"));
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  const loadLeaderboard = async () => {
    try { setLeaderboard(await api.leaderboard()); } catch {}
  };

  useEffect(() => { loadLeaderboard(); }, []);

  const spin = async () => {
    if (spinning) return;
    setSpinning(true); setReward(null); setMsg(null);
    try {
      const res = await api.spin(); // backend decides outcome & award
      const got = res?.rewardLabel || sectors[Math.floor(Math.random()*sectors.length)];
      setReward(got);
      const credit = Number(res?.amount ?? 0);
      const newBal = balance + credit;
      setBalance(newBal);
      localStorage.setItem("mvzx_balance", String(newBal));
      await loadLeaderboard();
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    } finally {
      setSpinning(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-2">🎡 Spin & Earn</h2>
      <p className="text-gray-600 mb-4">Daily free spins + bonus on purchases/referrals.</p>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col items-center">
          <div className={`w-64 h-64 rounded-full border-8 border-yellow-400 flex items-center justify-center transition-transform duration-[3s] ${spinning ? "rotate-[1080deg]" : ""}`}>
            <span className="text-3xl">🎯</span>
          </div>
          <button onClick={spin} disabled={spinning}
                  className={`mt-4 px-6 py-3 rounded-xl text-white ${spinning?"bg-gray-400":"bg-purple-600 hover:bg-purple-700"}`}>
            {spinning ? "Spinning..." : "Spin"}
          </button>
          {reward && <div className="mt-3 p-3 bg-green-100 text-green-800 rounded-xl font-semibold">You got: {reward}</div>}
          {msg && <div className="mt-3 p-3 bg-red-100 text-red-800 rounded-xl">{msg}</div>}
        </div>

        <div>
          <div className="p-4 bg-gray-50 rounded-xl mb-4">
            <div className="text-sm text-gray-600">Your MVZx (local tracker)</div>
            <div className="text-3xl font-bold">{balance.toFixed(3)} MVZx</div>
          </div>
          <h3 className="font-semibold mb-2">🏆 Leaderboard</h3>
          <ul className="divide-y rounded-xl border">
            {leaderboard.slice(0,10).map((row, i)=>(
              <li key={i} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 text-right">{i+1}</div>
                  <div className="font-mono text-xs">{row.wallet?.slice(0,6)}…{row.wallet?.slice(-4)}</div>
                </div>
                <div className="font-semibold">{row.earned} MVZx</div>
              </li>
            ))}
            {leaderboard.length===0 && <li className="p-3 text-sm text-gray-500">No spins yet.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Game;
