import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [spinCount, setSpinCount] = useState(0);

  function handleSpin() {
    alert("Spin triggered! Rewards logic to be implemented.");
    setSpinCount(prev => prev + 1);
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-4 py-6 bg-gray-50">
      
      {/* Header / Logo */}
      <header className="flex items-center justify-center w-full mb-6">
        <img 
          src="https://i.imgur.com/VbxvCK6.jpeg" 
          alt="Maviz Logo" 
          className="h-16 w-auto mr-3"
        />
        <h1 className="text-2xl font-bold">MAVIZ (MVZx)</h1>
      </header>

      {/* Spin & Win Game (60% of screen height) */}
      <section className="w-full max-w-4xl bg-white rounded-xl shadow p-6 mb-6 flex flex-col items-center justify-center" style={{ height: "60vh" }}>
        <h2 className="text-xl font-semibold mb-4">🎡 Spin & Win Game 🎡</h2>
        <div className="flex-1 w-full flex flex-col items-center justify-center bg-gray-100 rounded-lg p-6">
          <p className="text-gray-700 text-center mb-4">
            Spin the wheel and earn rewards! Spins used: {spinCount}
          </p>
          <button
            onClick={handleSpin}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Spin Now
          </button>
        </div>
      </section>

      {/* Feature Buttons (40% of screen height) */}
      <section className="w-full max-w-4xl flex flex-wrap justify-center gap-4" style={{ minHeight: "20vh" }}>
        <Link
          to="/signup"
          className="flex-1 min-w-[140px] py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 text-center"
        >
          Get Started
        </Link>

        <Link
          to="/escrow"
          className="flex-1 min-w-[140px] py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 text-center"
        >
          Escrow Trade
        </Link>

        <Link
          to="/buy"
          className="flex-1 min-w-[140px] py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow hover:bg-yellow-700 text-center"
        >
          Buy (Card / USDT)
        </Link>

        <Link
          to="/mining"
          className="flex-1 min-w-[140px] py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 text-center"
        >
          Free Mining
        </Link>

        <a
          href="https://t.me/MAVIZq"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[140px] py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 text-center"
        >
          Join Community
        </a>
      </section>

      {/* Quick Notes */}
      <section className="mt-8 max-w-2xl text-left">
        <h3 className="font-semibold mb-2">Quick notes</h3>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          <li>MVZx total supply: 100,000,000 — 60,000,000 allocated to public/private sales.</li>
          <li>First stage uses 1.5 USDT (or N2,000) multiples — matrix rules enforced on backend.</li>
          <li>All payments go through platform checkout or manual bank deposit (admin approval).</li>
        </ul>
      </section>
    </main>
  );
}
