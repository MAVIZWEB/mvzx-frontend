import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to MAVIZ</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        Your decentralized platform for Escrow, Buy/Sell, Mining, Referrals, and more.
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
        <Link
          to="/buy"
          className="bg-yellow-600 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-700"
        >
          Buy MVZX
        </Link>
        <Link
          to="/mining"
          className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700"
        >
          Mining
        </Link>
      </div>
    </main>
  );
}
