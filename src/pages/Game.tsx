import React from "react";
import { Link } from "react-router-dom";

export default function Game() {
  const handleSpin = () => {
    alert("🎡 Spin triggered! Rewards logic coming soon.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top: Game Interface (60%) */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-yellow-100 to-yellow-300 p-6">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl aspect-square flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-4">🎡 Spin & Win</h2>
          <p className="text-gray-600 mb-6 max-w-sm">
            Try your luck! Spin the wheel and win rewards.  
            More spins = more chances.
          </p>
          <button
            onClick={handleSpin}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl shadow-lg transition"
          >
            Spin Now
          </button>
        </div>
      </div>

      {/* Bottom: Feature Buttons (40%) */}
      <div className="bg-white border-t flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 p-6">
        <Link
          to="/escrow"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center shadow text-center p-4 font-semibold"
        >
          Escrow Trade
        </Link>
        <Link
          to="/buy"
          className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl flex items-center justify-center shadow text-center p-4 font-semibold"
        >
          Buy MVZx
        </Link>
        <Link
          to="/signup"
          className="bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center justify-center shadow text-center p-4 font-semibold"
        >
          Airdrop
        </Link>
        <Link
          to="/mining"
          className="bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center shadow text-center p-4 font-semibold"
        >
          Mining
        </Link>
      </div>
    </div>
  );
}
