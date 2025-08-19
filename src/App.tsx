 // src/App.tsx
import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Airdrop from "./pages/airdrop";
import Buy from "./pages/Buy";
import Signup from "./pages/Signup";
import Escrow from "./pages/Escrow";
import ManualDeposit from "./pages/ManualDeposit";
import Mining from "./pages/Mining";
import Voting from "./pages/Voting";

const App: React.FC = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "airdrop":
        return <Airdrop />;
      case "buy":
        return <Buy />;
      case "signup":
        return <Signup />;
      case "escrow":
        return <Escrow />;
      case "manual":
        return <ManualDeposit />;
      case "mining":
        return <Mining />;
      case "voting":
        return <Voting />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* 🔹 Top Navbar */}
      <header className="bg-blue-600 text-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">MVZx Platform</h1>
        <button
          className="bg-white text-blue-600 px-3 py-1 rounded-md shadow"
          onClick={() => alert("Menu clicked! (Expand later)")}
        >
          ☰
        </button>
      </header>

      {/* 🔹 Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">{renderPage()}</main>

      {/* 🔹 Bottom Mobile Menu */}
      <nav className="bg-white border-t shadow-lg fixed bottom-0 left-0 right-0 flex justify-around py-2">
        <button
          className={`flex-1 text-center py-2 ${
            activePage === "dashboard"
              ? "text-blue-600 font-bold"
              : "text-gray-600"
          }`}
          onClick={() => setActivePage("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`flex-1 text-center py-2 ${
            activePage === "airdrop"
              ? "text-green-600 font-bold"
              : "text-gray-600"
          }`}
          onClick={() => setActivePage("airdrop")}
        >
          Airdrop
        </button>
        <button
          className={`flex-1 text-center py-2 ${
            activePage === "buy" ? "text-blue-600 font-bold" : "text-gray-600"
          }`}
          onClick={() => setActivePage("buy")}
        >
          Buy
        </button>
        <button
          className={`flex-1 text-center py-2 ${
            activePage === "staking"
              ? "text-purple-600 font-bold"
              : "text-gray-600"
          }`}
          onClick={() => setActivePage("staking")}
        >
          Staking
        </button>
        <button
          className={`flex-1 text-center py-2 ${
            activePage === "voting"
              ? "text-teal-600 font-bold"
              : "text-gray-600"
          }`}
          onClick={() => setActivePage("voting")}
        >
          Voting
        </button>
      </nav>
    </div>
  );
};

export default App;
