 import React, { useState } from "react";

type Reward = {
  label: string;
  value: number; // actual MVZx amount
};

const rewards: Reward[] = [
  { label: "0.125 MVZx", value: 0.125 },
  { label: "0.25 MVZx", value: 0.25 },
  { label: "0.375 MVZx", value: 0.375 },
  { label: "0.5 MVZx", value: 0.5 },
  { label: "0.625 MVZx", value: 0.625 },
  { label: "0.75 MVZx", value: 0.75 },
  { label: "1 MVZx", value: 1 },
  { label: "3× Free Reward", value: 0 }, // special case
];

export default function Game() {
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState<Reward | null>(null);
  const [rotation, setRotation] = useState(0);
  const [balance, setBalance] = useState(0); // Token balance tracker

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setReward(null);

    const randomIndex = Math.floor(Math.random() * rewards.length);
    const selectedReward = rewards[randomIndex];
    const sliceAngle = 360 / rewards.length;

    const targetAngle =
      360 * 5 + (360 - randomIndex * sliceAngle - sliceAngle / 2);

    setRotation(targetAngle);

    setTimeout(() => {
      setReward(selectedReward);

      if (selectedReward.value > 0) {
        setBalance((prev) => prev + selectedReward.value);
      } else {
        // Handle "3x Free Reward" — give another spin automatically
        spinWheel();
      }

      setSpinning(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[80vh] bg-gray-50 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎰 Spin & Earn MVZx Tokens!</h2>

      {/* Balance Tracker */}
      <div className="mb-6 p-4 bg-purple-100 text-purple-800 font-semibold rounded-lg shadow-md">
        💰 Your Balance: {balance.toFixed(3)} MVZx
      </div>

      {/* Wheel container */}
      <div className="relative w-72 h-72 mb-6">
        {/* Wheel */}
        <div
          className="absolute w-full h-full rounded-full border-4 border-gray-300 transition-transform duration-[5s] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {rewards.map((item, i) => {
            const angle = (360 / rewards.length) * i;
            const background =
              i % 2 === 0 ? "bg-yellow-300" : "bg-blue-300";
            return (
              <div
                key={i}
                className={`absolute w-1/2 h-1/2 origin-bottom-left flex items-center justify-center text-xs font-semibold text-black ${background}`}
                style={{
                  transform: `rotate(${angle}deg) skewY(-${
                    90 - 360 / rewards.length
                  }deg)`,
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%)",
                }}
              >
                <span
                  className="text-center"
                  style={{
                    transform: `rotate(${90 - 360 / rewards.length / 2}deg)`,
                    display: "block",
                    width: "80px",
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-600"></div>
      </div>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className={`px-6 py-3 rounded-lg text-white font-semibold ${
          spinning
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>

      {reward && reward.value > 0 && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 font-semibold rounded-lg shadow-md">
          🎉 You earned: {reward.label}!
        </div>
      )}
    </div>
  );
}
