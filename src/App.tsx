import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Buy from "./Buy";
import Escrow from "./Escrow";
import Mining from "./Mining";
import Signup from "./Signup";
import NotFound from "./NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/escrow" element={<Escrow />} />
        <Route path="/mining" element={<Mining />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
