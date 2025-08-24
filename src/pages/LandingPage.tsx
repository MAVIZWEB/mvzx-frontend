 And restore the winning sound

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

// Free spins (demo)
const [freeSpins, setFreeSpins] = useState<number>(() => {
const s = localStorage.getItem("mvzx_free_spins");
return s ? Math.max(0, parseInt(s)) : 3;
});
const [demoWarning, setDemoWarning] = useState(!userLoggedIn);

// Sound
const audioRef = useRef<HTMLAudioElement>(null);
const [muted, setMuted] = useState(false);

// Prize map — exact colors per your spec:
// Gray = Try Again, Yellow = 0.125, Orange = 0.25, Blue = 0.5, Purple = 0.75, Green = 3
const prizes = useMemo(
() => [
{ label: "0.125 MVZx", short: "0.125", color: "#fbbf24", isLose: false }, // yellow
{ label: "0.25 MVZx",  short: "0.25",  color: "#f97316", isLose: false }, // orange
{ label: "Try Again",  short: "Try",   color: "#6b7280", isLose: true  }, // gray  (sector #3)
{ label: "0.5 MVZx",   short: "0.5",   color: "#3b82f6", isLose: false }, // blue
{ label: "0.75 MVZx",  short: "0.75",  color: "#8b5cf6", isLose: false }, // purple
{ label: "3 MVZx 🎉",  short: "3",     color: "#22c55e", isLose: false }, // green
],
[]
);

useEffect(() => { if (userLoggedIn) loadUserData(); }, [userLoggedIn]);

// Mining ticker + optional backend sync
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
const band = seg / 3;        // keep only the central third colored
const half = band / 2;
const wheelSize = Math.min(260, Math.max(210, Math.floor((typeof window !== "undefined" ? window.innerHeight : 720) * 0.33)));
const labelRadius = Math.round(wheelSize * 0.38); // place labels near rim (px to avoid clustering)

// central color stripes only (transparent left/right 2/3 of each sector)
const stripeGradient = useMemo(() => {
const parts: string[] = [];
for (let i = 0; i < prizes.length; i++) {
const center = i * seg + seg / 2;
const start = center - half;
const end = center + half;
const sBound = i * seg;
const eBound = (i + 1) * seg;
parts.push(
transparent ${sBound}deg ${start}deg,
${prizes[i].color} ${start}deg ${end}deg,
transparent ${end}deg ${eBound}deg
);
}
return conic-gradient(${parts.join(", ")});
}, [prizes, seg, half]);

// faint sector separators
const separatorGradient = useMemo(() => {
const thin = 0.8; // degrees
const parts: string[] = [];
for (let i = 0; i < prizes.length; i++) {
const x = i * seg;
parts.push(
rgba(255,255,255,0.12) ${x}deg ${x + thin}deg,
transparent ${x + thin}deg ${(i + 1) * seg}deg
);
}
return conic-gradient(${parts.join(", ")});
}, [prizes, seg]);

const baseRadial = radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 45%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.35) 100%);

const wheelBackground = ${stripeGradient}, ${separatorGradient}, ${baseRadial};

// Precompute label transforms (absolute pixels, not percentage)
const sectorLabels = useMemo(
() => prizes.map((_p, i) => {
const angle = i * seg + seg / 2;
return {
angle,
style: {
transform: translate(-50%, -50%) rotate(${angle}deg) translateX(${labelRadius}px) rotate(${-angle}deg),
} as React.CSSProperties,
};
}),
[prizes, seg, labelRadius]
);

/* --------------------------------- Sound ------------------------------ */
const beepFallback = () => {
try {
const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
const ctx = new Ctx();
const o = ctx.createOscillator();
const g = ctx.createGain();
o.type = "triangle"; o.frequency.value = 880;
o.connect(g); g.connect(ctx.destination);
const t = ctx.currentTime;
g.gain.setValueAtTime(0.001, t);
g.gain.exponentialRampToValueAtTime(0.2, t + 0.01);
g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
o.start(); o.stop(t + 0.32);
} catch {}
};

