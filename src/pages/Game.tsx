 import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Player {
  id: number;
  name: string;
  points: number;
}

const Game: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Mock leaderboard data (replace with backend API later)
    setPlayers([
      { id: 1, name: "Alice", points: 1200 },
      { id: 2, name: "Bob", points: 950 },
      { id: 3, name: "Charlie", points: 720 },
      { id: 4, name: "Diana", points: 500 },
      { id: 5, name: "Ethan", points: 300 },
    ]);
  }, []);

  // Determine badge class based on points
  const getBadgeClass = (points: number) => {
    if (points >= 1000) return "badge-diamond";
    if (points >= 800) return "badge-platinum";
    if (points >= 600) return "badge-gold";
    if (points >= 400) return "badge-silver";
    return "badge-bronze";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        🏆 Leaderboard
      </h1>

      <div className="grid gap-4">
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            className="leaderboard-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              {/* Global Rank */}
              <span className="font-bold text-lg text-gray-700">
                #{index + 1}
              </span>

              {/* Player Info */}
              <div className="flex items-center gap-3">
                <div className={`badge ${getBadgeClass(player.points)}`}>
                  {player.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{player.name}</p>
                  <p className="text-sm text-gray-500">
                    {player.points} pts
                  </p>
                </div>
              </div>

              {/* Badge Label */}
              <span
                className={`text-xs font-bold uppercase px-2 py-1 rounded ${getBadgeClass(
                  player.points
                )}`}
              >
                {getBadgeClass(player.points).replace("badge-", "")}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Game;
