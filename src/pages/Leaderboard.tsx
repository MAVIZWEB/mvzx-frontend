import React, { useEffect, useState } from "react";

type Player = {
  name: string;
  balance: number;
};

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Get your current balance from localStorage
    const savedBalance = localStorage.getItem("mvzx_balance");
    const myBalance = savedBalance ? parseFloat(savedBalance) : 0;

    // Mock other players + insert YOU
    const mockPlayers: Player[] = [
      { name: "Alice", balance: 15.75 },
      { name: "Bob", balance: 9.5 },
      { name: "Charlie", balance: 7.25 },
      { name: "Diana", balance: 5.0 },
      { name: "You", balance: myBalance },
    ];

    // Sort descending
    const sorted = mockPlayers.sort((a, b) => b.balance - a.balance);
    setPlayers(sorted);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] w-full bg-gradient-to-b from-cream via-white to-red-50 p-6">
      <h2 className="text-3xl font-bold mb-6 text-red-700 drop-shadow">🏆 MVZx Leaderboard</h2>

      <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Player</th>
              <th className="px-4 py-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, i) => (
              <tr
                key={i}
                className={`border-t ${
                  player.name === "You"
                    ? "bg-yellow-100 font-semibold"
                    : "bg-white/70"
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
        (Mock leaderboard — will sync with backend later.)
      </p>
    </div>
  );
}
