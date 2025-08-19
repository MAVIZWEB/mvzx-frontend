import React, { useState } from "react";

type PrizeWheelProps = {
  onRequireSignup?: () => void;
};

const prizes = ["1 MVZx", "2 MVZx", "Try Again", "5 MVZx", "10 MVZx"];

export default function PrizeWheel({ onRequireSignup }: PrizeWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    const user = localStorage.getItem("mvzx_user");
    if (!user) {
      onRequireSignup?.();
      return;
    }

    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const audio = new Audio("https://www.myinstants.com/media/sounds/wheel-spin.mp3");
    audio.play();

    setTimeout(() => {
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      setResult(prize);
      setSpinning(false);

      if (prize !== "Try Again") {
        const savedBalance = localStorage.getItem("mvzx_balance");
        const balance = savedBalance ? parseFloat(savedBalance) : 0;
        const reward = parseFloat(prize.split(" ")[0]);
        localStorage.setItem("mvzx_balance", (balance + reward).toString());
      }
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-48 h-48 rounded-full border-[10px] border-white flex items-center justify-center text-xl font-bold transition-all ${
          spinning ? "animate-spin-slow" : ""
        }`}
        onClick={spin}
      >
        🎡
      </div>
      {result && <p className="mt-3 text-lg">{result}</p>}
    </div>
  );
}
