 import React from "react";
import { Link } from "react-router-dom";

export default function Game() {
  return (
    <main className="flex flex-col h-screen">
      {/* Top 60% - Game UI */}
      <div className="flex flex-col items-center justify-center flex-[0.6] bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-b-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">🎰 Spin & Win</h2>
        
        {/* Placeholder wheel */}
        <div className="w-56 h-56 rounded-full bg-white flex items-center justify-center shadow-2xl border-8 border-yellow-400">
          <span className="text-xl font-bold text-gray-800">SPIN</span>
        </div>

        <button className="mt-6 px-6 py-3 bg-yellow-500 rounded-xl font-semibold shadow hover:bg-yellow-600">
          Spin Now
        </button>
      </div>

      {/* Bottom 40% - Feature Buttons */}
      <div className="flex-[0.4] bg-gray-100 px-4 py-6 flex flex-wrap gap-4 justify-center items-start rounded-t-3xl shadow-inner">
        <Link to="/escrow" className="px-5 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700">
          Escrow Trade
        </Link>
        <Link to="/buy" className="px-5 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700">
          Buy (Card / USDT)
        </Link>
        <Link to="/mining" className="px-5 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">
          Free Mining
        </Link>
        <Link to="/signup" className="px-5 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
          Get Started
        </Link>
      </div>
    </main>
  );
}
