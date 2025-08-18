import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow text-center px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">MAVIZ (MVZx) — Liquidity & Revenue Sharing</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-2xl">
        ✅ EARN: You can earn rewards by buying MVZx tokens. This platform is a community
        reward system for buyers. Early buyers benefit more.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
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
      </div>

      <section className="mt-10 max-w-2xl text-left">
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
