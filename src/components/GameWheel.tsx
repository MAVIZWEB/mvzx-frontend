 import React, { useState } from "react";
import { spinGame } from "../api/user"; // backend POST /games/spin

const sectors = ["1 MVZx", "3 MVZx", "Try Again", "5 MVZx", "7 MVZx"];

export const GameWheel: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState("");

  const handleSpin = async () => {
    const token = localStorage.getItem("mvzx_token");
    if (!token) return alert("Please login first!");

    const spinIndex = Math.floor(Math.random() * sectors.length);
    const newAngle = 3600 + spinIndex * (360 / sectors.length);
    setAngle(newAngle);

    // backend request
    try {
      const res = await spinGame(token);
      setResult(sectors[spinIndex]);
      if (sectors[spinIndex] !== "Try Again") new Audio("/clap.mp3").play();
    } catch (err) {
      console.error(err);
      alert("Error spinning. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="relative w-64 h-64 border-4 border-yellow-500 rounded-full">
        <div
          className="absolute w-full h-full transition-transform duration-3000 ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {sectors.map((sec, idx) => (
            <div
              key={idx}
              className="absolute w-1/2 h-1/2 origin-bottom-left bg-gradient-to-r from-red-500 to-yellow-500 text-white flex items-center justify-center"
              style={{
                transform: `rotate(${(360 / sectors.length) * idx}deg)`,
                transformOrigin: "100% 100%",
              }}
            >
              {sec}
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-12 bg-red-600"></div>
      </div>
      <button
        onClick={handleSpin}
        className="mt-4 px-6 py-2 bg-yellow-500 text-gray-900 font-bold rounded"
      >
        Spin
      </button>
      {result && <p className="mt-2 text-xl font-bold">{result}</p>}
    </div>
  );
};
