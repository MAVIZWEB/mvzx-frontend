 import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Leaderboard from "./pages/Leaderboard";
import PrizeWheel from "./components/PrizeWheel";

function App() {
  const [user, setUser] = useState<{ email: string; wallet: string } | null>(
    null
  );

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
      <Route
        path="/leaderboard"
        element={
          user ? <Leaderboard /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/wheel"
        element={
          user ? <PrizeWheel /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

export default App;
