 import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Leaderboard from "./pages/Leaderboard";
import { BalanceProvider } from "./context/BalanceContext";

export default function App() {
  return (
    <BalanceProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BalanceProvider>
  );
}
