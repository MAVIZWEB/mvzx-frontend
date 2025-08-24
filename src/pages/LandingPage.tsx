 import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu, User, Wallet, Trophy, Crown, Sparkles,
  Coins, Gift, Cpu, Handshake, Vote, Building,
  Volume2, VolumeX
} from "lucide-react";
import { api, loadAuth, isAuthenticated } from "../services/api";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import AuthModal from "../components/AuthModal";

/* ----------------------------- Leaderboard ----------------------------- */
function LeaderboardGlass() {
  const [rows, setRows] = useState<{ user: string; prize: string; ts: string }[]>([
    { user: "Edu", prize: "20 MVZx", ts: "2m ago" },
    { user: "Isa", prize: "10 MVZx", ts: "5m ago" },
    { user: "Ike", prize: "50 MVZx", ts: "12m ago" },
    { user: "Ayo", prize: "5 MVZx", ts: "18m ago" },
  ]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.getLeaderboard?.();
        if (mounted && Array.isArray(res?.items)) {
          setRows(
            res.items.slice(0, 6).map((r: any) => ({
              user: String(r.user ?? "User"),
              prize: String(r.prize ?? "—"),
              ts: String(r.ts ?? ""),
            }))
          );
        }
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <Card className="bg-white/6 backdrop-blur-md border-white/10 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="w-4 h-4" />
        <p className="text-xs font-semibold tracking-wide">Recent Wins</p>
      </div>
      <div className="max-h-20 overflow-auto pr-1">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-b-0">
            <span className="truncate">{r.user}</span>
            <span className="font-semibold">{r.prize}</span>
            <span className="text-[11px] opacity-80">{r.ts}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* --------------------------------- Page -------------------------------- */
export default function LandingPage() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(isAuthenticated());
  const [badge, setBadge] = useState("Bronze");
  const [wins, setWins] = useState(0);
  const [wallet, setWallet] = useState(0);

  // Mining
  const [miningActive, setMiningActive] = useState(false);
  const [minedMs, setMinedMs] = useState(0);

  // Spin
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  // Free spins
  const [freeSpins, setFreeSpins] = useState<number>(() => {
    const s = localStorage.getItem("mvzx_free_spins");
    return s ? Math.max(0, parseInt(s)) : 3;
  });
  const [demoWarning, setDemoWarning] = useState(!userLoggedIn);

  // Sound
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  // Prize map
  const prizes = useMemo(
    () => [
      { label: "0.125 MVZx", short: "0.125", color: "#fbbf24", isLose: true }, // Yellow
      { label: "0.25 MVZx",  short: "0.25",  color: "#f97316", isLose: true }, // Orange
      { label: "Try Again",  short: "Try",   color: "#6b7280", isLose: false  }, // Gray
      { label: "0.5 MVZx",   short: "0.5",   color: "#3b82f6", isLose: true }, // Blue
      { label: "0.75 MVZx",  short: "0.75",  color: "#8b5cf6", isLose: true }, // Purple
      { label: "3 MVZx 🎉",  short: "3",     color: "#22c55e", isLose: true }, // Green
    ],
    []
  );

  useEffect(() => { if (userLoggedIn) loadUserData(); }, [userLoggedIn]);

  // Mining ticker
  useEffect(() => {
    let t: any, poll: any;
    if (miningActive) {
      const start = Date.now() - minedMs;
      t = setInterval(() => {
        const next = Date.now() - start;
        setMinedMs(next >= 180000 ? 180000 : next);
      }, 50);
      poll = setInterval(async () => {
        try {
          const s = await api.miningStatus?.();
          if (s && typeof s.elapsedMs === "number") {
            setMinedMs(Math.min(180000, s.elapsedMs));
          }
        } catch {}
      }, 4000);
    }
    return () => { if (t) clearInterval(t); if (poll) clearInterval(poll); };
  }, [miningActive]);

  const loadUserData = async () => {
    try {
      const [walletRes, matrixRes] = await Promise.all([
        api.getWallet?.().catch(() => ({ balances: [] })),
        api.getMatrixStatus?.().catch(() => null),
      ]);
      const mvzxBalance = walletRes?.balances?.find((b: any) => b.token === "MVZx");
      setWallet(mvzxBalance ? parseFloat(mvzxBalance.amount) : 0);
      if (matrixRes?.badge) setBadge(matrixRes.badge.name);
    } catch (e) { console.error(e); }
  };

  /* --------------------------- Wheel rendering -------------------------- */
  const seg = 360 / prizes.length;
  const band = seg / 3;
  const half = band / 2;
  const wheelSize = 240;
  const labelRadius = Math.round(wheelSize * 0.38);

  const stripeGradient = useMemo(() => {
    const parts: string[] = [];
    for (let i = 0; i < prizes.length; i++) {
      const center = i * seg + seg / 2;
      const start = center - half;
      const end = center + half;
      const sBound = i * seg;
      const eBound = (i + 1) * seg;
      parts.push(
        `transparent ${sBound}deg ${start}deg`,
        `${prizes[i].color} ${start}deg ${end}deg`,
        `transparent ${end}deg ${eBound}deg`
      );
    }
    return `conic-gradient(${parts.join(", ")})`;
  }, [prizes, seg, half]);

  const separatorGradient = useMemo(() => {
    const thin = 0.8;
    const parts: string[] = [];
    for (let i = 0; i < prizes.length; i++) {
      const x = i * seg;
      parts.push(
        `rgba(255,255,255,0.12) ${x}deg ${x + thin}deg`,
        `transparent ${x + thin}deg ${(i + 1) * seg}deg`
      );
    }
    return `conic-gradient(${parts.join(", ")})`;
  }, [prizes, seg]);

  const baseRadial = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 45%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.35) 100%)`;
  const wheelBackground = `${stripeGradient}, ${separatorGradient}, ${baseRadial}`;

  const sectorLabels = useMemo(
    () => prizes.map((_p, i) => {
      const angle = i * seg + seg / 2;
      return {
        angle,
        style: {
          transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${labelRadius}px) rotate(${-angle}deg)`,
        } as React.CSSProperties,
      };
    }),
    [prizes, seg, labelRadius]
  );

  /* --------------------------------- Sound ------------------------------ */
  const playWinSound = () => {
    if (muted) return;
    const el = audioRef.current;
    if (el) {
      el.currentTime = 0;
      el.play().catch(() => {});
    }
  };

  /* ---------------------------------- Spin ------------------------------ */
  const setFreeSpinsSafe = (n: number) => {
    localStorage.setItem("mvzx_free_spins", String(n));
    setFreeSpins(n);
  };

  const spin = async () => {
    if (spinning) return;
    if (!userLoggedIn && freeSpins <= 0) {
      setResult("Sign up / buy MVZx to continue spinning.");
      setIsAuthModalOpen(true);
      return;
    }
    setSpinning(true);
    setResult(null);

    let prizeIndex = Math.floor(Math.random() * prizes.length);
    try {
      const res = await api.spin?.();
      if (typeof res?.prizeIndex === "number") {
        prizeIndex = Math.max(0, Math.min(prizes.length - 1, res.prizeIndex));
      }
    } catch {}

    const stopAt = rotation + 360 * 4 + (prizeIndex * seg + seg / 2);
    setRotation(stopAt);

    window.setTimeout(() => {
      const chosen = prizes[prizeIndex];
      setSpinning(false);
      if (!userLoggedIn && freeSpins > 0) setFreeSpinsSafe(freeSpins - 1);

      if (chosen.isLose) {
        setResult("Try again! 🎯"); // silent
      } else {
        setResult(`🎉 You won ${chosen.label}`);
        playWinSound();
        setWins((w) => w + 1);
        loadUserData();
      }
    }, 4200);
  };

  /* -------------------------------- Mining ------------------------------ */
  const toggleMining = async () => {
    if (miningActive) {
      setMiningActive(false);
      try { await api.stopMining?.(); } catch {}
      return;
    }
    try { await api.startMining?.(); } catch {}
    setMinedMs(0);
    setMiningActive(true);
  };

  return (
    <div className="min-h-screen w-full text-white flex flex-col" style={{ background: "linear-gradient(135deg, #3a0006 0%, #1a0020 50%, #000524 100%)" }}>
      {/* header ... unchanged ... */}

      {/* Main */}
      <main className="flex-1 px-3 pb-3 overflow-auto">
        <Card className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl p-3 mt-3">

          {/* Wheel */}
          <div className="relative flex flex-col items-center mb-3">
            <div className="relative z-20" style={{ width: wheelSize, height: wheelSize }}>
              <div
                className="absolute inset-0 rounded-full border-2 border-white/20"
                style={{
                  background: wheelBackground,
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? "transform 4.2s cubic-bezier(0.33, 1, 0.68, 1)" : "none",
                }}
              >
                {prizes.map((p, i) => (
                  <div key={i} className="absolute left-1/2 top-1/2" style={sectorLabels[i].style}>
                    <div
                      className="px-2 py-1 rounded-md text-[11px] font-extrabold tracking-wide"
                      style={{
                        background: "transparent",
                        color: "#fff",
                        minWidth: 58,
                        textAlign: "center",
                      }}
                    >
                      {p.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* pointer, controls, etc... */}
          </div>
        </Card>
      </main>

      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg" preload="auto" />
    </div>
  );
}
