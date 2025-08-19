 import React, { useState } from "react";
import Wheel from "./components/Wheel";
import Game from "./components/Game";

const App: React.FC = () => {
  const [balance, setBalance] = useState(0);

  const handleWin = (prize: string) => {
    // Update balance on win
    setBalance((prev) => prev + 100);
    console.log("You won:", prize);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between p-4 bg-glassy-red shadow-md">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />

        <div className="text-center">
          <h1 className="text-xl font-bold text-white">MAVIZ LIQUIDITY</h1>
          <h2 className="text-sm text-white">BUY & EARN</h2>
        </div>

        <button className="text-white font-semibold">Sign In</button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center p-4">
        {/* Title Above Wheel */}
        <h2 className="text-lg font-semibold text-red-700 mb-2">
          🎯 Instant Spin & Earn
        </h2>

        {/* Wheel */}
        <div className="relative mb-6">
          <Wheel onWin={handleWin} />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-10">
          <button className="btn">Buy MVZx & Earn</button>
          <button className="btn">Direct Transfer Buy</button>
          <button className="btn">Airdrop</button>
          <button className="btn">Sign Up</button>
          <button className="btn">Mining</button>
          <button className="btn">Escrow Trade</button>
          <button className="btn">Trade</button>
          <button className="btn">Voting</button>
          <button className="btn col-span-2">Game</button>
        </div>

        {/* Leaderboard */}
        <div className="w-full max-w-2xl">
          <Game />
        </div>
      </main>
    </div>
  );
};

export default App;
