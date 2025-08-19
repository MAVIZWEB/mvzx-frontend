 import React, { useState } from "react";
import { motion } from "framer-motion";

const prizes = [
  "5 MVZx",
  "10 MVZx",
  "20 MVZx",
  "50 MVZx",
  "100 MVZx",
  "Try Again",
];

export default function PrizeWheel() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Load clap sound
  const winSound = new Audio("/sounds/clap.mp3"); 
  // 👉 Place `clap.mp3` inside `public/sounds/` folder

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const prizeIndex = Math.floor(Math.random() * prizes.length);

    setTimeout(() => {
      setResult(prizes[prizeIndex]);
      setSpinning(false);

      // Play sound only if user wins
      if (prizes[prizeIndex] !== "Try Again") {
        winSound.play().catch((err) => console.log("Audio error:", err));
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{ rotate: spinning ? 360 * 5 : 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="w-64 h-64 rounded-full border-8 border-wine bg-cream flex items-center justify-center shadow-xl"
      >
        <span className="text-lg font-bold text-wine">🎡 Spin!</span>
      </motion.div>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className="mt-6 px-6 py-3 bg-wine text-cream font-semibold rounded-xl shadow-md hover:bg-red-700 disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin Now"}
      </button>

      {result && (
        <p className="mt-4 text-xl font-bold text-wine">
          {result === "Try Again" ? "😢 Try Again!" : `🎉 You won ${result}!`}
        </p>
      )}
    </div>
  );
}
