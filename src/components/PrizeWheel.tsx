 import React, { useState } from "react";
import { motion } from "framer-motion";

const prizes = ["10 MVZx", "20 MVZx", "50 MVZx", "100 MVZx", "Try Again", "5 MVZx"];
const badgeColors = {
  Bronze: "from-orange-400 to-red-600",
  Silver: "from-gray-200 to-gray-400",
  Gold: "from-yellow-400 to-yellow-600",
  Platinum: "from-gray-300 to-gray-500",
  Diamond: "from-cyan-400 to-blue-600",
};

const PrizeWheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [wallet, setWallet] = useState(0);
  const [badge, setBadge] = useState("Bronze");

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomIndex];

    setTimeout(() => {
      setResult(prize);
      if (prize !== "Try Again") {
        const earned = parseInt(prize.replace(" MVZx", ""));
        const newWallet = wallet + earned;
        setWallet(newWallet);

        if (newWallet >= 1000) setBadge("Diamond");
        else if (newWallet >= 800) setBadge("Platinum");
        else if (newWallet >= 600) setBadge("Gold");
        else if (newWallet >= 400) setBadge("Silver");
        else setBadge("Bronze");
      }
      setSpinning(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Wheel */}
      <motion.div
        className="w-64 h-64 rounded-full border-8 border-red-600 bg-red-700 text-white flex items-center justify-center shadow-2xl"
        animate={{ rotate: spinning ? 720 : 0 }}
        transition={{ duration: 2 }}
      >
        {spinning ? "Spinning..." : result || "Spin to Win"}
      </motion.div>

      {/* Spin button & side stacks */}
      <div className="flex items-start gap-8 mt-4">
        {/* Left Stack: Badge, Earnings, Wallet */}
        <div className="flex flex-col gap-2 items-start">
          <div className={`px-3 py-1 rounded-xl bg-gradient-to-r ${badgeColors[badge]} text-white font-bold`}>
            {badge} Badge
          </div>
          <div className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            Last Spin: {result || "-"}
          </div>
          <div className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            Wallet: {wallet} MVZx
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={spinWheel}
          disabled={spinning}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl font-bold text-white shadow-lg hover:scale-105 transition"
        >
          {spinning ? "Spinning..." : "Spin"}
        </button>

        {/* Right Stack: reserved */}
        <div className="flex flex-col gap-2 items-start">
          <div className="px-3 py-1 rounded-xl bg-transparent text-gray-400 italic">
            Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeWheel;
