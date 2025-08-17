import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./assets/logo.png";

// Pages
function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to MAVIZ</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        Your decentralized platform for trading, staking, referrals, and escrow exchange.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="https://t.me/MAVIZq"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Join Community
        </a>
        <Link
          to="/signup"
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700"
        >
          Get Started
        </Link>
        <Link
          to="/escrow"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700"
        >
          Escrow Trade
        </Link>
      </div>
    </main>
  );
}

function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <p className="text-gray-600">Signup form will go here (wallet, pin, email).</p>
      <Link to="/" className="text-blue-600 mt-4 hover:underline">Back Home</Link>
    </div>
  );
}

function Escrow() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h2 className="text-2xl font-bold mb-4">Escrow Trade</h2>
      <p className="text-gray-600">Escrow P2P trading feature coming soon.</p>
      <Link to="/" className="text-blue-600 mt-4 hover:underline">Back Home</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="MAVIZ Logo" className="h-8 w-8" />
            <span className="font-bold text-lg">MAVIZ Platform</span>
          </div>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
            <Link to="/escrow" className="hover:underline">Escrow</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/escrow" element={<Escrow />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-100 text-gray-600 text-center p-4">
          © {new Date().getFullYear()} MAVIZ Platform. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
