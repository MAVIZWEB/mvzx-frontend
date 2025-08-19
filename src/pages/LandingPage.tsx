 import React from "react";
import PrizeWheel from "../components/PrizeWheel";
import { useBalance } from "../context/BalanceContext";

export default function LandingPage() {
  const { balance } = useBalance();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-700 via-red-600 to-cream text-white p-4">
      <h1 className="text-2xl font-bold mb-2 drop-shadow">MVZx Platform</h1>
      <p className="mb-4 text-sm opacity-90">🚀 Instant Spin & Earn</p>

      <div className="mb-4 w-full max-w-xs">
        <PrizeWheel />
      </div>

      <p className="mb-4 text-lg font-semibold text-cream drop-shadow">
        Your Balance: {balance.toFixed(3)} MVZx
      </p>

      <div className="grid grid-cols-2 gap-2 w-full max-w-md">
        <a href="/buy" className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center hover:bg-white/30">Buy MVZx</a>
        <a href="/airdrop" className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center hover:bg-white/30">Airdrop</a>
        <a href="/signup" className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center hover:bg-white/30">Sign Up</a>
        <a href="/mining" className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center hover:bg-white/30">Mining</a>
        <a href="/trade" className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center hover:bg-white/30">Trade</a>
        <a href="/leaderboard" className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center hover:bg-white/30">Leaderboard</a>
      </div>
    </div>
  );
}
