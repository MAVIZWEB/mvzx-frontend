 import React, { useState } from "react";

const rewards = [
  { label: "10 MVZx", color: "#4ade80" },   // green
  { label: "20 MVZx", color: "#3b82f6" },   // blue
  { label: "50 MVZx", color: "#facc15" },   // yellow
  { label: "100 MVZx", color: "#f87171" },  // red
  { label: "200 MVZx", color: "#a855f7" },  // purple
  { label: "500 MVZx", color: "#ec4899" },  // pink
  { label: "TRY AGAIN", color: "#6b7280" }, // gray
];

export default function LandingPage() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    const randomIndex = Math.floor(Math.random() * rewards.length);
    const degreesPerSlice = 360 / rewards.length;
    const randomSpin =
      360 * 5 + (360 - randomIndex * degreesPerSlice - degreesPerSlice / 2);

    const finalRotation = rotation + randomSpin;
    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(rewards[randomIndex].label);
    }, 4000);
  };

  const size = 350; // wheel diameter
  const radius = size / 2;
  const center = radius;
  const sliceAngle = (2 * Math.PI) / rewards.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6">
      {/* Hero Header */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        MAVIZ – Spin. Earn. Trade.
      </h1>
      <p className="text-gray-300 mb-6 text-center max-w-xl">
        Buy MVZx and unlock matrix rewards, P2P escrow trading, voting, mining &
        more. Try your luck on the spin wheel and win instant rewards.
      </p>

      {/* Wheel */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4s ease-out" : "none",
          }}
        >
          {/* outer circle */}
          <circle
            cx={center}
            cy={center}
            r={radius - 2}
            fill="none"
            stroke="#444"
            strokeWidth="4"
          />

          {/* Sectors + Stickers */}
          {rewards.map((reward, i) => {
            const angle = i * sliceAngle - Math.PI / 2; // start top
            const textX = center + Math.cos(angle) * (radius - 80);
            const textY = center + Math.sin(angle) * (radius - 80);

            // sector lines
            const lineX = center + Math.cos(angle) * (radius - 2);
            const lineY = center + Math.sin(angle) * (radius - 2);

            return (
              <g key={i}>
                {/* divider line */}
                <line
                  x1={center}
                  y1={center}
                  x2={lineX}
                  y2={lineY}
                  stroke="#666"
                  strokeWidth="2"
                />

                {/* reward background */}
                <rect
                  x={textX - 45}
                  y={textY - 20}
                  width="90"
                  height="40"
                  rx="10"
                  fill={reward.color}
                />

                {/* reward label */}
                <text
                  x={textX}
                  y={textY}
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {reward.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Pointer */}
        <div
          className="absolute top-1/2 -right-6 transform -translate-y-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "20px solid #facc15",
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
          }}
        />
      </div>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={spinning}
        className="mt-6 px-8 py-3 bg-yellow-500 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-400 disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "SPIN NOW"}
      </button>

      {/* Result */}
      {result && (
        <p className="mt-4 text-lg font-semibold text-green-400">
          🎉 You got: {result}
        </p>
      )}

      {/* Footer */}
      <footer className="mt-12 text-gray-400 text-sm text-center max-w-md">
        © {new Date().getFullYear()} MAVIZ LIQUIDITY. All rights reserved.
      </footer>
    </div>
  );
}
