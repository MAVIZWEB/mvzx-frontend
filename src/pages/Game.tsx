import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchMatrixStatus, MatrixStatus } from "../services/matrixService";

interface Player {
  id: string;
  name: string;
  points: number;
  stage: number;
}

const Game: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    async function loadPlayers() {
      try {
        // Example: load 5 test users
        const userIds = ["u1", "u2", "u3", "u4", "u5"];
        const results = await Promise.all(
          userIds.map((id) => fetchMatrixStatus(id))
        );

        const mapped = results.map((res, index) => ({
          id: res.userId,
          name: `User ${index + 1}`,
          points: res.earningsSoFar, // use earnings as points
          stage: res.stage,
        }));

        // Sort by points descending
        mapped.sort((a, b) => b.points - a.points);

        setPlayers(mapped);
      } catch (err) {
        console.error("Failed to load players:", err);
      }
    }

    loadPlayers();
  }, []);

  const getBadgeClass = (points: number) => {
    if (points >= 1000) return "badge-diamond";
    if (points >= 800) return "badge-platinum";
    if (points >= 600) return "badge-gold";
    if (points >= 400) return "badge-silver";
    return "badge-bronze";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">🏆 Leaderboard</h1>

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
              <span className="font-bold text-lg text-gray-700">#{index + 1}</span>

              <div className="flex items-center gap-3">
                <div className={`badge ${getBadgeClass(player.points)}`}>
                  {player.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{player.name}</p>
                  <p className="text-sm text-gray-500">
                    {player.points} pts | Stage {player.stage}
                  </p>
                </div>
              </div>

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
