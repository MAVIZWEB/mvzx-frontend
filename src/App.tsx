  import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Buy from "./pages/Buy";
import DirectBuy from "./pages/DirectBuy";
import Game from "./pages/Game";
import Airdrop from "./pages/Airdrop";
import Mining from "./pages/Mining";
import Escrow from "./pages/Escrow";
import Voting from "./pages/Voting";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#40E0D0" }}>
        {/* Header */}
        <header className="bg-white/90 backdrop-blur sticky top-0 z-20 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://i.imgur.com/VbxvCK6.jpeg" alt="MAVIZ" className="h-8 w-8 rounded-full" />
              <h1 className="font-bold">MAVIZ LIQUIDITY & REVENUE SHARING</h1>
            </div>
            <button className="md:hidden text-2xl">☰</button>
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/buy" className="hover:underline">MVZx Buy & Earn</Link>
              <Link to="/directbuy" className="hover:underline">Direct Transfer Buy</Link>
              <Link to="/airdrop" className="hover:underline">Airdrop</Link>
              <Link to="/mining" className="hover:underline">Mining</Link>
              <Link to="/escrow" className="hover:underline">Escrow P2P Trade</Link>
              <Link to="/voting" className="hover:underline">Voting</Link>
              <Link to="/game" className="hover:underline">Spin & Earn</Link>
              <Link to="/signup" className="hover:underline">Sign Up</Link>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            </nav>
          </div>
        </header>

        {/* Landing */}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <div className="max-w-6xl mx-auto px-4 py-6">
                  {/* Top description */}
                  <section className="bg-white rounded-2xl shadow p-5 mb-6">
                    <h2 className="text-xl font-bold mb-2">MVZx Platform</h2>
                    <p className="text-gray-700">
                      Buy MVZx, earn via 2×5 matrix (Stages 1–10), mine, trade P2P, vote price, and play Spin & Earn.
                      Minimum purchase 1.5 USDT / ₦2000 (multiples create matrix positions).
                    </p>
                  </section>

                  {/* Middle: Game (attraction) */}
                  <section className="mb-6">
                    <Game />
                  </section>

                  {/* Buttons row */}
                  <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link to="/buy">
                      <button className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white">💰 MVZx Buy & Earn</button>
                    </Link>
                    <Link to="/airdrop">
                      <button className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white">🎁 Airdrop</button>
                    </Link>
                    <Link to="/mining">
                      <button className="w-full py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white">⛏️ Mining</button>
                    </Link>
                    <Link to="/escrow">
                      <button className="w-full py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white">🤝 Escrow P2P Trade</button>
                    </Link>
                    <Link to="/voting">
                      <button className="w-full py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white">🗳️ Voting</button>
                    </Link>
                    <Link to="/directbuy">
                      <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white">🏦 Direct Transfer Buy</button>
                    </Link>
                    <Link to="/signup">
                      <button className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white">📝 Sign Up</button>
                    </Link>
                    <Link to="/dashboard">
                      <button className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white">📊 Dashboard</button>
                    </Link>
                  </section>
                </div>
              }
            />
            <Route path="/buy" element={<Buy />} />
            <Route path="/directbuy" element={<DirectBuy />} />
            <Route path="/airdrop" element={<Airdrop />} />
            <Route path="/mining" element={<Mining />} />
            <Route path="/escrow" element={<Escrow />} />
            <Route path="/voting" element={<Voting />} />
            <Route path="/game" element={<Game />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white text-center py-4 text-sm">
          © {new Date().getFullYear()} MAVIZ (MVZx). All rights reserved.
        </footer>
      </div>
    </Router>
  );
}
