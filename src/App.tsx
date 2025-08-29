 // frontend/src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Purchase from "./pages/Purchase";
import Stake from "./pages/Stake";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-indigo-700 text-white p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold">MVZx</h1>
            <nav className="space-x-4 text-sm">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/purchase" className="hover:underline">Purchase</Link>
              <Link to="/stake" className="hover:underline">Stake</Link>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <footer className="bg-gray-100 text-center p-4 mt-8">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} MVZx</div>
        </footer>
      </div>
    </Router>
  );
}
