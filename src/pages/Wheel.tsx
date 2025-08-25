import React, { useRef, useState } from "react";
import { api } from "../services/api";

const sectors = ["1", "3", "Try Again", "5", "7"];

const Wheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    try {
      const res = await api.spinWheel();
      const idx = sectors.indexOf(res.prize) >= 0 ? sectors.indexOf(res.prize) : 0;
      const angle = 360 / sectors.length * idx + 360 * 5;
      if (wheelRef.current) wheelRef.current.style.transform = `rotate(${angle}deg)`;
      setTimeout(() => {
        setPrize(res.prize);
        setSpinning(false);
      }, 5000);
    } catch (err) {
      setSpinning(false);
    }
  };

  return (
    <div className="relative w-80 h-80">
      <div ref={wheelRef} className="w-full h-full rounded-full border-8 border-gray-700 flex items-center justify-center transition-transform duration-5000 ease-out">
        {sectors.map((s,i)=>(
          <div key={i} style={{ transform: `rotate(${i*72}deg)` }} className="absolute w-1/2 h-1/2 flex items-center justify-center text-white font-bold text-lg">{s}</div>
        ))}
      </div>
      <button onClick={spin} disabled={spinning} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 py-3 px-6 rounded-full font-bold">
        {spinning ? "Spinning..." : "SPIN"}
      </button>
      {prize && <div className="mt-4 text-center text-xl font-bold">🎉 Prize: {prize} MVZx</div>}
    </div>
  );
};

export default Wheel;
