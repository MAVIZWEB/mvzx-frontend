 import React, { useState, useEffect } from "react";
import Airdrop from "./airdrop";
import Buy from "./Buy";
import Signup from "./Signup";
import Escrow from "./Escrow";
import ManualDeposit from "./ManualDeposit";
import Mining from "./Mining";
import Voting from "./Voting";
import Game from "./Game"; // Leaderboard/Game component
import PrizeWheel from "../components/PrizeWheel";

export default function Dashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState<number>(() => {
    const saved = localStorage.getItem("mvzx_balance");
    return saved ? parseFloat(saved) : 0;
  });

  const [userId] = useState<string>(() => localStorage.getItem("mvzx_user") || "demo-user");

  useEffect(() => {
    localStorage.setItem("mvzx_balance", userBalance.toString());
  }, [userBalance]);

  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      
      {/* Top Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">MVZx — Instant Spin & Earn</h1>
        <p className="text-gray-600 text-lg">Buy, Mine, Trade, Vote</p>
        <div
          className="bg-yellow-300 text-gray-800 font-semibold p-4 rounded-lg shadow-md cursor-pointer hover:bg-yellow-400 transition"
          onClick={() => openModal("airdrop")}
        >
          🎁 Instant Airdrop — Claim Now!
        </div>
      </div>

      {/* Middle Section: Wheel + Leaderboard */}
      <div className="flex flex-col items-center space-y-6">
        <PrizeWheel
          userId={userId}
          onReward={(amount) => setUserBalance(prev => prev + amount)}
        />
        <p className="text-gray-600">Your balance: <span className="font-bold">{userBalance.toFixed(3)} MVZx</span></p>

        <div className="w-full max-w-4xl">
          <Game />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button onClick={() => openModal("buy")} className="p-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">Buy MVZx Earn Cash</button>
        <button onClick={() => openModal("airdrop")} className="p-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">Airdrop</button>
        <button onClick={() => openModal("signup")} className="p-4 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition">Sign Up</button>
        <button onClick={() => openModal("escrow")} className="p-4 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition">Escrow P2P Trade</button>
        <button onClick={() => openModal("manual")} className="p-4 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition">Manual Transfer</button>
        <button onClick={() => openModal("mining")} className="p-4 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition">Mining</button>
        <button onClick={() => openModal("voting")} className="p-4 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition">Voting</button>
      </div>

      {/* Dashboard Preview */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Your Dashboard Preview</h2>
        <div className="flex justify-between flex-wrap gap-4">
          <div className="p-4 bg-gray-100 rounded-lg w-40 text-center">
            <p className="text-gray-500 text-sm">Badge</p>
            <p className="font-bold text-lg">Bronze</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg w-40 text-center">
            <p className="text-gray-500 text-sm">Stage Progress</p>
            <p className="font-bold text-lg">Stage 1 / 5</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg w-40 text-center">
            <p className="text-gray-500 text-sm">Wallet</p>
            <p className="font-bold text-lg">{userBalance.toFixed(3)} MVZx</p>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button className="text-blue-600 font-semibold hover:underline">View Full Dashboard →</button>
        </div>
      </div>

      {/* Modal Section */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-5xl relative overflow-y-auto max-h-[90vh]">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>✖</button>

            {activeModal === "airdrop" && <Airdrop />}
            {activeModal === "buy" && <Buy />}
            {activeModal === "signup" && <Signup />}
            {activeModal === "escrow" && <Escrow />}
            {activeModal === "manual" && <ManualDeposit />}
            {activeModal === "mining" && <Mining />}
            {activeModal === "voting" && <Voting />}
          </div>
        </div>
      )}
    </div>
  );
}
