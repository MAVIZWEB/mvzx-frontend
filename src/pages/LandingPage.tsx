 /* --- imports remain same --- */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, Wallet, Trophy, Crown, Sparkles, Coins, Gift, Cpu, Handshake, Vote, Building, Volume2, VolumeX } from "lucide-react";
import { api, loadAuth, isAuthenticated } from "../services/api";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import AuthModal from "../components/AuthModal";

/* ----------------------------- Leaderboard ----------------------------- */
function LeaderboardGlass() { /* unchanged */ }

/* --------------------------------- Page -------------------------------- */
export default function LandingPage() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(isAuthenticated());
  const [badge, setBadge] = useState("Bronze");
  const [wins, setWins] = useState(0);
  const [wallet, setWallet] = useState(0);

  // Mining
  const [mining, setMining] = useState(false);
  const [progress, setProgress] = useState(0);
  const miningDuration = 10000;
  const startTimeRef = useRef<number | null>(null);

  // Spin
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLCanvasElement | null>(null);

  // Sound
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  // Wheel prizes
  const prizes = [
    { label: "0.125 MVZx", color: "#FFD700", sound: true },
    { label: "0.25 MVZx", color: "#FFA500", sound: true },
    { label: "0.5 MVZx", color: "#1E90FF", sound: true },
    { label: "0.75 MVZx", color: "#800080", sound: true },
    { label: "3 MVZx", color: "#228B22", sound: true },
    { label: "Try Again", color: "#808080", sound: false }
  ];

  /* ------------------------------- Spin ------------------------------- */
  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const rand = Math.floor(Math.random() * prizes.length);
    const extraRot = 3 * 360;
    const sectorAngle = 360 / prizes.length;
    const targetAngle = rand * sectorAngle + sectorAngle / 2;
    const finalRot = extraRot + (360 - targetAngle);

    setRotation(finalRot);

    setTimeout(() => {
      const prize = prizes[rand];
      setResult(prize.label);
      if (prize.sound && !muted) {
        const el = audioRef.current;
        if (el) {
          el.currentTime = 0;
          el.play().catch(() => {});
        }
      }
      setSpinning(false);
    }, 4500);
  };

  // Draw wheel slices
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
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(p.label, radius - 10, 5);
      ctx.restore();
    });
  }, [rotation]);

  /* ------------------------------- Mining ------------------------------ */
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
    } catch {}
  };

  /* ----------------------------- Layout ----------------------------- */
  return (
    <div className="min-h-screen w-full text-white flex flex-col bg-gradient-to-b from-purple-900 to-black">
      {/* header unchanged ... */}

      <main className="flex-1 px-3 pb-3 overflow-auto">
        <Card className="p-3 mt-3 bg-white/5 border border-white/10 rounded-2xl">
          {/* Wheel + Leaderboard */}
          <div className="flex flex-col items-center mb-3">
            <LeaderboardGlass />

            {/* Wheel */}
            <div className="relative mt-6">
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

            {/* Spin Button + Mute */}
            <div className="flex items-center gap-2 mt-4">
              <Button
                onClick={spin}
                disabled={spinning}
                className="w-48 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold"
              >
                {spinning ? "Spinning..." : "SPIN NOW"}
              </Button>
              <button
                onClick={() => setMuted((m) => !m)}
                className="p-2 rounded-lg bg-white/10 border border-white/15"
              >
                {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-3 text-lg font-semibold">
                🎉 Result: <span className="text-yellow-400">{result}</span>
              </div>
            )}
          </div>

          {/* Mining */}
          <Card className="mt-6 p-3 bg-white/5 border-white/10">
            <div className="flex justify-center items-center gap-3">
              <Button
                onClick={startMining}
                disabled={mining}
                className={`px-4 py-2 rounded-xl font-semibold ${
                  mining ? "bg-green-600" : "bg-gray-700 hover:bg-green-500"
                }`}
              >
                {mining ? "Mining..." : "Start Mining"}
              </Button>
              {mining && (
                <span className="font-mono text-xs text-green-400">
                  {Math.floor((progress / 100) * miningDuration)} ms
                </span>
              )}
            </div>
            <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </Card>
        </Card>
      </main>

      {/* footer & auth modal unchanged ... */}

      <audio ref={audioRef} src="/sounds/win.mp3" preload="auto" />
    </div>
  );
}
