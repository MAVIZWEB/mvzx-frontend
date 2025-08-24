 import React, { useEffect, useRef, useState } from "react";

const prizes = [
  "Reward 1",
  "Reward 2",
  "Reward 3",
  "Reward 4",
  "Reward 5",
  "Reward 6",
];

const LandingPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [angle] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 300; // ✅ keep same wheel size you gave originally
    canvas.width = size;
    canvas.height = size;

    const radius = size / 2;
    const sectorAngle = (2 * Math.PI) / prizes.length;

    ctx.clearRect(0, 0, size, size);

    // Draw wheel circle
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#f5f5f5";
    ctx.fill();

    // Draw divider lines (short, only at rim)
    prizes.forEach((_, i) => {
      const start = i * sectorAngle + angle;
      const outerX = radius + (radius - 5) * Math.cos(start);
      const outerY = radius + (radius - 5) * Math.sin(start);
      const innerX = radius + (radius - 30) * Math.cos(start);
      const innerY = radius + (radius - 30) * Math.sin(start);

      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(outerX, outerY);
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw stickers inside each sector
    prizes.forEach((label, i) => {
      const midAngle = i * sectorAngle + sectorAngle / 2 + angle;
      const stickerRadius = radius - 70; // distance from center
      const x = radius + stickerRadius * Math.cos(midAngle);
      const y = radius + stickerRadius * Math.sin(midAngle);

      ctx.beginPath();
      ctx.arc(x, y, 25, 0, 2 * Math.PI);
      const colors = ["pink", "skyblue", "lightgreen", "khaki", "violet", "salmon"];
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, x, y);
    });
  }, [angle]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* ✅ Keep your original red header */}
      <header
        className="w-full text-center py-6 text-white font-bold text-2xl"
        style={{ backgroundColor: "#e60000" }}
      >
        🎯 MVZx Rewards Wheel
      </header>

      {/* ✅ Keep the wheel same size */}
      <div className="mt-10">
        <canvas ref={canvasRef} className="rounded-full shadow-xl" />
      </div>

      {/* ✅ Keep all original text + buttons intact */}
      <div className="mt-8 text-center px-4 max-w-xl">
        <p className="text-lg font-semibold mb-4">
          Spin the wheel and win exciting rewards instantly!
        </p>
        <button className="bg-green-600 text-white px-6 py-2 rounded-2xl shadow-md hover:bg-green-700 transition">
          Spin & Claim
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
