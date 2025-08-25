import React, { useState, useEffect } from "react";
import { getMatrix } from "../api/user";

export const Matrix: React.FC = () => {
  const [matrix, setMatrix] = useState<any[]>([]);
  const token = localStorage.getItem("mvzx_token");

  useEffect(() => {
    const fetchMatrix = async () => {
      if (!token) return;
      const res = await getMatrix(token);
      setMatrix(res.data.matrix);
    };
    fetchMatrix();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Your Matrix & Rewards</h2>
      <table className="w-full text-left border-collapse border border-gray-600">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 p-2">Position</th>
            <th className="border border-gray-600 p-2">User</th>
            <th className="border border-gray-600 p-2">Reward</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((m, idx) => (
            <tr key={idx} className="hover:bg-gray-700">
              <td className="border border-gray-600 p-2">{m.position}</td>
              <td className="border border-gray-600 p-2">{m.user}</td>
              <td className="border border-gray-600 p-2">{m.reward} MVZx</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
