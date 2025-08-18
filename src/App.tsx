 import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Escrow from "./pages/Escrow";
import Mining from "./pages/Mining";
import Game from "./pages/Game";
import ManualDeposit from "./pages/ManualDeposit";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* You can add a shared navbar here if needed */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/escrow" element={<Escrow />} />
          <Route path="/mining" element={<Mining />} />
          <Route path="/game" element={<Game />} />
          <Route path="/manual-deposit" element={<ManualDeposit />} />
          {/* Optional: add a catch-all 404 page */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen text-center">
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
