// src/pages/Voting.tsx
import React, { useEffect, useMemo, useState } from "react";
import { getVotingStatus, submitVote, VotingStatus } from "../services/votingService";

const LAGOS_TZ = "Africa/Lagos";

function getLagosNow(): Date {
  // Create a Date object representing current time in Lagos by formatting then re-parsing.
  // Good enough for gating UI; backend will still validate server-side.
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: LAGOS_TZ,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).formatToParts(new Date());

  // Extract parts
  const get = (type: string) => parts.find(p => p.type === type)?.value || "00";
  const y = get("year"), m = get("month"), d = get("day");
  const hh = get("hour"), mm = get("minute"), ss = get("second");
  // Construct ISO-like string as local Lagos time
  return new Date(`${y}-${m}-${d}T${hh}:${mm}:${ss}`);
}

function minutesSinceMidnightLagos(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

function formatTime(dt: Date) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: LAGOS_TZ, hour: "2-digit", minute: "2-digit" }).format(dt);
}

export default function Voting() {
  const [status, setStatus] = useState<VotingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [vote, setVote] = useState<"UP" | "HOLD" | "DOWN">("UP");
  const [message, setMessage] = useState<string>("");

  const now = getLagosNow();
  const mins = minutesSinceMidnightLagos(now);

  // Windows (in minutes)
  const VOTE_START = 18 * 60;   // 18:00
  const VOTE_END   = 23 * 60;   // 23:00
  const PUBLISH    = 23 * 60 + 30; // 23:30
  const EFFECTIVE  = 24 * 60;   // 00:00 (next day)

  const phase = useMemo(() => {
    if (mins < VOTE_START) return "BEFORE";
    if (mins >= VOTE_START && mins <= VOTE_END) return "OPEN";
    if (mins > VOTE_END && mins < PUBLISH) return "CLOSED_PENDING";
    if (mins >= PUBLISH && mins < EFFECTIVE) return "PUBLISHED";
    return "ROLLED"; // after midnight, new day cycle
  }, [mins]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getVotingStatus();
        setStatus(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const canVote = status?.eligible === true && phase === "OPEN";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canVote) return;
    setSubmitting(true);
    setMessage("");

    try {
      await submitVote({ choice: vote }); // "UP" | "HOLD" | "DOWN"
      setMessage("✅ Vote submitted successfully. Thank you!");
      // Optionally refresh status/ tallies
      const refreshed = await getVotingStatus();
      setStatus(refreshed);
    } catch (err: any) {
      setMessage(err?.message || "Failed to submit vote.");
    } finally {
      setSubmitting(false);
    }
  }

  const nextEventLabel =
    phase === "BEFORE" ? "Voting opens at 6:00 PM" :
    phase === "OPEN" ? "Voting closes at 11:00 PM" :
    phase === "CLOSED_PENDING" ? "Results publish at 11:30 PM" :
    phase === "PUBLISHED" ? "New price takes effect at 12:00 AM" :
    "Next voting opens today at 6:00 PM";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 mb-6">
        <h2 className="text-xl font-bold text-blue-700">Daily MVZx Price Voting</h2>
        <p className="text-sm text-blue-700 mt-1">
          Everyone sees this announcement. Only wallets holding <b>≥ 20 MVZx</b> (adjustable by admin) can vote.
          Voting window: <b>6:00 PM – 11:00 PM</b> (Africa/Lagos). Results publish <b>11:30 PM</b>. New price effective <b>12:00 AM</b>.
        </p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div>Now (Lagos): <b>{formatTime(now)}</b></div>
        <div>Next: <b>{nextEventLabel}</b></div>
      </div>

      {loading ? (
        <div>Loading voting status…</div>
      ) : (
        <>
          {/* Status card */}
          <div className="rounded-xl border p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-semibold">Your Eligibility</p>
                <p className={status?.eligible ? "text-green-600" : "text-red-600"}>
                  {status?.eligible ? "Eligible (≥ 20 MVZx)" : "Not eligible (< 20 MVZx)"}
                </p>
                <p className="text-gray-600 text-sm">
                  Your MVZx Balance: <b>{status?.mvzxBalance ?? 0}</b>
                </p>
              </div>
              <div>
                <p className="font-semibold">Today’s Phase</p>
                <p>{phase}</p>
              </div>
              <div>
                <p className="font-semibold">Today’s Tallies</p>
                <p className="text-gray-700 text-sm">
                  UP: <b>{status?.tallies?.UP ?? 0}</b> • HOLD: <b>{status?.tallies?.HOLD ?? 0}</b> • DOWN: <b>{status?.tallies?.DOWN ?? 0}</b>
                </p>
              </div>
            </div>
          </div>

          {/* Voting form */}
          <form onSubmit={handleSubmit} className="rounded-xl border p-4">
            <h3 className="font-semibold mb-3">Cast your vote</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              {(["UP","HOLD","DOWN"] as const).map(opt => (
                <label key={opt} className={`px-4 py-2 rounded-full border cursor-pointer ${vote === opt ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-gray-50"}`}>
                  <input type="radio" name="vote" className="hidden" value={opt} checked={vote === opt} onChange={() => setVote(opt)} />
                  {opt}
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={!canVote || submitting}
              className={`px-6 py-2 rounded-lg text-white font-semibold ${canVote ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
              title={!status?.eligible ? "Hold ≥ 20 MVZx to vote" : phase !== "OPEN" ? "Voting is closed right now" : ""}
            >
              {submitting ? "Submitting…" : "Submit Vote"}
            </button>

            {message && <div className="mt-4 text-sm">{message}</div>}
          </form>

          {/* Results info */}
          <div className="mt-6 text-sm text-gray-600">
            <p>Results publish at <b>11:30 PM</b>. Effective price updates at <b>12:00 AM</b> (Lagos).</p>
          </div>
        </>
      )}
    </div>
  );
}
