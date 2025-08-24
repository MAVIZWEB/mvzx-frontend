 import React, { useEffect, useRef, useState } from "react";

const SECTORS = [
  { label: "Reward 1", color: "bg-pink-400" },
  { label: "Reward 2", color: "bg-blue-400" },
  { label: "Reward 3", color: "bg-green-400" },
  { label: "Reward 4", color: "bg-yellow-400" },
  { label: "Reward 5", color: "bg-purple-400" },
  { label: "Reward 6", color: "bg-red-400" },
];

const LandingPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 400;
    canvas.width = size;
    canvas.height = size;

    const radius = size / 2;
    const sectorAngle = (2 * Math.PI) / SECTORS.length;

    ctx.clearRect(0, 0, size, size);

    // Draw wheel base
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#f5f5f5";
    ctx.fill();

    // Draw divider lines (short, near rim only)
    SECTORS.forEach((_, i) => {
      const start = i * sectorAngle + angle;
      const endX = radius + (radius - 10) * Math.cos(start);
      const endY = radius + (radius - 10) * Math.sin(start);

      const innerX = radius + (radius - 40) * Math.cos(start);
      const innerY = radius + (radius - 40) * Math.sin(start);

      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = "#888";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Stickers
    SECTORS.forEach((sector, i) => {
      const midAngle = i * sectorAngle + sectorAngle / 2 + angle;
      const stickerRadius = radius - 80;

      const x = radius + stickerRadius * Math.cos(midAngle);
      const y = radius + stickerRadius * Math.sin(midAngle);

      ctx.beginPath();
      ctx.arc(x, y, 30, 0, 2 * Math.PI);
      ctx.fillStyle = sector.color.replace("bg-", "");
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sector.label, x, y);
    });
  }, [angle]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header
        className="w-full text-center py-6 text-white font-bold text-2xl"
        style={{ backgroundColor: "#e60000" }} // UBA red
      >
        🎯 MVZx Rewards Wheel
      </header>

      {/* Wheel */}
      <div className="mt-10">
        <canvas ref={canvasRef} className="rounded-full shadow-xl" />
      </div>
    </div>
  );
};

export default LandingPage;
