import React from "react";
import { Link } from "react-router-dom";
import Game from "./Game"; // Import Game component

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start flex-grow min-h-screen px-4 py-6">
      
      {/* Top 60% - Game Interface */}
      <div className="w-full flex justify-center mb-6" style={{ height: "60vh" }}>
        <Game />
      </div>

      {/* Bottom 40% - Buttons and Info */}
      <div className="w-full flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <a
            href="https://t.me/MAVIZq"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Join Community
          </a>

          <Link
            to="/signup"
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Get Started
          </Link>

          <Link
            to="/escrow"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
          >
            Escrow Trade
          </Link>

          <Link
            to="/buy"
            className="px-6 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700"
          >
            Buy (Card / USDT)
          </Link>

          <Link
            to="/mining"
            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
          >
            Free Mining
          </Link>

          <Link
            to="/manual-deposit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
          >
            Manual Deposit
          </Link>
        </div>

        <section className="max-w-2xl text-left">
          <h3 className="font-semibold mb-2">Quick Notes</h3>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            <li>MVZx total supply: 100,000,000 — 60,000,000 allocated to public/private sales.</li>
            <li>First stage uses 1.5 USDT (or N2,000) multiples — matrix rules enforced on backend.</li>
            <li>All payments go through platform checkout, manual bank deposit (admin approval), or Flutterwave/USDT payment.</li>
            <li>Spin & Win at the top rewards 3× normal free mining tokens, with real MVZx utility integration.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
