import React, { useState } from "react";
import { useBalance } from "../context/BalanceContext";

const prizes = [0, 0.5, 1, 2, 5];

export default function PrizeWheel() {
  const { balance, setBalance } = useBalance();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    setTimeout(() => {
      setBalance(balance + prize);
      setResult(prize);
      setSpinning(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={spinWheel}
        disabled={spinning}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full shadow-lg font-bold transition"
      >
        {spinning ? "Spinning..." : "🎡 Spin Wheel"}
      </button>
      {result !== null && (
        <p className="mt-3 text-sm text-gray-800 bg-white px-3 py-1 rounded shadow">
          You won {result} MVZx!
        </p>
      )}
    </div>
  );
}
