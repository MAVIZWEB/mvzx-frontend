 import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { isVotingOpen, nextVotingTimes, lagosNow } from "../utils/time";

const Voting: React.FC = () => {
  const [ballot, setBallot] = useState<any>(null);
  const [eligible, setEligible] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    setMsg(null);
    try {
      const [b, bal] = await Promise.all([api.getBallot(), api.balance()]);
      setBallot(b);
      const mvzx = (bal?.tokens?.MVZX ?? 0) as number;
      setEligible(mvzx >= 20);
    } catch (err: any) {
      setMsg(`⚠️ ${err.message}`);
    }
  };

  useEffect(() => { load(); }, []);

  const handleVote = async (choice: "UP"|"FLAT"|"DOWN") => {
    setMsg(null);
    try {
      await api.castVote(choice);
      setMsg("✅ Vote recorded.");
      await load();
    } catch (err: any) { setMsg(`❌ ${err.message}`); }
  };

  const now = lagosNow();
  const open = isVotingOpen(now);
  const { start, cutoff, publish, effect } = nextVotingTimes(now);

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">🗳️ MVZx Price Voting</h1>
        <p className="text-gray-600 mb-4">
          Voting window: <b>6:00 PM – 11:00 PM</b> (Africa/Lagos). Results 11:30 PM, effective at midnight.
        </p>

        <div className="text-sm bg-gray-50 rounded-xl p-3 mb-4">
          <div>Opens: {start.toLocaleTimeString()}</div>
          <div>Closes: {cutoff.toLocaleTimeString()}</div>
          <div>Publish: {publish.toLocaleTimeString()}</div>
          <div>Effective: {effect.toLocaleTimeString()}</div>
        </div>

        {!open && <div className="p-3 rounded-xl bg-yellow-50 text-yellow-800 mb-4">Voting is closed right now.</div>}

        <div className="grid md:grid-cols-3 gap-3">
          <button disabled={!open || !eligible}
                  onClick={()=>handleVote("UP")}
                  className={`py-4 rounded-xl text-white ${(!open || !eligible)?"bg-gray-400":"bg-green-600 hover:bg-green-700"}`}>
            📈 Vote UP
          </button>
          <button disabled={!open || !eligible}
                  onClick={()=>handleVote("FLAT")}
                  className={`py-4 rounded-xl text-white ${(!open || !eligible)?"bg-gray-400":"bg-blue-600 hover:bg-blue-700"}`}>
            ➖ Vote FLAT
          </button>
          <button disabled={!open || !eligible}
                  onClick={()=>handleVote("DOWN")}
                  className={`py-4 rounded-xl text-white ${(!open || !eligible)?"bg-gray-400":"bg-red-600 hover:bg-red-700"}`}>
            📉 Vote DOWN
          </button>
        </div>

        <p className="mt-3 text-sm">
          {eligible ? "✅ You are eligible (≥ 20 MVZx)." : "❌ Need at least 20 MVZx to vote."}
        </p>

        {ballot && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Live Tally</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-green-50 rounded-xl">UP<br/><b>{ballot.up ?? 0}</b></div>
              <div className="p-3 bg-blue-50 rounded-xl">FLAT<br/><b>{ballot.flat ?? 0}</b></div>
              <div className="p-3 bg-red-50 rounded-xl">DOWN<br/><b>{ballot.down ?? 0}</b></div>
            </div>
          </div>
        )}

        {msg && <p className="mt-4">{msg}</p>}
      </div>
    </div>
  );
};

export default Voting;
