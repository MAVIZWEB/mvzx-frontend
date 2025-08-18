import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import Buy from "./Buy";
import Escrow from "./Escrow";
import Mining from "./Mining";
import Signup from "./Signup";
import Game from "./Game";
import NotFound from "./NotFound";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header / Navbar */}
        <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            MAVIZ
          </Link>
          <nav className="space-x-4 text-sm sm:text-base">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/buy" className="hover:underline">Buy</Link>
            <Link to="/escrow" className="hover:underline">Escrow</Link>
            <Link to="/mining" className="hover:underline">Mining</Link>
            <Link to="/game" className="hover:underline">Game</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </nav>
        </header>

        {/* Main Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/escrow" element={<Escrow />} />
            <Route path="/mining" element={<Mining />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t px-4 py-3 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} MAVIZ — Liquidity & Revenue Sharing
        </footer>
      </div>
    </Router>
  );
}
