 import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Buy from "./pages/Buy";
import DirectBuy from "./pages/DirectBuy";
import Airdrop from "./pages/Airdrop";
import Mining from "./pages/Mining";
import Escrow from "./pages/Escrow";
import Voting from "./pages/Voting";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/directbuy" element={<DirectBuy />} />
      <Route path="/airdrop" element={<Airdrop />} />
      <Route path="/mining" element={<Mining />} />
      <Route path="/escrow" element={<Escrow />} />
      <Route path="/voting" element={<Voting />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/game" element={<Game />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
