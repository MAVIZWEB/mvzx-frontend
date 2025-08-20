 import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Buy from "./pages/Buy";
import Game from "./pages/Game";
import Airdrop from "./pages/Airdrop"; // you’ll create this next
// import Mining from "./pages/Mining";
// import Escrow from "./pages/Escrow";
// import Voting from "./pages/Voting";
// import Trade from "./pages/Trade";
// import Signup from "./pages/Signup";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Top Section with platform description */}
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">MVZx Platform</h1>
          <p className="mt-2 text-sm">Buy, Trade, Mine & Earn instantly.</p>
        </header>

        {/* Landing Page Buttons */}
        <main className="p-6 flex flex-col items-center space-y-4">
          <Link to="/buy" className="w-full max-w-md">
            <button className="w-full bg-green-600 text-white py-3 rounded-xl shadow-lg">
              💰 MVZx Buy & Earn
            </button>
          </Link>

          <Link to="/airdrop" className="w-full max-w-md">
            <button className="w-full bg-pink-600 text-white py-3 rounded-xl shadow-lg">
              🎁 Airdrop
            </button>
          </Link>

          <Link to="/game" className="w-full max-w-md">
            <button className="w-full bg-purple-600 text-white py-3 rounded-xl shadow-lg">
              🎡 Spin & Earn Game
            </button>
          </Link>

          <Link to="/dashboard" className="w-full max-w-md">
            <button className="w-full bg-blue-700 text-white py-3 rounded-xl shadow-lg">
              📊 Dashboard
            </button>
          </Link>
        </main>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/game" element={<Game />} />
          <Route path="/airdrop" element={<Airdrop />} />
          {/* <Route path="/mining" element={<Mining />} />
          <Route path="/escrow" element={<Escrow />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/signup" element={<Signup />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
