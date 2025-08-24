 import React, { useState, useRef, useEffect } from "react";

const prizes = [
  { label: "0.125 MVZx", color: "#FFD700", value: 0.125, sound: true }, // yellow
  { label: "0.25 MVZx", color: "#FFA500", value: 0.25, sound: true },  // orange
  { label: "0.5 MVZx", color: "#1E90FF", value: 0.5, sound: true },    // blue
  { label: "0.75 MVZx", color: "#800080", value: 0.75, sound: true },  // purple
  { label: "3 MVZx", color: "#228B22", value: 3, sound: true },        // green
  { label: "Try Again", color: "#808080", value: 0, sound: false }     // gray
];

export default function LandingPage() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const wheelRef = useRef<HTMLCanvasElement | null>(null);

  const [mining, setMining] = useState(false);
  const [progress, setProgress] = useState(0);
  const miningDuration = 10000; // 10 seconds
  const startTimeRef = useRef<number | null>(null);

  // Spin Wheel Function
  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const rand = Math.floor(Math.random() * prizes.length);
    const extraRot = 3 * 360; // 3 full spins
    const sectorAngle = 360 / prizes.length;
    const targetAngle = rand * sectorAngle + sectorAngle / 2;
    const finalRot = extraRot + (360 - targetAngle);

    setRotation(finalRot);

    setTimeout(() => {
      const prize = prizes[rand];
      setResult(prize.label);

      if (prize.sound) {
        const audio = new Audio("/win-sound.mp3");
        audio.play();
      }
      setSpinning(false);
    }, 4500);
  };

  // Draw Wheel
  useEffect(() => {
    const canvas = wheelRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const radius = size / 2;
    const sectorAngle = (2 * Math.PI) / prizes.length;

    ctx.clearRect(0, 0, size, size);

    prizes.forEach((p, i) => {
      const start = i * sectorAngle;
      const end = start + sectorAngle;

      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, start, end);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(start + sectorAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(p.label, radius - 10, 5);
      ctx.restore();
    });
  }, [rotation]);

  // Mining Progress
  useEffect(() => {
    let anim: number;
    if (mining) {
      const step = (time: number) => {
        if (!startTimeRef.current) startTimeRef.current = time;
        const elapsed = time - startTimeRef.current;
        const percent = Math.min((elapsed / miningDuration) * 100, 100);
        setProgress(percent);

        if (percent < 100) {
          anim = requestAnimationFrame(step);
        } else {
          setMining(false);
          startTimeRef.current = null;
        }
      };
      anim = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(anim);
  }, [mining]);

  const startMining = async () => {
    setMining(true);
    setProgress(0);
    try {
      await fetch("/api/mine", { method: "POST" });
    } catch (e) {
      console.error("Mining API error", e);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 text-white bg-gradient-to-b from-purple-900 to-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">MVZx Spin & Mine</h1>

      {/* Wheel */}
      <div className="relative">
        <canvas
          ref={wheelRef}
          width={300}
          height={300}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4.5s ease-out" : "none",
            borderRadius: "50%"
          }}
        />
        {/* Pointer */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderBottom: "30px solid yellow"
          }}
        />
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="mt-6 px-6 py-2 bg-red-500 rounded-xl font-bold hover:bg-red-600 disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "SPIN NOW"}
      </button>

      {result && (
        <div className="mt-4 text-lg font-semibold">
          🎉 Result: <span className="text-yellow-400">{result}</span>
        </div>
      )}

      {/* Mining */}
      <div className="mt-12 w-full max-w-sm">
        <button
          onClick={startMining}
          disabled={mining}
          className={`w-full py-3 rounded-xl font-bold ${
            mining ? "bg-green-600" : "bg-gray-700 hover:bg-green-500"
          }`}
        >
          {mining ? "Mining..." : "Start Mining"}
        </button>
        <div className="w-full bg-gray-800 h-3 rounded mt-2">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
        {mining && (
          <p className="text-sm text-green-400 mt-1">
            Progress: {Math.floor((progress / 100) * miningDuration)} ms
          </p>
        )}
      </div>
    </div>
  );
}
