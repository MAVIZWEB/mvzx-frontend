import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import all pages from src/pages
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Escrow from "./pages/Escrow";
import Mining from "./pages/Mining";
import Game from "./pages/Game";
import ManualDeposit from "./pages/ManualDeposit";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header / Navbar */}
        <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <img
              src="https://i.imgur.com/VbxvCK6.jpeg"
              alt="Maviz Logo"
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl">MAVIZ (MVZx)</span>
          </div>

          {/* Navigation */}
          <nav className="flex gap-4">
            <Link to="/" className="hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/buy" className="hover:text-blue-600 font-medium">
              Buy
            </Link>
            <Link to="/escrow" className="hover:text-blue-600 font-medium">
              Escrow
            </Link>
            <Link to="/mining" className="hover:text-blue-600 font-medium">
              Free Mining
            </Link>
            <Link to="/game" className="hover:text-blue-600 font-medium">
              Spin & Win
            </Link>
            <Link to="/manualdeposit" className="hover:text-blue-600 font-medium">
              Manual Deposit
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/escrow" element={<Escrow />} />
            <Route path="/mining" element={<Mining />} />
            <Route path="/game" element={<Game />} />
            <Route path="/manualdeposit" element={<ManualDeposit />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 text-center py-4 mt-auto">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} MAVIZ (MVZx). All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}
