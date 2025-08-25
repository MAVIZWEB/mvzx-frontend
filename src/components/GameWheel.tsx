  import React, { useRef, useState } from "react";
import axios from "axios";

interface GameWheelProps {
  userId: string;
}

const sectors = [
  { label: "10 MVZx", color: "#f87171" },
  { label: "50 MVZx", color: "#fbbf24" },
  { label: "100 MVZx", color: "#34d399" },
  { label: "200 MVZx", color: "#60a5fa" },
  { label: "500 MVZx", color: "#a78bfa" },
  { label: "1000 MVZx", color: "#f472b6" },
];

export default function GameWheel({ userId }: GameWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState<string | null>(null);

  const spinWheel = async () => {
    if (spinning) return;
    setSpinning(true);
    setReward(null);

    try {
      // Call backend spin endpoint
      const res = await axios.post("https://your-backend-domain.com/games/spin", {
        userId,
      });

      const rewardIndex: number = res.data.index; // backend returns sector index
      const spins = 8; // full rotations
      const sectorAngle = 360 / sectors.length;
      const randomOffset = Math.random() * sectorAngle; // random within sector

      const finalAngle = spins * 360 + rewardIndex * sectorAngle + randomOffset;

      if (wheelRef.current) {
        wheelRef.current.style.transition = "transform 5s cubic-bezier(0.33, 1, 0.68, 1)";
        wheelRef.current.style.transform = `rotate(${finalAngle}deg)`;
      }

      // Wait for animation
      setTimeout(() => {
        setSpinning(false);
        setReward(sectors[rewardIndex].label);
      }, 5200);
    } catch (error) {
      console.error("Spin error:", error);
      setSpinning(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-96 h-96">
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-8 border-gray-800 relative"
          style={{
            background: `conic-gradient(${sectors
              .map((s) => `${s.color} ${(360 / sectors.length) * sectors.indexOf(s)}deg ${(360 / sectors.length) * (sectors.indexOf(s) + 1)}deg`)
              .join(",")})`,
          }}
        >
          {/* Labels */}
          {sectors.map((s, idx) => (
            <div
              key={idx}
              className="absolute w-32 text-xs font-bold text-white text-center"
              style={{
                transform: `rotate(${idx * (360 / sectors.length) + 15}deg) translate(0, -130px)`,
                transformOrigin: "50% 100%",
              }}
            >
              {s.label}
            </div>
          ))}
        </div>

        {/* Pointer */}
        <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[30px] border-l-transparent border-r-transparent border-b-red-600 z-10" />
      </div>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-bold disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>

      {reward && <p className="text-xl font-semibold text-yellow-400 mt-4">You won: {reward}</p>}
    </div>
  );
}
