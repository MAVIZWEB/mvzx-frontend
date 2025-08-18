import React, { useState } from "react";

const rewards = [
  "0.125 MVZx", // Free mining reward
  "0.25 MVZx",
  "0.375 MVZx",
  "0.5 MVZx",
  "0.625 MVZx",
  "0.75 MVZx",
  "1 MVZx",
  "3× Free Reward",
];

export default function Game() {
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState<string | null>(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setReward(null);

    // Mock spinning time
    const spinDuration = 3000;
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * rewards.length);
      const selectedReward = rewards[randomIndex];
      setReward(selectedReward);

      // Mock token transfer (replace with backend call later)
      console.log(`Mock: ${selectedReward} sent to user wallet`);

      setSpinning(false);
    }, spinDuration);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh] bg-gray-50 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Spin & Win MVZx Tokens!</h2>

      <div className="relative w-64 h-64 mb-6">
        {/* Wheel */}
        <div
          className={`w-full h-full rounded-full border-8 border-yellow-400 flex items-center justify-center transition-transform duration-[3s] ${
            spinning ? "rotate-[1080deg]" : ""
          }`}
        >
          <span className="absolute text-center font-semibold text-lg">
            {spinning ? "Spinning..." : "🎰"}
          </span>
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className={`px-6 py-3 rounded-lg text-white font-semibold ${
          spinning ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>

      {reward && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 font-semibold rounded-lg shadow-md">
          🎉 You won: {reward}!
        </div>
      )}
    </div>
  );
}
