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
        const userIds = ["u1", "u2", "u3", "u4", "u5"];
        const results = await Promise.all(userIds.map((id) => fetchMatrixStatus(id)));

        const mapped = results.map((res, index) => ({
          id: res.userId,
          name: `User ${index + 1}`,
          points: res.earningsSoFar,
          stage: res.stage,
        }));

        mapped.sort((a, b) => b.points - a.points);
        setPlayers(mapped);
      } catch (err) {
        console.error("Failed to load players:", err);
      }
    }

    loadPlayers();
  }, []);

  const getBadgeClass = (points: number) => {
    if (points >= 1000) return "bg-gradient-to-r from-cyan-400 to-blue-600";
    if (points >= 800) return "bg-gradient-to-r from-gray-300 to-gray-500";
    if (points >= 600) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (points >= 400) return "bg-gradient-to-r from-gray-200 to-gray-400";
    return "bg-gradient-to-r from-orange-400 to-red-600";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">🏆 Leaderboard</h1>

      <div className="grid gap-4">
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            className="p-4 rounded-2xl shadow-lg bg-white/10 backdrop-blur-md border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg text-gray-200">#{index + 1}</span>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${getBadgeClass(player.points)}`}>
                  {player.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{player.name}</p>
                  <p className="text-sm text-gray-400">
                    {player.points} pts | Stage {player.stage}
                  </p>
                </div>
              </div>

              <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${getBadgeClass(player.points)}`}>
                {getBadgeClass(player.points).includes("cyan") ? "Diamond" : 
                 getBadgeClass(player.points).includes("gray-300") ? "Platinum" :
                 getBadgeClass(player.points).includes("yellow") ? "Gold" :
                 getBadgeClass(player.points).includes("gray-200") ? "Silver" : "Bronze"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Game;
