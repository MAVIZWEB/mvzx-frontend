  import React, { useState, useEffect, useRef } from "react";
import { api } from "../services/api";
import Wheel from "./Wheel";
import BuyMVZX from "./BuyMVZX";
import Airdrop from "./Airdrop";
import Mining from "./Mining";
import DirectTransfer from "./DirectTransfer";
import Escrow from "./Escrow";
import Voting from "./Voting";

const LandingPage: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [miningTimeLeft, setMiningTimeLeft] = useState(0);
  const miningInterval = useRef<NodeJS.Timer | null>(null);

  const loadBalance = async () => {
    try {
      const res = await api.getBalance();
      setBalance(res.MVZX ?? 0);
    } catch {}
  };

  useEffect(() => {
    loadBalance();
  }, []);

  // Mining timer
  useEffect(() => {
    if (miningTimeLeft <= 0 && miningInterval.current) {
      clearInterval(miningInterval.current);
      miningInterval.current = null;
    }
  }, [miningTimeLeft]);

  const startMiningTimer = () => {
    if (miningInterval.current) return;
    let msLeft = 24 * 60 * 60 * 1000; // 24 hrs
    setMiningTimeLeft(msLeft);
    miningInterval.current = setInterval(() => {
      msLeft -= 1000;
      setMiningTimeLeft(msLeft);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">MAVIZ SWAPS</h1>
      
      <div className="mb-6">
        <Wheel />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-6">
        <BuyMVZX refreshBalance={loadBalance} />
        <Airdrop refreshBalance={loadBalance} />
        <Mining refreshBalance={loadBalance} startMiningTimer={startMiningTimer} miningTimeLeft={miningTimeLeft} />
        <DirectTransfer refreshBalance={loadBalance} />
        <Escrow />
        <Voting />
      </div>

      <div className="text-lg mt-4">Total MVZx: {balance}</div>
      {miningTimeLeft > 0 && <div>Mining ends in: {(miningTimeLeft / 1000).toFixed(0)}s</div>}
    </div>
  );
};

export default LandingPage;