const playWinSound = () => {
if (muted) return;
const el = audioRef.current;
if (el) {
try {
el.currentTime = 0;
el.play().catch(beepFallback);
} catch { beepFallback(); }
} else { beepFallback(); }
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
  } else if (typeof res?.amount === "number") {  
    const map: Record<string, number> = { "0.125": 0, "0.25": 1, "0.5": 3, "0.75": 4, "3": 5 };  
    const key = String(res.amount);  
    if (key in map) prizeIndex = map[key];  
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
{/* Header */}
<header className="sticky top-0 z-30 bg-[#FFD700] border-b border-yellow-300">
<div className="flex items-center justify-between px-4 pt-3">
<div className="flex items-center gap-2">
<img src="https://i.imgur.com/VbxvCK6.jpeg" alt="MAVIZ" className="h-8 w-8 rounded-full ring-2 ring-yellow-400/50" />
</div>
<div className="text-center leading-tight">
<h1 className="text-[15px] font-extrabold tracking-wide text-gray-900">MAVIZ SWAPS</h1>
<p className="text-[12px] text-gray-800">Token Swap & Earn</p>
</div>
<div className="flex items-center gap-3">
<Button
onClick={() => (userLoggedIn ? navigate("/dashboard") : setIsAuthModalOpen(true))}
className="px-3 py-1 text-xs rounded-full bg-purple-700 hover:bg-purple-800 border border-purple-600 text-white"
>
<User className="w-3.5 h-3.5 mr-1" />
{userLoggedIn ? "Dashboard" : "Sign Up"}
</Button>
<Button
onClick={() => (userLoggedIn ? navigate("/dashboard") : setIsAuthModalOpen(true))}
className="px-2.5 py-1 rounded-full bg-purple-700 hover:bg-purple-800 border border-purple-600"
>
<Menu className="w-4 h-4 text-white" />
</Button>
</div>
</div>
<div className="px-4 pb-2 pt-1">
<p className="text-[12px] text-gray-800">MAVIZ – P2P Escrow Swap, Games, Airdrop, Mining, Unlock Affiliate Rewards in USDT, Spin & Earn, Voting & more</p>
{!userLoggedIn && <p className="text-[12px] text-orange-800 font-semibold mt-1">⚠️ Demo mode: 3 free spins</p>}
</div>
</header>

{/* Main */}  
  <main className="flex-1 px-3 pb-3 overflow-auto">  
    <Card className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl p-3 mt-3">  
      <div className="text-center mb-2">  
        <h2 className="text-sm font-extrabold tracking-wide">INSTANT SPIN &amp; EARN</h2>  
      </div>  

      {/* Status */}  
      <Card className="flex items-center justify-between gap-2 rounded-full px-3 py-2 bg-white/10 border border-white/15 mb-2">  
        <div className="flex items-center gap-1.5">  
          <Crown className="w-3.5 h-3.5 opacity-90" />  
          <Badge>{badge}</Badge>  
        </div>  
        <div className="text-[12px]">Wins: <span className="font-semibold">{wins}</span></div>  
        <div className="flex items-center gap-1 text-[12px]">  
          <Wallet className="w-3.5 h-3.5 opacity-90" />  
          <span>{wallet.toFixed(2)} MVZx</span>  
        </div>  
      </Card>  

      {/* Wheel */}  
      <div className="relative flex flex-col items-center mb-3">  
        <div className="absolute inset-x-3 -top-2 z-10"><LeaderboardGlass /></div>  
        <div className="h-16" />  
        <div className="relative z-20" style={{ width: wheelSize, height: wheelSize }}>  
          <div  
            className="absolute inset-0 rounded-full border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]"  
            style={{  
              background: wheelBackground,  
              transform: `rotate(${rotation}deg)`,  
              transition: spinning ? "transform 4.2s cubic-bezier(0.33, 1, 0.68, 1)" : "none",  
            }}  
          >  
            {/* Labels (absolute px so they don't bunch up) */}  
            {prizes.map((p, i) => (  
              <div  
                key={i}  
                className="absolute left-1/2 top-1/2"  
                style={sectorLabels[i].style}  
              >  
                <div  
                  className="px-2 py-1 rounded-md text-[11px] font-extrabold tracking-wide shadow-sm"  
                  style={{  
                    background: "rgba(0,0,0,0.35)",  
                    border: "1px solid rgba(255,255,255,0.25)",  
                    color: "#fff",  
                    minWidth: 58,  
                    textAlign: "center",  
                    whiteSpace: "nowrap",  
                  }}  
                >  
                  {p.label}  
                </div>  
              </div>  
            ))}  
          </div>  

          {/* Center */}  
          <div className="absolute inset-0 flex items-center justify-center">  
            <div className="w-1/3 h-1/3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 border-2 border-white/30 shadow-lg flex items-center justify-center">  
              <Sparkles className="w-1/2 h-1/2 text-white" />  
            </div>  
          </div>  
        </div>  

        {/* Pointer */}  
        <div className="mt-2 mb-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[16px] border-transparent border-b-yellow-300 drop-shadow-lg z-10" />  

        {/* Spin & Sound */}  
        <div className="flex items-center gap-2">  
          <Button  
            onClick={spin}  
            disabled={spinning}  
            className="w-48 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 border-0 text-white font-bold tracking-wide mt-2"  
          >  
            {spinning ? "Spinning..." : "SPIN NOW"}  
          </Button>  
          <button  
            onClick={() => setMuted((m) => !m)}  
            className="mt-2 p-2 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15"  
            aria-label={muted ? "Unmute" : "Mute"}  
          >  
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}  
          </button>  
        </div>  

        {/* Free spins */}  
        {!userLoggedIn && (  
          <div className="mt-1 text-xs opacity-90">  
            Free spins left: <span className="font-bold">{freeSpins}</span>  
          </div>  
        )}  

        {/* Result */}  
        {result && (  
          <div className={`mt-2 p-2 rounded-lg shadow-md ${result.startsWith("🎉") ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-white/10"}`}>  
            <div className="text-sm font-semibold text-center text-white">{result}</div>  
          </div>  
        )}  
      </div>  

      {/* Feature Buttons */}  
      <div className="grid grid-cols-3 gap-2 mt-3">  
        {[  
          { to: "/buy", labels: ["MVZx", "Buy & Earn"], bg: "#16a34a", icon: Coins },  
          { to: "/airdrop", labels: ["Airdrop"], bg: "#db2777", icon: Gift },  
          { to: "/mining", labels: ["Mining"], bg: "#ca8a04", icon: Cpu },  
          { to: "/directbuy", labels: ["Direct", "Deposit"], bg: "#2563eb", icon: Building },  
          { to: "/escrow", labels: ["Escrow", "P2P Trade"], bg: "#4338ca", icon: Handshake },  
          { to: "/voting", labels: ["Voting"], bg: "#15803d", icon: Vote },  
        ].map((b, i) => (  
          <Link key={i} to={b.to}>  
            <Button className="w-full h-12 flex flex-col justify-center items-center text-[11px] font-semibold leading-tight border border-white/15 hover:brightness-110" style={{ backgroundColor: b.bg }}>  
              <b.icon className="w-4 h-4 mb-1" />  
              {b.labels.map((l, j) => <span key={j}>{l}</span>)}  
            </Button>  
          </Link>  
        ))}  
      </div>  

      {/* Mining panel */}  
      <Card className="mt-4 p-3 bg-white/5 border-white/10">  
        <div className="flex justify-center items-center gap-3">  
          <Button  
            onClick={toggleMining}  
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-[12px] ${  
              miningActive ? "bg-green-600 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-600"  
            }`}  
          >  
            {miningActive ? "Stop Mining" : "Start Mining"}  
          </Button>  
          <span className="font-mono text-xs">{minedMs.toLocaleString()} ms</span>  
        </div>  
        <div className="mt-2 w-full bg-gray-700 rounded-full h-2">  
          <div  
            className="bg-green-500 h-2 rounded-full transition-all duration-300"  
            style={{ width: `${Math.min(100, (minedMs / 180000) * 100)}%` }}  
          />  
        </div>  
      </Card>  
    </Card>  
  </main>  

  {/* Footer */}  
  <footer className="px-4 py-3 text-[11px] text-white/70 text-center">  
    &copy; {new Date().getFullYear()} MAVIZ. All rights reserved.  
  </footer>  

  {/* Auth Modal */}  
  <AuthModal  
    isOpen={isAuthModalOpen}  
    onClose={() => setIsAuthModalOpen(false)}  
    onSuccess={() => {  
      setUserLoggedIn(true);  
      setDemoWarning(false);  
      loadUserData();  
      try { loadAuth(); } catch {}  
    }}  
  />  

  {/* Win SFX (place file at /public/sounds/win.mp3) */}  
  <audio ref={audioRef} src="/sounds/win.mp3" preload="auto" />  
</div>

);
}

