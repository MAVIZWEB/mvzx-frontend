import React, { useState } from "react";

const Game: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const prizes = [
    "🎉 5 MVZx",
    "💰 10 MVZx",
    "🔥 20 MVZx",
    "❌ Try Again",
    "🎁 Bonus Spin",
    "💎 50 MVZx"
  ];

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * prizes.length);
      setResult(randomIndex);
      setSpinning(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-purple-300 p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">
        🎡 Spin & Earn MVZx
      </h1>

      <div className="w-64 h-64 border-4 border-purple-700 rounded-full flex items-center justify-center bg-white shadow-lg relative">
        {spinning ? (
          <span className="text-xl font-bold text-purple-600 animate-pulse">
            Spinning...
          </span>
        ) : result !== null ? (
          <span className="text-xl font-bold text-green-700">
            {prizes[result]}
          </span>
        ) : (
          <span className="text-xl text-gray-500">Tap Spin</span>
        )}
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="mt-6 bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-purple-800 disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "🎰 Spin Now"}
      </button>
    </div>
  );
};

export default Game;
