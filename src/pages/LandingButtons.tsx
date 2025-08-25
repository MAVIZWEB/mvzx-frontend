import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import Escrow from "./Escrow";
import Mining from "./Mining";
import Airdrop from "./Airdrop";
import Voting from "./Voting";

const LandingButtons: React.FC = () => {
  const [show, setShow] = useState<"NONE"|"MINING"|"AIRDROP"|"VOTING"|"ESCROW"|"BUY"|"DIRECT">("NONE");
  const [mvzxBalance, setMvzxBalance] = useState<number>(0);
  const [miningCooldown, setMiningCooldown] = useState<number>(0);

  const loadBalance = async () => {
    try {
      const bal = await api.balance();
      setMvzxBalance(bal.tokens?.MVZX ?? 0);
      setMiningCooldown(bal.miningCooldown ?? 0);
    } catch { }
  };

  useEffect(() => {
    loadBalance();
    const timer = setInterval(() => {
      setMiningCooldown(prev => prev > 0 ? prev - 1000 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderComponent = () => {
    switch(show){
      case "MINING": return <Mining />;
      case "AIRDROP": return <Airdrop />;
      case "VOTING": return <Voting />;
      case "ESCROW": return <Escrow />;
      case "BUY": return <div className="p-6">BUY MVZX form placeholder</div>;
      case "DIRECT": return <div className="p-6">DIRECT TRANSFER BUY form placeholder</div>;
      default: return null;
    }
  };

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000) % 60;
    const m = Math.floor(ms / 1000 / 60) % 60;
    const h = Math.floor(ms / 1000 / 60 / 60);
    return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  };

  return (
    <div className="p-6 flex flex-col items-center space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-xl">
        <button onClick={()=>setShow("BUY")} className="py-4 rounded-xl bg-indigo-700 text-white text-lg font-semibold">BUY MVZX</button>
        <button onClick={()=>setShow("DIRECT")} className="py-4 rounded-xl bg-purple-600 text-white text-lg font-semibold">DIRECT TRANSFER BUY</button>
        <button onClick={()=>setShow("AIRDROP")} className="py-4 rounded-xl bg-pink-600 text-white text-lg font-semibold">AIRDROP</button>
        <button onClick={()=>setShow("MINING")} className={`py-4 rounded-xl ${miningCooldown>0?"bg-gray-400":"bg-yellow-600"} text-white text-lg font-semibold`}>
          MINING {miningCooldown>0 && `(${formatTime(miningCooldown)})`}
        </button>
        <button onClick={()=>setShow("VOTING")} className="py-4 rounded-xl bg-green-600 text-white text-lg font-semibold">VOTING</button>
        <button onClick={()=>setShow("ESCROW")} className="py-4 rounded-xl bg-blue-600 text-white text-lg font-semibold">ESCROW P2P</button>
      </div>

      <div className="w-full mt-6">{renderComponent()}</div>
    </div>
  );
};

export default LandingButtons;
