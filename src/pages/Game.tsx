import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Rewards list
const rewards = [
  "0.125 MVZx",
  "0.25 MVZx",
  "0.375 MVZx",
  "0.5 MVZx",
  "0.625 MVZx",
  "0.75 MVZx",
  "1 MVZx",
  "3× Free Reward",
];

// Helper: parse numeric reward value
const getRewardValue = (reward: string): number => {
  if (reward.includes("×")) return 0; // free spin multiplier, no direct tokens
  return parseFloat(reward.split(" ")[0]);
};

export default function Game() {
  // State
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [history, setHistory] = useState<{ reward: string; time: string }[]>([]);
  const [spinsLeft, setSpinsLeft] = useState<number>(3);

  // Load persistent data
  useEffect(() => {
    const savedBalance = localStorage.getItem("mvzx_balance");
    const savedHistory = localStorage.getItem("mvzx_history");
    const savedSpins = localStorage.getItem("mvzx_spinsLeft");
    const lastSpinDate = localStorage.getItem("mvzx_spinDate");

    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedSpins && lastSpinDate === new Date().toDateString()) {
      setSpinsLeft(parseInt(savedSpins));
    } else {
      // reset daily spins
      setSpinsLeft(3);
      localStorage.setItem("mvzx_spinDate", new Date().toDateString());
    }
  }, []);

  // Save balance/history/spins persistently
  useEffect(() => {
    localStorage.setItem("mvzx_balance", balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("mvzx_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("mvzx_spinsLeft", spinsLeft.toString());
    localStorage.setItem("mvzx_spinDate", new Date().toDateString());
  }, [spinsLeft]);

  // Spin action
  const spinWheel = () => {
    if (spinning || spinsLeft <= 0) return;

    setSpinning(true);
    setReward(null);
    setSpinsLeft((prev) => prev - 1);

    const spinDuration = 3000;
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * rewards.length);
      const selectedReward = rewards[randomIndex];
      setReward(selectedReward);

      if (selectedReward.includes("×")) {
        // "3× Free Reward" = extra free spins
        setSpinsLeft((prev) => prev + 3);
      } else {
        const value = getRewardValue(selectedReward);
        setBalance((prev) => prev + value);
      }

      // Save history
      setHistory((prev) => [
        { reward: selectedReward, time: new Date().toLocaleTimeString() },
        ...prev.slice(0, 9), // keep last 10
      ]);

      setSpinning(false);
    }, spinDuration);
  };

  // Reset balance
  const resetBalance = () => {
    setBalance(0);
    setHistory([]);
    setSpinsLeft(3);
    localStorage.removeItem("mvzx_balance");
    localStorage.removeItem("mvzx_history");
    localStorage.removeItem("mvzx_spinsLeft");
    localStorage.setItem("mvzx_spinDate", new Date().toDateString());
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[80vh] bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">🎰 Spin & Earn MVZx</h2>

      {/* Balance */}
      <div className="mb-6 text-center">
        <p className="text-lg font-medium">Your Balance</p>
        <p className="text-2xl font-bold text-green-600">{balance.toFixed(3)} MVZx</p>
        <p className="text-sm text-gray-500">Daily Free Spins Left: {spinsLeft}</p>
      </div>

      {/* Wheel */}
      <div className="relative w-64 h-64 mb-6">
        <motion.div
          animate={{ rotate: spinning ? 1080 : 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="w-full h-full rounded-full border-8 border-yellow-400 flex items-center justify-center"
        >
          <span className="absolute text-center font-semibold text-lg">
            {spinning ? "Spinning..." : "🎯"}
          </span>
        </motion.div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={spinning || spinsLeft <= 0}
        className={`px-6 py-3 rounded-lg text-white font-semibold mb-6 ${
          spinning || spinsLeft <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {spinning ? "Spinning..." : spinsLeft > 0 ? "Spin Now" : "No Spins Left"}
      </button>

      {/* Reward Message */}
      {reward && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-4 p-4 bg-green-100 text-green-800 font-semibold rounded-lg shadow-md"
        >
          🎉 You won: {reward}!
        </motion.div>
      )}

      {/* History */}
      <div className="mt-8 w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-bold mb-2">Recent Rewards</h3>
        {history.length === 0 ? (
          <p className="text-gray-500">No spins yet.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {history.map((h, i) => (
              <li key={i} className="flex justify-between">
                <span>{h.reward}</span>
                <span className="text-gray-500">{h.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Reset button */}
      <button
        onClick={resetBalance}
        className="mt-6 px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg"
      >
        Reset Balance (Test Only)
      </button>
    </div>
  );
}
