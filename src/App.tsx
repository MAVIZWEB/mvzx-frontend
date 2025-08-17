import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Escrow from "./pages/Escrow";
import Buy from "./pages/Buy";
import Mining from "./pages/Mining";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
          <div className="flex items-center space-x-2">
            <img
              src="https://i.imgur.com/VbxvCK6.jpeg"
              alt="MAVIZ Logo"
              className="h-8 w-8 rounded-full"
            />
            <span className="font-bold text-lg">MAVIZ Platform</span>
          </div>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
            <Link to="/escrow" className="hover:underline">Escrow</Link>
            <Link to="/buy" className="hover:underline">Buy</Link>
            <Link to="/mining" className="hover:underline">Mining</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/escrow" element={<Escrow />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/mining" element={<Mining />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-100 text-gray-600 text-center p-4">
          © {new Date().getFullYear()} MAVIZ Platform. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
