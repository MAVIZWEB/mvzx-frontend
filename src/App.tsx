 // src/App.tsx
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import Voting from "./pages/Voting";

// Placeholder pages for now
function Escrow() { return <div className="p-8">Escrow Page (Coming Soon)</div>; }
function Deposit() { return <div className="p-8">Manual Deposit Page (Coming Soon)</div>; }
function Mining() { return <div className="p-8">Mining / Matrix Page (Coming Soon)</div>; }

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600 text-white">
      <h1 className="text-4xl font-bold mb-4 text-center">MAVIZ LIQUIDITY & REVENUE SHARING</h1>
      <p className="mb-8 text-lg text-center px-6">
        Buy • Spin & Earn • Mining • Escrow • Matrix Rewards • Daily Price Voting
      </p>
      <div className="flex gap-4">
        <Link to="/dashboard" className="px-6 py-3 bg-white text-blue-600 rounded-2xl shadow hover:scale-105 transition">Dashboard</Link>
        <Link to="/game" className="px-6 py-3 bg-white text-blue-600 rounded-2xl shadow hover:scale-105 transition">Spin & Earn</Link>
        <Link to="/voting" className="px-6 py-3 bg-white text-blue-600 rounded-2xl shadow hover:scale-105 transition">Price Voting</Link>
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    (isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600")
    + " block px-3 py-2";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <img src="https://i.imgur.com/VbxvCK6.jpeg" className="h-8 w-8 rounded-full" alt="MAVIZ" />
            <span className="text-lg font-bold text-blue-600">MVZx</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/game" className={linkClass}>Spin & Earn</NavLink>
            <NavLink to="/escrow" className={linkClass}>Escrow</NavLink>
            <NavLink to="/deposit" className={linkClass}>Manual Deposit</NavLink>
            <NavLink to="/mining" className={linkClass}>Mining</NavLink>
            <NavLink to="/voting" className={linkClass}>Price Voting</NavLink>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t">
          <div className="px-2 py-2">
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
            <NavLink to="/game" className={linkClass} onClick={() => setOpen(false)}>Spin & Earn</NavLink>
            <NavLink to="/escrow" className={linkClass} onClick={() => setOpen(false)}>Escrow</NavLink>
            <NavLink to="/deposit" className={linkClass} onClick={() => setOpen(false)}>Manual Deposit</NavLink>
            <NavLink to="/mining" className={linkClass} onClick={() => setOpen(false)}>Mining</NavLink>
            <NavLink to="/voting" className={linkClass} onClick={() => setOpen(false)}>Price Voting</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game" element={<Game />} />
        <Route path="/escrow" element={<Escrow />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/mining" element={<Mining />} />
        <Route path="/voting" element={<Voting />} />
      </Routes>
    </Router>
  );
}
