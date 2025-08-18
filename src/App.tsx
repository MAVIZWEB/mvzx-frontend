import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Escrow from "./pages/Escrow";
import Buy from "./pages/Buy";
import Mining from "./pages/Mining";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
          <div className="flex items-center space-x-3">
            <img
              src="https://i.imgur.com/VbxvCK6.jpeg"
              alt="MAVIZ Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <div className="font-bold text-lg">MAVIZ Platform</div>
              <div className="text-xs">MVZx — Liquidity & Revenue Sharing</div>
            </div>
          </div>

          <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
            <Link to="/escrow" className="hover:underline">Escrow</Link>
            <Link to="/buy" className="hover:underline">Buy</Link>
            <Link to="/mining" className="hover:underline">Mining</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/escrow" element={<Escrow />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/mining" element={<Mining />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="bg-gray-100 text-gray-600 text-center p-4">
          © {new Date().getFullYear()} MAVIZ Platform. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}
