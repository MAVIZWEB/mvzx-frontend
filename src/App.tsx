import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <header className="w-full p-4 bg-blue-600 text-white flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">MAVIZ Platform</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center w-full p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="w-full p-4 text-center text-sm bg-gray-200">
        © {new Date().getFullYear()} MAVIZ. All rights reserved.
      </footer>
    </div>
  );
}

function Home() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Welcome to MAVIZ</h2>
      <p className="mb-6">Your decentralized platform for trading, staking, and referrals.</p>
      <div className="flex justify-center space-x-4">
        <a
          href="https://t.me/MAVIZq"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Join Community
        </a>
        <a
          href="#get-started"
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">About MAVIZ</h2>
      <p>
        MAVIZ is built to empower users with trading, staking, and referral rewards — 
        designed for sustainability and growth in the crypto ecosystem.
      </p>
    </div>
  );
}

export default App;
