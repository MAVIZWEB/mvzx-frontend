import React, { useState } from "react";
import { motion } from "framer-motion";
import { fetchSpinReward } from "../services/api";

const segments = [10, 20, 50, 100, 200, 500]; // MVZx rewards

export default function PrizeWheel({ userId, onReward }: { userId: string; onReward: (amount: number) => void }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);

    try {
      // Get reward from backend
      const reward = await fetchSpinReward(userId);

      // Calculate random segment rotation
      const segmentIndex = segments.indexOf(reward);
      const randomOffset = Math.random() * (360 / segments.length);
      const segmentRotation = segmentIndex * (360 / segments.length) + randomOffset;

      // Total rotations (e.g., 5 spins + landing on reward)
      const totalRotation = 360 * 5 + segmentRotation;
      setRotation(prev => prev + totalRotation);

      // Delay until animation ends (~5s)
      setTimeout(() => {
        onReward(reward);
        setSpinning(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      alert("Spin failed. Try again.");
      setSpinning(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{ rotate: rotation }}
        transition={{ duration: 5, ease: "easeOut" }}
        className="w-64 h-64 rounded-full border-8 border-gray-300 flex items-center justify-center relative bg-gradient-to-tr from-purple-400 to-indigo-500 shadow-lg"
      >
        {segments.map((seg, i) => (
          <div
            key={i}
            className="absolute w-1/2 h-1/2 top-0 left-1/2 origin-bottom-left text-white font-bold text-sm flex items-center justify-center"
            style={{ transform: `rotate(${(360 / segments.length) * i}deg)` }}
          >
            {seg}
          </div>
        ))}
      </motion.div>

      <button
        onClick={spin}
        disabled={spinning}
        className={`mt-4 px-6 py-3 rounded-full font-bold text-white shadow-lg ${
          spinning ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
        }`}
      >
        {spinning ? "Spinning…" : "Spin Now"}
      </button>
    </div>
  );
}
