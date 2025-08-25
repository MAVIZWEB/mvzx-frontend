 import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

interface GameWheelProps {
  userId: string; // authenticated user ID
  freeSpins: number; // tracks free spins
  onReward?: (reward: string) => void; // optional callback to update balance in parent
}

const sectors = [
  { label: "1 MVZx", color: "#f87171" },
  { label: "3 MVZx", color: "#fbbf24" },
  { label: "Try Again", color: "#34d399" },
  { label: "5 MVZx", color: "#60a5fa" },
  { label: "7 MVZx", color: "#a78bfa" },
];

export default function GameWheel({ userId, freeSpins, onReward }: GameWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState<string | null>(null);
  const [remainingSpins, setRemainingSpins] = useState(freeSpins || 3);
  const [audio] = useState(new Audio("/sounds/clap.mp3"));

  useEffect(() => {
    audio.load();
  }, [audio]);

  const spinWheel = async () => {
    if (!userId) {
      alert("Please login/signup to play!");
      return;
    }

    if (spinning) return;

    if (remainingSpins <= 0) {
      alert("You have no free spins left. Buy MVZx to continue playing!");
      return;
    }

    setSpinning(true);
    setReward(null);

    try {
      // Call backend spin endpoint
      const res = await axios.post("https://your-backend-domain.com/games/spin", { userId });

      // backend returns sector index (0-4)
      const rewardIndex: number = res.data.index ?? Math.floor(Math.random() * sectors.length);

      const spins = 8; // full rotations
      const sectorAngle = 360 / sectors.length;
      const randomOffset = Math.random() * sectorAngle;

      const finalAngle = spins * 360 + rewardIndex * sectorAngle + randomOffset;

      if (wheelRef.current) {
        wheelRef.current.style.transition = "transform 5s cubic-bezier(0.33, 1, 0.68, 1)";
        wheelRef.current.style.transform = `rotate(${finalAngle}deg)`;
      }

      // wait for spin animation
      setTimeout(() => {
        setSpinning(false);
        const sectorReward = sectors[rewardIndex].label;
        setReward(sectorReward);

        // play sound if MVZx reward
        if (sectorReward !== "Try Again") audio.play();

        // update remaining spins
        setRemainingSpins((prev) => prev - 1);

        // callback to parent to update balance
        if (onReward) onReward(sectorReward);
      }, 5200);
    } catch (error) {
      console.error("Spin error:", error);
      setSpinning(false);
      alert("Error spinning wheel. Try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-80 h-80 sm:w-96 sm:h-96">
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-8 border-gray-800 relative"
          style={{
            background: `conic-gradient(${sectors
              .map(
                (s, idx) =>
                  `${s.color} ${(360 / sectors.length) * idx}deg ${(360 / sectors.length) * (idx + 1)}deg`
              )
              .join(",")})`,
          }}
        >
          {/* Labels */}
          {sectors.map((s, idx) => (
            <div
              key={idx}
              className="absolute w-24 text-xs font-bold text-white text-center sm:w-32"
              style={{
                transform: `rotate(${idx * (360 / sectors.length) + (360 / sectors.length) / 2}deg) translate(0, -100px)`,
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
        {spinning ? "Spinning..." : `Spin (${remainingSpins} free left)`}
      </button>

      {reward && (
        <p className={`text-xl font-semibold mt-4 ${reward === "Try Again" ? "text-red-500" : "text-yellow-400"}`}>
          {reward === "Try Again" ? "Try Again!" : `You won: ${reward}`}
        </p>
      )}
    </div>
  );
}
