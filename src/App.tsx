import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">MVZx Platform</h1>
        <button className="bg-white text-blue-600 px-3 py-1 rounded-md shadow" onClick={() => alert("Menu clicked!")}>
          ☰
        </button>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        {activePage === "dashboard" && <Dashboard />}
      </main>

      <nav className="bg-white border-t shadow-lg fixed bottom-0 left-0 right-0 flex justify-around py-2">
        <button className={`flex-1 text-center py-2 ${activePage === "dashboard" ? "text-blue-600 font-bold" : "text-gray-600"}`} onClick={() => setActivePage("dashboard")}>
          Dashboard
        </button>
      </nav>
    </div>
  );
};

export default App;
