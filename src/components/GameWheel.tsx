import { useState } from "react";
import { spinGame } from "../services/api";

interface GameWheelProps {
  userId: string;
}

export default function GameWheel({ userId }: GameWheelProps) {
  const [angle, setAngle] = useState(0);
  const [reward, setReward] = useState<string | null>(null);

  const handleSpin = async () => {
    try {
      const res = await spinGame(userId);
      const sectorIndex = res.data.sector; // Backend returns winning sector index
      const rewardName = res.data.reward;

      // Calculate rotation (360 / total sectors * sectorIndex + 3-4 spins)
      const rotation = 360 * 5 + (sectorIndex * 360) / 8; // assuming 8 sectors
      setAngle(rotation);
      setReward(rewardName);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="relative w-80 h-80">
        <div
          className="w-full h-full rounded-full border-8 border-red-600 transition-transform duration-3000 ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {/* Here you can map sectors visually */}
        </div>
        {/* Pointer */}
        <div className="absolute top-1/2 left-1/2 w-0 h-0 border-l-8 border-r-8 border-b-16 border-b-red-500 transform -translate-x-1/2 -translate-y-full"></div>
      </div>
      <button
        onClick={handleSpin}
        className="mt-6 bg-red-600 hover:bg-red-700 py-3 px-6 rounded font-bold"
      >
        Spin Wheel
      </button>
      {reward && <p className="mt-4 text-white font-semibold">You won: {reward}</p>}
    </div>
  );
}
