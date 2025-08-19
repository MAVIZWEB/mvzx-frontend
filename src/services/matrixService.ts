// src/services/matrixService.ts
export interface MatrixStatus {
  userId: string;
  stage: number;
  position: number;
  expectedEarnings: number;
  earningsSoFar: number;
  earningsLeft: number;
}

export async function fetchMatrixStatus(userId: string): Promise<MatrixStatus> {
  const response = await fetch(`/api/matrix/status/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch matrix status");
  return response.json();
}
