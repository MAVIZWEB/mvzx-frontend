import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import GameWheel from "./GameWheel"; // Assume wheel component
import Mining from "./Mining";
import Airdrop from "./Airdrop";
import Escrow from "./Escrow";
import BuyMVZX from "./BuyMVZX";
import DirectTransfer from "./DirectTransfer";

const LandingPage: React.FC = () => {
  const [showMining, setShowMining] = useState(false);
  const [showAirdrop, setShowAirdrop] = useState(false);
  const [showSpin, setShowSpin] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [showDirect, setShowDirect] = useState(false);
  const [showEscrow, setShowEscrow] = useState(false);

  const [balance, setBalance] = useState(0);

  const loadBalance = async () => {
    try {
      const res = await api.balance();
      setBalance(res.tokens?.MVZX ?? 0);
    } catch {}
  };

  useEffect(() => { loadBalance(); }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center">

      {/* Header: Signup / Login */}
      <header className="w-full max-w-4xl mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">MAVIZ SWAPS</h1>
        <div>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 mr-2">
            Sign Up
          </button>
          <button className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700">
            Login
          </button>
        </div>
      </header>

      {/* Balance Display */}
      <div className="mb-4 text-xl font-semibold">MVZx Balance: {balance}</div>

      {/* Spin Wheel */}
      <div className="mb-6">
        <GameWheel />
      </div>

      {/* Button Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full max-w-4xl">
        <button className="py-6 rounded-xl text-xl font-semibold text-center bg-blue-600 hover:bg-blue-700"
                onClick={()=>setShowBuy(true)}>BUY MVZx</button>

        <button className="py-6 rounded-xl text-xl font-semibold text-center bg-pink-600 hover:bg-pink-700"
                onClick={()=>setShowAirdrop(true)}>Airdrop</button>

        <button className="py-6 rounded-xl text-xl font-semibold text-center bg-yellow-600 hover:bg-yellow-700"
                onClick={()=>setShowMining(true)}>Mining</button>

        <button className="py-6 rounded-xl text-xl font-semibold text-center bg-green-600 hover:bg-green-700"
                onClick={()=>setShowSpin(true)}>Spin</button>

        <button className="py-6 rounded-xl text-xl font-semibold text-center bg-indigo-600 hover:bg-indigo-700"
                onClick={()=>setShowDirect(true)}>Direct Transfer Buy</button>

        <button className="py-6 rounded-xl text-xl font-semibold text-center bg-purple-600 hover:bg-purple-700"
                onClick={()=>setShowEscrow(true)}>Escrow P2P Trade</button>
      </div>

      {/* Admin Check Section */}
      <div className="mt-8 w-full max-w-4xl p-4 bg-gray-800 rounded-xl text-center">
        <h2 className="text-lg font-bold mb-2">ADMIN CHECKS</h2>
        <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl"
                onClick={()=>window.location.href="/admin"}>ADMIN CHECK</button>
      </div>

      {/* Modals */}
      {showBuy && <BuyMVZX onClose={()=>setShowBuy(false)} />}
      {showAirdrop && <Airdrop />}
      {showMining && <Mining />}
      {showSpin && <GameWheel />}
      {showDirect && <DirectTransfer onClose={()=>setShowDirect(false)} />}
      {showEscrow && <Escrow />}
    </div>
  );
};

export default LandingPage;
