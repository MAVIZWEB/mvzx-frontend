import React, { useState } from "react";
import Airdrop from "./Airdrop";
import Buy from "./Buy";
import Signup from "./Signup";
import Escrow from "./Escrow";
import ManualDeposit from "./ManualDeposit";
import Mining from "./Mining";
import Voting from "./Voting";
import PrizeWheel from "../components/PrizeWheel";

const Dashboard = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);

  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
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

      <div className="flex flex-col items-center space-y-6">
        <PrizeWheel onWin={(amt) => setBalance(balance + amt)} />
        <div className="text-lg font-semibold">Your Balance: {balance} MVZx</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button onClick={() => openModal("buy")} className="p-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
          Buy MVZx Earn Cash
        </button>
        <button onClick={() => openModal("airdrop")} className="p-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
          Airdrop
        </button>
        <button onClick={() => openModal("signup")} className="p-4 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition">
          Sign Up
        </button>
        <button onClick={() => openModal("escrow")} className="p-4 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition">
          Escrow P2P Trade
        </button>
        <button onClick={() => openModal("manual")} className="p-4 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition">
          Manual Transfer
        </button>
        <button onClick={() => openModal("mining")} className="p-4 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition">
          Mining
        </button>
        <button onClick={() => openModal("voting")} className="p-4 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition">
          Voting
        </button>
      </div>

      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-5xl relative overflow-y-auto max-h-[90vh]">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
              ✖
            </button>
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
};

export default Dashboard;
