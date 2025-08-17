import React from "react";
import logo from "./assets/logo.png"; // Place your logo inside src/assets/logo.png

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="MAVIZ Logo" className="h-8 w-8" />
          <span className="font-bold text-lg">MAVIZ Platform</span>
        </div>
        <div className="space-x-4">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to MAVIZ</h1>
        <p className="text-lg text-gray-700 mb-6 max-w-xl">
          Your decentralized platform for trading, staking, referrals, and escrow exchange.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700">
            Join Community
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700">
            Get Started
          </button>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700">
            Escrow Trade
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 text-center p-4">
        © {new Date().getFullYear()} MAVIZ Platform. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
