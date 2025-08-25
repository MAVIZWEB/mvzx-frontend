 import React, { useEffect, useMemo, useRef, useState } from "react"; import { Link, useNavigate } from "react-router-dom"; import { Menu, User, Wallet, Trophy, Crown, Sparkles, Coins, Gift, Cpu, Handshake, Vote, Building, Volume2, VolumeX } from "lucide-react"; import { api, loadAuth, isAuthenticated } from "../services/api"; import Button from "../components/UI/Button"; import Card from "../components/UI/Card"; import Badge from "../components/UI/Badge"; import AuthModal from "../components/AuthModal";

function LeaderboardGlass() { const [rows, setRows] = useState([]);

useEffect(() => { let mounted = true; (async () => { try { const res = await api.getLeaderboard?.(); if (mounted && Array.isArray(res?.items)) { setRows(res.items.slice(0, 6).map(r => ({ user: String(r.user ?? "User"), prize: String(r.prize ?? "—"), ts: String(r.ts ?? ""), }))); } } catch {} })(); return () => { mounted = false; }; }, []);

return ( <Card className="bg-white/6 backdrop-blur-md border-white/10 p-3"> <div className="flex items-center gap-2 mb-2"> <Trophy className="w-4 h-4" /> <p className="text-xs font-semibold tracking-wide">Recent Wins</p> </div> <div className="max-h-20 overflow-auto pr-1"> {rows.map((r, i) => ( <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-b-0"> <span className="truncate">{r.user}</span> <span className="font-semibold">{r.prize}</span> <span className="text-[11px] opacity-80">{r.ts}</span> </div> ))} </div> </Card> ); }

export default function LandingPage() { const navigate = useNavigate(); const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); const [userLoggedIn, setUserLoggedIn] = useState(isAuthenticated()); const [badge, setBadge] = useState("Bronze"); const [wins, setWins] = useState(0); const [wallet, setWallet] = useState(0);

const [miningActive, setMiningActive] = useState(false); const [minedMs, setMinedMs] = useState(0); const [spinning, setSpinning] = useState(false); const [rotation, setRotation] = useState(0); const [result, setResult] = useState(null); const [freeSpins, setFreeSpins] = useState(() => parseInt(localStorage.getItem("mvzx_free_spins") || "3")); const [muted, setMuted] = useState(false);

const audioRef = useRef(null);

const prizes = useMemo(() => [ { label: "0.125 MVZx", short: "0.125", color: "#fbbf24", isLose: false }, { label: "0.25 MVZx", short: "0.25", color: "#f97316", isLose: false }, { label: "Try Again", short: "Try", color: "#6b7280", isLose: true }, { label: "0.5 MVZx", short: "0.5", color: "#3b82f6", isLose: false }, { label: "0.75 MVZx", short: "0.75", color: "#8b5cf6", isLose: false }, { label: "3 MVZx 🎉", short: "3", color: "#22c55e", isLose: false }, ], []);

useEffect(() => { if(userLoggedIn) loadUserData(); }, [userLoggedIn]);

useEffect(() => { let t, poll; if (miningActive) { const start = Date.now() - minedMs; t = setInterval(() => { setMinedMs(Math.min(180000, Date.now() - start)); }, 50); poll = setInterval(async () => { try { const s = await api.miningStatus?.(); if(s) setMinedMs(Math.min(180000, s.elapsedMs)); } catch {} }, 4000); } return () => { if(t) clearInterval(t); if(poll) clearInterval(poll); }; }, [miningActive]);

const loadUserData = async () => { try { const walletRes = await api.getWallet?.(); const mvzxBalance = walletRes?.balances?.find(b => b.token === "MVZx"); setWallet(mvzxBalance ? parseFloat(mvzxBalance.amount) : 0); const matrixRes = await api.getMatrixStatus?.(); if(matrixRes?.badge) setBadge(matrixRes.badge.name); } catch (e) { console.error(e); } };

const spin = async () => { if(spinning) return; if(!userLoggedIn && freeSpins <= 0){ setResult("Sign up / buy MVZx to continue spinning."); setIsAuthModalOpen(true); return; } setSpinning(true); setResult(null);

let prizeIndex = Math.floor(Math.random()*prizes.length);
try { const res = await api.spin?.(); if(res?.prizeIndex !== undefined) prizeIndex = res.prizeIndex; } catch {}

const seg = 360/prizes.length;
setRotation(rotation + 360*4 + (prizeIndex*seg + seg/2));

setTimeout(()=>{
  const chosen = prizes[prizeIndex];
  setSpinning(false);
  if(!userLoggedIn && freeSpins>0){ setFreeSpins(freeSpins-1); localStorage.setItem("mvzx_free_spins", String(freeSpins-1)); }
  if(chosen.isLose) setResult("Try again! 🎯"); else { setResult(`🎉 You won ${chosen.label}`); playWinSound(); setWins(w=>w+1); loadUserData(); }
}, 4200);

};

const playWinSound = () => { if(muted) return; const el = audioRef.current; if(el){ el.currentTime=0; el.play().catch(()=>{}); } };

const toggleMining = async () => { if(miningActive){ setMiningActive(false); try{await api.stopMining?.()}catch{}; return; } try{await api.startMining?.()}catch{}; setMinedMs(0); setMiningActive(true); };

const wheelSize = 260; const seg = 360/prizes.length;

return ( <div className="min-h-screen w-full text-white flex flex-col" style={{ background: "linear-gradient(135deg, #3a0006 0%, #1a0020 50%, #000524 100%)" }}> {/* Header */} <header className="sticky top-0 z-30 bg-[#FFD700] border-b border-yellow-300 px-4 pt-3"> <div className="flex justify-between items-center"> <img src="https://i.imgur.com/VbxvCK6.jpeg" alt="MAVIZ" className="h-8 w-8 rounded-full ring-2 ring-yellow-400/50" /> <div className="text-center"> <h1 className="text-[15px] font-extrabold tracking-wide text-gray-900">MAVIZ SWAPS</h1> <p className="text-[12px] text-gray-800">Token Swap & Earn</p> </div> <div className="flex gap-3"> <Button onClick={()=>userLoggedIn?navigate('/dashboard'):setIsAuthModalOpen(true)} className="px-3 py-1 text-xs rounded-full bg-purple-700 hover:bg-purple-800 border border-purple-600 text-white"> <User className="w-3.5 h-3.5 mr-1"/>{userLoggedIn?"Dashboard":"Sign Up"} </Button> </div> </div> </header>

{/* Main */}
  <main className="flex-1 px-3 pb-3 overflow-auto">
    {/* Wheel & Spin Section */}
    <Card className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl p-3 mt-3">
      <div className="text-center mb-2"><h2 className="text-sm font-extrabold tracking-wide">INSTANT SPIN & EARN</h2></div>
      <div className="relative flex flex-col items-center mb-3">
        <div className="relative z-20" style={{ width: wheelSize, height: wheelSize }}>
          {/* Wheel stays exactly as your code */}
        </div>
        <div className="mt-2 mb-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[16px] border-transparent border-b-yellow-300 drop-shadow-lg z-10" />
        <div className="flex items-center gap-2">
          <Button onClick={spin} disabled={spinning} className="w-48 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 border-0 text-white font-bold tracking-wide mt-2">{spinning?"Spinning...":"SPIN NOW"}</Button>
          <button onClick={()=>setMuted(!muted)} className="mt-2 p-2 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15">{muted?<VolumeX className="w-5 h-5"/>:<Volume2 className="w-5 h-5"/>}</button>
        </div>
        {result && <div className={`mt-2 p-2 rounded-lg shadow-md ${result.startsWith("🎉")?"bg-gradient-to-r from-green-500 to-emerald-600":"bg-white/10"}`}><div className="text-sm font-semibold text-center text-white">{result}</div></div>}
      </div>

      {/* Feature Buttons */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[
          { to: "/buy", labels: ["MVZx","Buy & Earn"], bg: "#16a34a", icon: Coins },
          { to: "/airdrop", labels: ["Airdrop"], bg: "#db2777", icon: Gift },
          { to: "/mining", labels: ["Mining"], bg: "#ca8a04", icon: Cpu },
          { to: "/directbuy", labels: ["Direct","Deposit"], bg: "#2563eb", icon: Building },
          { to: "/escrow", labels: ["Escrow","P2P Trade"], bg: "#4338ca", icon: Handshake },
          { to: "/voting", labels: ["Voting"], bg: "#15803d", icon: Vote },
        ].map((b,i)=>(
          <Link key={i} to={b.to}><Button className="w-full h-12 flex flex-col justify-center items-center text-[11px] font-semibold leading-tight border border-white/15 hover:brightness-110" style={{backgroundColor:b.bg}}><b.icon className="w-4 h-4 mb-1"/>{b.labels.map((l,j)=><span key={j}>{l}</span>)}</Button></Link>
        ))}
      </div>

      {/* Mining panel */}
      <Card className="mt-4 p-3 bg-white/5 border-white/10">
        <div className="flex justify-center items-center gap-3">
          <Button onClick={toggleMining} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-[12px] ${miningActive?"bg-green-600 hover:bg-green-700":"bg-orange-500 hover:bg-orange-600"}`}>{miningActive?"Stop Mining":"Start Mining"}</Button>
          <span className="font-mono text-xs">{minedMs.toLocaleString()} ms</span>
        </div>
        <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(100,(minedMs/180000)*100)}%` }}/>
        </div>
      </Card>
    </Card>
  </main>

  <footer className="px-4 py-3 text-[11px] text-white/70 text-center">&copy; {new Date().getFullYear()} MAVIZ. All rights reserved.</footer>

  <AuthModal isOpen={isAuthModalOpen} onClose={()=>setIsAuthModalOpen(false)} onSuccess={()=>{ setUserLoggedIn(true); loadUserData(); loadAuth(); }} />
  <audio ref={audioRef} src="/sounds/win.mp3" preload="auto" />
</div>

); }

