import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";

// Placeholder components for other menu pages (replace later)
function Escrow() {
  return <div className="p-8">Escrow Page (Coming Soon)</div>;
}
function Deposit() {
  return <div className="p-8">Manual Deposit Page (Coming Soon)</div>;
}
function Mining() {
  return <div className="p-8">Mining / Matrix Page (Coming Soon)</div>;
}

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to MVZx Platform</h1>
      <p className="mb-8 text-lg">Mining • Escrow • Spin & Earn • Matrix Rewards</p>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <h1 className="text-xl font-bold text-blue-600">MVZx</h1>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/game"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
            }
          >
            Spin & Earn
          </NavLink>
          <NavLink
            to="/escrow"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
            }
          >
            Escrow
          </NavLink>
          <NavLink
            to="/deposit"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
            }
          >
            Manual Deposit
          </NavLink>
          <NavLink
            to="/mining"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
            }
          >
            Mining
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game" element={<Game />} />
        <Route path="/escrow" element={<Escrow />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/mining" element={<Mining />} />
      </Routes>
    </Router>
  );
}

export default App;
