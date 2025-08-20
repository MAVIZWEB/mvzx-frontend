import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerGame from "../components/SpinnerGame";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Example user data (replace with backend later)
  const [user] = useState({
    badge: "Bronze",
    stage: 1,
    nextStage: 2,
    totalMC: 10200,
    wallet: "0x1234...abcd",
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {/* Top Description */}
      <div className="w-full text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          MVZx Platform — Instant Spin & Earn
        </h1>
        <p className="text-gray-600 mt-2">
          Buy, Mine, Trade, Vote & Earn instantly with MAVIZ MVZx Tokens.
        </p>
      </div>

      {/* Airdrop Banner */}
      <div
        onClick={() => navigate("/airdrop")}
        className="w-full bg-yellow-200 text-yellow-800 font-semibold text-center py-3 rounded-xl cursor-pointer shadow-md mb-6"
      >
        🎁 Claim Your Instant Airdrop Now!
      </div>

      {/* Game Spinner */}
      <div className="w-full flex justify-center mb-8">
        <SpinnerGame />
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-10">
        <button
          onClick={() => navigate("/purchase")}
          className="bg-blue-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-blue-700"
        >
          💰 Buy MVZx & Earn
        </button>
        <button
          onClick={() => navigate("/airdrop")}
          className="bg-green-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-green-700"
        >
          🎁 Airdrop
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-purple-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-purple-700"
        >
          ✍️ Sign Up
        </button>
        <button
          onClick={() => navigate("/mining")}
          className="bg-orange-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-orange-700"
        >
          ⛏️ Mining
        </button>
        <button
          onClick={() => navigate("/escrow")}
          className="bg-pink-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-pink-700"
        >
          🔒 Escrow Trade
        </button>
        <button
          onClick={() => navigate("/trade")}
          className="bg-indigo-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-indigo-700"
        >
          📈 Trade
        </button>
        <button
          onClick={() => navigate("/voting")}
          className="bg-red-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-red-700 col-span-2 sm:col-span-1"
        >
          🗳️ Voting
        </button>
      </div>

      {/* User Dashboard Preview */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">User Dashboard Preview</h2>
        <p>
          <strong>Badge:</strong> {user.badge}
        </p>
        <p>
          <strong>Current Stage:</strong> {user.stage}
        </p>
        <p>
          <strong>Next Stage:</strong> {user.nextStage}
        </p>
        <p>
          <strong>Total MC to Expect:</strong> {user.totalMC}
        </p>
        <p>
          <strong>Wallet:</strong> {user.wallet}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
