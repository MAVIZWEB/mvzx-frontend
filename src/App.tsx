 import React, { useState, useEffect } from "react";
import Airdrop from "./airdrop";
import Buy from "./Buy";
import Signup from "./Signup";
import Escrow from "./Escrow";
import ManualDeposit from "./ManualDeposit";
import Mining from "./Mining";
import Voting from "./Voting";
import Game from "./Game"; // Leaderboard/Game component
import { fetchUserBalance, fetchSpinReward } from "../services/api"; // Your backend API

const Dashboard: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [spinning, setSpinning] = useState(false);

  const userId = localStorage.getItem("mvzx_user") || "demo-user";

  useEffect(() => {
    async function loadBalance() {
      try {
        const balance = await fetchUserBalance(userId);
        setUserBalance(balance);
      } catch (err) {
        console.error("Failed to fetch balance", err);
      }
    }
    loadBalance();
  }, [userId]);

  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  const spinWheel = async () => {
    if (spinning) return;
    setSpinning(true);
    try {
      const reward = await fetchSpinReward(userId);
      setUserBalance(prev => prev + reward);
      // Optional: call leaderboard refresh if needed
      alert(`🎉 You earned ${reward} MVZx!`);
    } catch (err) {
      console.error(err);
      alert("Spin failed. Try again.");
    } finally {
      setSpinning(false);
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
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

      {/* Middle Section: Spinner + Leaderboard */}
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner */}
        <div
          className={`w-64 h-64 bg-gradient-to-tr from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-4xl text-white shadow-lg cursor-pointer transition-transform ${
            spinning ? "animate-spin-slow" : ""
          }`}
          onClick={spinWheel}
        >
          🎡 Spin & Earn
        </div>
        <p className="text-gray-700 text-lg">Balance: <span className="font-bold">{userBalance.toFixed(3)} MVZx</span></p>
        <p className="text-gray-600">Spin daily, earn instantly!</p>

        {/* Leaderboard */}
        <div className="w-full max-w-4xl">
          <Game />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button label="Buy MVZx Earn Cash" color="blue" onClick={() => openModal("buy")} />
        <Button label="Airdrop" color="green" onClick={() => openModal("airdrop")} />
        <Button label="Sign Up" color="purple" onClick={() => openModal("signup")} />
        <Button label="Escrow P2P Trade" color="orange" onClick={() => openModal("escrow")} />
        <Button label="Manual Transfer" color="pink" onClick={() => openModal("manual")} />
        <Button label="Mining" color="indigo" onClick={() => openModal("mining")} />
        <Button label="Voting" color="teal" onClick={() => openModal("voting")} />
      </div>

      {/* Bottom Dashboard Preview */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Your Dashboard Preview</h2>
        <div className="flex justify-between flex-wrap gap-4">
          <Card label="Badge" value="Bronze" />
          <Card label="Stage Progress" value="Stage 1 / 5" />
          <Card label="Wallet" value={`${userBalance.toFixed(3)} MVZx`} />
        </div>
        <div className="mt-4 text-right">
          <button className="text-blue-600 font-semibold hover:underline">View Full Dashboard →</button>
        </div>
      </div>

      {/* Modal Section */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-5xl relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
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

// Reusable Button component
const Button = ({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) => (
  <button
    className={`p-4 bg-${color}-500 text-white rounded-lg shadow hover:bg-${color}-600 transition`}
    onClick={onClick}
  >
    {label}
  </button>
);

// Reusable Card component
const Card = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 bg-gray-100 rounded-lg w-40 text-center">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="font-bold text-lg">{value}</p>
  </div>
);
