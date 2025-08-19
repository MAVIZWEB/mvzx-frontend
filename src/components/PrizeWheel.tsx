 import React, { useState } from "react";
import { motion } from "framer-motion";

const prizes = ["1 MVZx", "2 MVZx", "5 MVZx", "Try Again", "10 MVZx", "0.5 MVZx"];

export default function PrizeWheel() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const selectedIndex = Math.floor(Math.random() * prizes.length);
    const anglePerSlice = 360 / prizes.length;
    const rotation = 360 * 5 + selectedIndex * anglePerSlice; // 5 full turns

    setTimeout(() => {
      setSpinning(false);
      setResult(prizes[selectedIndex]);

      // 🎵 play win sound
      const audio = new Audio("/sounds/applause.mp3");
      audio.play();
    }, 5000);

    return rotation;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        key={spinning ? "spinning" : "stopped"}
        animate={{ rotate: spinning ? 1800 : 0 }}
        transition={{ duration: 5, ease: "easeOut" }}
        className="rounded-full border-8 border-red-600 w-64 h-64 flex items-center justify-center bg-gradient-to-br from-red-500 to-cream shadow-xl"
      >
        <span className="text-white text-xl font-bold">🎡 Spin Me</span>
      </motion.div>

      <button
        onClick={spin}
        disabled={spinning}
        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin & Win"}
      </button>

      {result && (
        <div className="mt-3 text-lg font-semibold text-gray-800 bg-cream px-4 py-2 rounded-lg shadow">
          🎉 You won: {result}!
        </div>
      )}
    </div>
  );
}
