import { useEffect, useState } from "react";
import api from "../services/api";

export default function MatrixStage({ userId }: { userId: number }) {
  const [matrix, setMatrix] = useState<any[]>([]);

  useEffect(() => {
    api.get(`/matrix/${userId}`).then(res => setMatrix(res.data.matrix));
  }, [userId]);

  return (
    <div>
      <h2>Matrix Stages</h2>
      {matrix.map(m => (
        <div key={m.id}>Stage {m.stage} - Legs Filled: {m.legsFilled} - Earnings: {m.earnings}</div>
      ))}
    </div>
  );
}
