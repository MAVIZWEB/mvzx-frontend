 import React, { useState, useEffect, useRef } from "react";
import Leaderboard from "./Leaderboard";
import { Volume2 } from "lucide-react";

const prizes = ["5 MVZx", "10 MVZx", "15 MVZx", "Try Again", "20 MVZx", "50 MVZx"];

export default function LandingPage() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);

    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;
    const endRotation = rotation + 360 * 3 + (prizeIndex * segmentAngle + segmentAngle / 2);

    setRotation(endRotation);

    setTimeout(() => {
      setResult(prizes[prizeIndex]);
      setSpinning(false);
      if (prizes[prizeIndex] !== "Try Again") {
        audioRef.current?.play(); // play clap sound
      }
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ubaRed text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-ubaRed glass">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        <div className="text-center leading-tight">
          <h1 className="text-xl font-bold tracking-wide">MAVIZ LIQUIDITY</h1>
          <h2 className="text-lg font-semibold">BUY & EARN</h2>
        </div>
        <button className="btn btn-secondary">Sign In</button>
      </header>

      {/* Wheel Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h3 className="text-2xl font-bold mb-2">INSTANT SPIN & EARN</h3>

        {/* Wheel wrapper */}
        <div className="relative wheel-container glass">
          {/* Arrow Indicator */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-transparent border-b-yellow-400"></div>
          </div>

          {/* Wheel */}
          <div
            ref={wheelRef}
            className="w-64 h-64 rounded-full border-4 border-white flex items-center justify-center"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.33, 1, 0.68, 1)" : "none",
              background: `conic-gradient(
                #fff 0deg 60deg,
                #ffcccc 60deg 120deg,
                #fff 120deg 180deg,
                #ffcccc 180deg 240deg,
                #fff 240deg 300deg,
                #ffcccc 300deg 360deg
              )`,
            }}
          >
            <span className="text-lg font-bold text-ubaRed">SPIN</span>
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={spinWheel}
          className="btn btn-primary mt-4"
          disabled={spinning}
        >
          {spinning ? "Spinning..." : "Spin Now"}
        </button>

        {/* Result */}
        {result && (
          <p className="mt-4 text-xl font-bold text-yellow-300">
            🎉 You won: {result}
          </p>
        )}

        {/* Feature Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-sm">
          <button className="btn btn-secondary">Direct Transfer Buy</button>
          <button className="btn btn-secondary">Airdrop</button>
          <button className="btn btn-secondary">Mining</button>
          <button className="btn btn-secondary">Trade</button>
          <button className="btn btn-secondary">Escrow</button>
          <button className="btn btn-secondary">Game</button>
        </div>
      </main>

      {/* Leaderboard Behind Wheel */}
      <section className="glass mt-8 p-4">
        <Leaderboard />
      </section>

      {/* Clap Sound */}
      <audio ref={audioRef} src="/sounds/clap.mp3" preload="auto"></audio>
    </div>
  );
}
