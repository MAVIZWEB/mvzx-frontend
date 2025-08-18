import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Simple local mining demo:
 * - User must be signed up (localStorage 'mvzx_user')
 * - Mining toggles on/off and runs a 24-hour countdown
 * - No blockchain interaction here (placeholder)
 */

export default function Mining() {
  const [user] = useState(() => {
    const raw = localStorage.getItem("mvzx_user");
    return raw ? JSON.parse(raw) : null;
  });

  const [isMining, setIsMining] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("mvzx_mining_on");
    if (saved === "1") {
      const end = Number(localStorage.getItem("mvzx_mining_end") || "0");
      const now = Date.now();
      if (end > now) {
        setIsMining(true);
        setTimeLeft(Math.max(0, Math.ceil((end - now) / 1000)));
      } else {
        localStorage.removeItem("mvzx_mining_on");
        localStorage.removeItem("mvzx_mining_end");
      }
    }
    let t: any;
    if (isMining && timeLeft != null) {
      t = setInterval(() => {
        setTimeLeft(prev => {
          if (!prev) {
            setIsMining(false);
            localStorage.removeItem("mvzx_mining_on");
            localStorage.removeItem("mvzx_mining_end");
            return null;
          }
          if (prev <= 1) {
            setIsMining(false);
            localStorage.removeItem("mvzx_mining_on");
            localStorage.removeItem("mvzx_mining_end");
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(t);
  }, [isMining, timeLeft]);

  function startMining() {
    if (!user) {
      alert("Please signup first (quick wallet signup).");
      return;
    }
    const end = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("mvzx_mining_on", "1");
    localStorage.setItem("mvzx_mining_end", String(end));
    setIsMining(true);
    setTimeLeft(Math.ceil((end - Date.now()) / 1000));
  }

  function stopMining() {
    localStorage.removeItem("mvzx_mining_on");
    localStorage.removeItem("mvzx_mining_end");
    setIsMining(false);
    setTimeLeft(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-3">Free Mining</h2>
        <p className="text-gray-600 mb-4">
          Free mining runs for 24 hours when started manually. It credits a demo MVZx amount locally (placeholder).
        </p>

        <div className="mb-4">
          {isMining ? (
            <div>
              <div className="text-green-700 font-medium">Mining active</div>
              <div className="text-lg mt-2">
                Time left: {formatSeconds(timeLeft ?? 0)}
              </div>
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={stopMining}>Stop Mining</button>
            </div>
          ) : (
            <button className="bg-yellow-600 text-white px-4 py-2 rounded" onClick={startMining}>Start Free Mining</button>
          )}
        </div>

        <Link to="/" className="text-blue-600 hover:underline">Back Home</Link>
      </div>
    </div>
  );
}

function formatSeconds(s: number) {
  if (!s) return "00:00:00";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}
function pad(n: number) { return String(n).padStart(2, "0"); }
