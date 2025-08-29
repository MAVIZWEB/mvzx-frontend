 // frontend/src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Purchase from "./pages/Purchase";
import StakePage from "./pages/Stake";

export default function App() {
  return (
    <BrowserRouter>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/purchase" className="mr-4">Purchase</Link>
          <Link to="/stake">Stake</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/purchase" element={<Purchase/>} />
          <Route path="/stake" element={<StakePage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
