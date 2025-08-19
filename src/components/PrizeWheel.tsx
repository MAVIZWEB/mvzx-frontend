 import React, { useState } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import clapSound from "./assets/clap.mp3"; // make sure this file exists

const segments = [
  "5 MVZx",
  "10 MVZx",
  "15 MVZx",
  "20 MVZx",
  "Try Again",
  "50 MVZx",
  "100 MVZx",
  "Better Luck",
];

const PrizeWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const [play] = useSound(clapSound);

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setWinner(null);

    const randomSpin = Math.floor(2000 + Math.random() * 2000); // degrees
    const newRotation = rotation + randomSpin;
    setRotation(newRotation);

    setTimeout(() => {
      const segmentAngle = 360 / segments.length;
      const winningIndex =
        Math.floor(((newRotation % 360) / segmentAngle)) % segments.length;
      const prize = segments[segments.length - 1 - winningIndex];

      setWinner(prize);
      setSpinning(false);

      if (prize !== "Try Again" && prize !== "Better Luck") {
        play(); // play clap only if win
      }
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative w-80 h-80">
        {/* Arrow */}
        <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-red-600"></div>
        </div>

        {/* Wheel */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: "easeOut" }}
          className="w-full h-full rounded-full border-[10px] border-red-600 shadow-lg overflow-hidden"
          style={{
            background: `conic-gradient(
              #fff 0deg 45deg,
              #e11d48 45deg 90deg,
              #fff 90deg 135deg,
              #e11d48 135deg 180deg,
              #fff 180deg 225deg,
              #e11d48 225deg 270deg,
              #fff 270deg 315deg,
              #e11d48 315deg 360deg
            )`,
          }}
        >
          {/* Labels */}
          {segments.map((seg, i) => (
            <div
              key={i}
              className="absolute w-full h-full flex items-center justify-center text-xs font-bold text-red-900"
              style={{
                transform: `rotate(${(360 / segments.length) * i}deg)`,
              }}
            >
              {seg}
            </div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className="px-6 py-3 bg-red-600 text-white rounded-full font-bold shadow hover:bg-red-700 disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin Now"}
      </button>

      {winner && (
        <p className="text-lg font-semibold text-red-700">
          🎉 You got: {winner}!
        </p>
      )}
    </div>
  );
};

export default PrizeWheel;
