import React, { useState, useRef } from "react";

interface WheelProps {
  onWin: (prize: string) => void;
}

const Wheel: React.FC<WheelProps> = ({ onWin }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const prizes = ["10 MVZx", "20 MVZx", "50 MVZx", "100 MVZx", "Try Again", "5 MVZx"];

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const anglePerSlice = 360 / prizes.length;
    const extraSpins = 5;
    const finalRotation =
      360 * extraSpins + (prizes.length - randomIndex) * anglePerSlice;

    setRotation((prev) => prev + finalRotation);

    setTimeout(() => {
      const prize = prizes[randomIndex];
      onWin(prize);

      // Play clap sound
      const audio = new Audio("/sounds/clap.mp3");
      audio.play();

      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Arrow Indicator */}
      <div className="absolute -top-6 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-yellow-400 z-20"></div>

      {/* Wheel */}
      <div
        ref={wheelRef}
        className="w-72 h-72 rounded-full border-8 border-white shadow-xl overflow-hidden transition-transform duration-[4000ms] ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="w-full h-full grid grid-cols-3 grid-rows-2 text-white font-bold text-sm">
          {prizes.map((prize, i) => (
            <div
              key={i}
              className={`flex items-center justify-center bg-red-${(i % 2 === 0) ? "600" : "500"}`}
              style={{ transform: `rotate(${i * (360 / prizes.length)}deg)` }}
            >
              {prize}
            </div>
          ))}
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={spinning}
        className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg font-bold"
      >
        {spinning ? "Spinning..." : "Spin Now"}
      </button>
    </div>
  );
};

export default Wheel;
