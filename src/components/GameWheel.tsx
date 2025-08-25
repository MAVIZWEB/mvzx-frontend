 import { useState, useEffect, useRef } from "react";
import axios from "axios";

type Sector = "1" | "3" | "Try Again" | "5" | "7";

const sectors: Sector[] = ["1", "3", "Try Again", "5", "7"];

const GameWheel = ({ walletAddress }: { walletAddress: string }) => {
  const [spinsLeft, setSpinsLeft] = useState(3); // 3 free spins
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<Sector | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Sounds
  const winSound = new Audio("/sounds/clap.mp3");
  const trySound = new Audio("/sounds/try.mp3");

  const handleSpin = async () => {
    if (isSpinning) return;
    if (spinsLeft <= 0) {
      alert("No free spins left. Please buy MVZx Tokens to continue.");
      return;
    }

    setIsSpinning(true);

    try {
      // Call backend to spin
      const res = await axios.post("http://localhost:5000/games/spin", {
        walletAddress,
      });

      const spinResult: Sector = res.data.result; // e.g., "1", "Try Again"

      // Animate wheel rotation
      const sectorIndex = sectors.indexOf(spinResult);
      const totalSectors = sectors.length;
      const degreePerSector = 360 / totalSectors;

      const randomRounds = Math.floor(Math.random() * 3 + 3); // 3-5 full spins
      const finalDegree = randomRounds * 360 + sectorIndex * degreePerSector;

      if (wheelRef.current) {
        wheelRef.current.style.transition = "transform 4s ease-out";
        wheelRef.current.style.transform = `rotate(${finalDegree}deg)`;
      }

      // Wait for animation to finish
      setTimeout(() => {
        setResult(spinResult);

        // Play sound
        if (spinResult === "Try Again") {
          trySound.play();
        } else {
          winSound.play();
        }

        setSpinsLeft((prev) => prev - 1);
        setIsSpinning(false);
      }, 4000);
    } catch (err) {
      console.error(err);
      alert("Spin failed. Try again.");
      setIsSpinning(false);
    }
  };

  // Reset wheel for next spin
  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "rotate(0deg)";
    }
  }, [result]);

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="relative w-64 h-64">
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-8 border-gray-700 flex items-center justify-center relative bg-gradient-to-tr from-purple-700 via-purple-900 to-purple-700"
        >
          {/* Sectors */}
          {sectors.map((s, i) => {
            const rotate = (360 / sectors.length) * i;
            return (
              <div
                key={i}
                className="absolute w-1/2 h-1/2 origin-bottom-left flex items-center justify-center"
                style={{ transform: `rotate(${rotate}deg)` }}
              >
                <span className="text-white font-bold">{s}</span>
              </div>
            );
          })}
        </div>
        {/* Pointer */}
        <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-16 border-b-red-600"></div>
      </div>

      <button
        onClick={handleSpin}
        disabled={isSpinning || spinsLeft <= 0}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold disabled:opacity-50"
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>

      <p className="mt-4">
        Spins left: <span className="font-bold">{spinsLeft}</span>
      </p>

      {result && (
        <p className="mt-2 text-lg">
          Last spin result: <span className="font-bold">{result}</span>
        </p>
      )}
    </div>
  );
};

export default GameWheel;
