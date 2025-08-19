import React, { useState, useEffect } from "react";

const rewards = [
  "0.125 MVZx",
  "0.25 MVZx",
  "0.375 MVZx",
  "0.5 MVZx",
  "0.625 MVZx",
  "0.75 MVZx",
  "1 MVZx",
  "3× Free Reward",
];

// Function to return badge tier based on balance
const getBadge = (balance: number) => {
  if (balance >= 100) return { tier: "🌟 Legend", color: "text-yellow-600" };
  if (balance >= 50) return { tier: "💎 Diamond", color: "text-blue-600" };
  if (balance >= 25) return { tier: "🔮 Platinum", color: "text-purple-600" };
  if (balance >= 10) return { tier: "🥇 Gold", color: "text-amber-500" };
  if (balance >= 5) return { tier: "🥈 Silver", color: "text-gray-500" };
  if (balance >= 1) return { tier: "🥉 Bronze", color: "text-orange-500" };
  return { tier: "Newbie", color: "text-gray-400" };
};

export default function Game() {
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [localPlayers, setLocalPlayers] = useState<{ name: string; balance: number }[]>([]);
  const [globalPlayers, setGlobalPlayers] = useState<{ name: string; balance: number }[]>([]);

  // Load balance from localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem("mvzx_balance");
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
  }, []);

  // Update both leaderboards whenever balance changes
  useEffect(() => {
    const mockLocal = [
      { name: "Alice", balance: 15.75 },
      { name: "Bob", balance: 9.5 },
      { name: "Charlie", balance: 7.25 },
      { name: "Diana", balance: 5.0 },
      { name: "You", balance: balance },
    ];

    const mockGlobal = [
      { name: "CryptoKing", balance: 250.0 },
      { name: "Whale42", balance: 175.0 },
      { name: "MVZxMax", balance: 120.0 },
      { name: "TokenTiger", balance: 80.0 },
      { name: "LuckySpin", balance: 40.0 },
      { name: "You", balance: balance },
    ];

    setLocalPlayers(mockLocal.sort((a, b) => b.balance - a.balance));
    setGlobalPlayers(mockGlobal.sort((a, b) => b.balance - a.balance));
  }, [balance]);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setReward(null);

    const spinDuration = 3000;
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * rewards.length);
      const selectedReward = rewards[randomIndex];
      setReward(selectedReward);

      let rewardValue = 0;
      if (selectedReward.includes("× Free Reward")) {
        rewardValue = 0.25; // Example bonus reward
      } else {
        rewardValue = parseFloat(selectedReward);
      }

      const newBalance = balance + rewardValue;
      setBalance(newBalance);
      localStorage.setItem("mvzx_balance", newBalance.toString());

      console.log(`Mock: ${selectedReward} added. New balance: ${newBalance} MVZx`);

      setSpinning(false);
    }, spinDuration);
  };

  const badge = getBadge(balance);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      {/* Game Header */}
      <h2 className="text-3xl font-bold mb-4 text-purple-700">🎰 Spin & Earn MVZx Tokens!</h2>

      {/* Balance + Badge */}
      <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg shadow-md text-center">
        <div className="text-lg font-semibold text-gray-800">
          💰 Your Balance: {balance.toFixed(3)} MVZx
        </div>
        <div className={`mt-2 text-xl font-bold ${badge.color}`}>
          {badge.tier}
        </div>
      </div>

      {/* Spin Wheel */}
      <div className="relative w-64 h-64 mb-6">
        <div
          className={`w-full h-full rounded-full border-8 border-yellow-400 flex items-center justify-center transition-transform duration-[3s] ${
            spinning ? "rotate-[1080deg]" : ""
          }`}
        >
          <span className="absolute text-center font-semibold text-lg">
            {spinning ? "Spinning..." : "🎡"}
          </span>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={spinning}
        className={`px-6 py-3 rounded-lg text-white font-semibold ${
          spinning
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 shadow-md"
        }`}
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>

      {/* Reward Notification */}
      {reward && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 font-semibold rounded-lg shadow-md">
          🎉 You won: {reward}!
        </div>
      )}

      {/* Local Leaderboard */}
      <div className="mt-12 w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <h3 className="bg-purple-600 text-white text-center py-3 text-xl font-bold">
          🏆 Local Leaderboard
        </h3>
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Player</th>
              <th className="px-4 py-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {localPlayers.map((player, i) => (
              <tr
                key={i}
                className={`border-t ${
                  player.name === "You" ? "bg-yellow-100 font-semibold" : "bg-white"
                }`}
              >
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{player.name}</td>
                <td className="px-4 py-2">{player.balance.toFixed(3)} MVZx</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Global Leaderboard */}
      <div className="mt-12 w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <h3 className="bg-blue-600 text-white text-center py-3 text-xl font-bold">
          🌍 Global Leaderboard
        </h3>
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Player</th>
              <th className="px-4 py-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {globalPlayers.map((player, i) => (
              <tr
                key={i}
                className={`border-t ${
                  player.name === "You" ? "bg-green-100 font-semibold" : "bg-white"
                }`}
              >
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{player.name}</td>
                <td className="px-4 py-2">{player.balance.toFixed(3)} MVZx</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-gray-500 text-sm">
        (Leaderboards currently mock data — will sync with backend later)
      </p>
    </div>
  );
}
