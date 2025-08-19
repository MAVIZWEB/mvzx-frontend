 import React, { useState } from "react";

const prizes = [
  { label: "10 MVZx", value: 10 },
  { label: "20 MVZx", value: 20 },
  { label: "50 MVZx", value: 50 },
  { label: "100 MVZx", value: 100 },
  { label: "200 MVZx", value: 200 },
  { label: "500 MVZx", value: 500 },
];

// Mock API call for spin reward
async function fetchSpinReward() {
  const prizeIndex = Math.floor(Math.random() * prizes.length);
  return { amount: prizes[prizeIndex].value };
}

const PrizeWheel: React.FC<{ onWin?: (amount: number) => void }> = ({ onWin }) => {
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [message, setMessage] = useState("");

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    setMessage("");

    try {
      const res = await fetchSpinReward();
      const wonAmount = res.amount || 0;

      const prizeIndex = prizes.findIndex((p) => p.value === wonAmount);
      const sectorAngle = 360 / prizes.length;
      const randomOffset = Math.floor(Math.random() * sectorAngle);
      const targetAngle = 360 * 5 + prizeIndex * sectorAngle + randomOffset;

      setAngle((prev) => prev + targetAngle);

      setTimeout(() => {
        setMessage(`🎉 You won ${wonAmount} MVZx!`);
        onWin?.(wonAmount);
        setSpinning(false);
      }, 5500);
    } catch (err) {
      setMessage("⚠ Spin failed. Try again.");
      setSpinning(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
        <div
          className="w-full h-full bg-gradient-to-tr from-yellow-300 to-red-400 flex items-center justify-center rounded-full text-xl font-bold text-gray-800 transition-transform duration-[5500ms] ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          🎡
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-16 border-b-red-600"></div>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className={`mt-4 px-6 py-3 font-bold rounded-lg text-white ${
          spinning ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        } transition`}
      >
        {spinning ? "Spinning…" : "Spin & Win MVZx"}
      </button>

      {message && <div className="mt-2 text-center font-semibold">{message}</div>}
    </div>
  );
};

export default PrizeWheel;
