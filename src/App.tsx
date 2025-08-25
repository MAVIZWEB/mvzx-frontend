 // src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">MVZX Platform</h1>
        <nav className="flex gap-4">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
