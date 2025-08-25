import React from "react";
import { Link } from "react-router-dom";

export const Landing: React.FC = () => (
  <div className="text-center mt-24">
    <h1 className="text-4xl font-bold mb-4">MAVIZ SWAPS</h1>
    <p className="mb-6">Token Swap & Earn, Spin & Win, Affiliate Rewards & More</p>
    <div className="space-x-4">
      <Link className="px-6 py-3 bg-yellow-500 text-gray-900 rounded" to="/signup">
        Signup
      </Link>
      <Link className="px-6 py-3 bg-gray-700 text-white rounded" to="/login">
        Login
      </Link>
    </div>
  </div>
);
