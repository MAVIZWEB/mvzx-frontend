 import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-lg font-bold">MVZX Platform</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/purchase" className="hover:underline">Purchase</Link>
          <Link to="/stake" className="hover:underline">Stake</Link>
          <Link to="/withdraw" className="hover:underline">Withdraw</Link>
          <Link to="/referral" className="hover:underline">Referral</Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-4 text-center">
        © {new Date().getFullYear()} MVZX. All rights reserved.
      </footer>
    </div>
  );
}
