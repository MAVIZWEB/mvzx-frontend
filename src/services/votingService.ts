// src/services/votingService.ts
export interface VotingStatus {
  eligible: boolean;
  mvzxBalance: number;
  tallies: { UP: number; HOLD: number; DOWN: number };
  hasVoted: boolean;
}

export async function getVotingStatus(): Promise<VotingStatus> {
  const res = await fetch("/api/voting/status", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load voting status");
  return res.json();
}

export async function submitVote(payload: { choice: "UP" | "HOLD" | "DOWN" }): Promise<{ ok: true }> {
  const res = await fetch("/api/voting/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to submit vote");
  }
  return res.json();
}
