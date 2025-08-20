import React from "react";
import { Link } from "react-router-dom";
import { Leaderboard } from "./Leaderboard";
import { Game } from "./Game";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-4 py-3 shadow-md bg-white sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-600">MAVIZ LIQUIDITY</h1>
        <h2 className="text-sm text-gray-700 font-medium">
          MVZx Buy & Earn
        </h2>
        <div className="flex items-center space-x-3">
          <Link to="/signup">
            <User className="w-5 h-5 text-gray-700" />
          </Link>
          <Menu className="w-5 h-5 text-gray-700" />
        </div>
      </header>

      {/* Description & Status */}
      <section className="px-6 py-6 text-center">
        <motion.h3
          className="text-2xl font-semibold text-gray-800 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Spin & Earn
        </motion.h3>
        <p className="text-gray-600 text-sm mb-4">
          Experience instant crypto rewards with MAVIZ MVZx liquidity system.
        </p>

        {/* Status / Earnings / Balance */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-blue-100 rounded-xl">
            <p className="text-xs text-gray-500">Status</p>
            <p className="font-bold text-blue-600">Active</p>
          </div>
          <div className="p-3 bg-green-100 rounded-xl">
            <p className="text-xs text-gray-500">Earnings</p>
            <p className="font-bold text-green-600">₦0.00</p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-xl">
            <p className="text-xs text-gray-500">Wallet</p>
            <p className="font-bold text-yellow-600">₦0.00</p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="grid grid-cols-2 gap-4 px-6 py-4">
        <Link to="/buy">
          <Button className="w-full rounded-2xl shadow-md">Buy & Earn</Button>
        </Link>
        <Link to="/airdrop">
          <Button className="w-full rounded-2xl shadow-md bg-pink-500 hover:bg-pink-600">
            Airdrop
          </Button>
        </Link>
        <Link to="/directbuy">
          <Button className="w-full rounded-2xl shadow-md bg-purple-500 hover:bg-purple-600">
            Direct Transfer Buy
          </Button>
        </Link>
        <Link to="/mining">
          <Button className="w-full rounded-2xl shadow-md bg-indigo-500 hover:bg-indigo-600">
            Mining
          </Button>
        </Link>
        <Link to="/escrow">
          <Button className="w-full rounded-2xl shadow-md bg-teal-500 hover:bg-teal-600">
            Escrow P2P Trade
          </Button>
        </Link>
        <Link to="/voting">
          <Button className="w-full rounded-2xl shadow-md bg-orange-500 hover:bg-orange-600">
            Voting
          </Button>
        </Link>
      </section>

      {/* Leaderboard */}
      <section className="px-6 py-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Leaderboard</h3>
        <Leaderboard />
      </section>

      {/* Game Spin Wheel */}
      <section className="px-6 py-8">
        <Game />
      </section>
    </div>
  );
};

export default LandingPage;
