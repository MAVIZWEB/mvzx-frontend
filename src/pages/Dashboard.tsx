import React, { useState } from "react";
import Airdrop from "./airdrop";
// Import other forms/pages as needed

const Dashboard = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="p-6 space-y-8">
      {/* Top Description & Banner */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">MVZx — Instant Spin & Earn</h1>
        <p className="mb-4">Buy, Mine, Trade, Vote</p>
        <div className="bg-yellow-300 p-4 rounded shadow-md mb-6 cursor-pointer hover:bg-yellow-400 transition"
             onClick={() => openModal("airdrop")}>
          🎁 Instant Airdrop — Claim Now!
        </div>
      </div>

      {/* Spinner Placeholder */}
      <div className="flex justify-center mb-6">
        <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
          🎡 Game Spinner
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

      {/* Modal Container */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✖
            </button>
            {activeModal === "airdrop" && <Airdrop />}
            {activeModal === "buy" && <div>Buy Form Placeholder</div>}
            {activeModal === "signup" && <div>Signup Form Placeholder</div>}
            {activeModal === "escrow" && <div>Escrow Form Placeholder</div>}
            {activeModal === "manual" && <div>Manual Transfer Form Placeholder</div>}
            {activeModal === "mining" && <div>Mining Panel Placeholder</div>}
            {activeModal === "voting" && <div>Voting Panel Placeholder</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
