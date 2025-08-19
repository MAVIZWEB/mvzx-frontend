 import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to MVZx Platform</h1>
      <p className="mb-8 text-lg">Mining • Escrow • Spin & Earn • Matrix Rewards</p>
      <nav className="flex gap-6">
        <Link to="/dashboard" className="px-6 py-3 bg-white text-blue-600 rounded-2xl shadow hover:scale-105 transition">
          Dashboard
        </Link>
        <Link to="/game" className="px-6 py-3 bg-white text-blue-600 rounded-2xl shadow hover:scale-105 transition">
          Spin & Earn
        </Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
