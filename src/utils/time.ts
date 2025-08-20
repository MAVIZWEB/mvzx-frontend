// Africa/Lagos schedule helpers (UTC+1 / +0 DST agnostic)
export function lagosNow(): Date {
  // Intl works client-side even on phones
  const fmt = new Intl.DateTimeFormat("en-NG", {
    timeZone: "Africa/Lagos",
    hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const parts = fmt.formatToParts(new Date());
  const get = (t: string) => Number(parts.find(p => p.type === t)?.value || "0");
  const yyyy = get("year"), mm = get("month"), dd = get("day");
  const hh = get("hour"), mi = get("minute"), ss = get("second");
  return new Date(`${yyyy}-${mm}-${dd}T${String(hh).padStart(2,"0")}:${String(mi).padStart(2,"0")}:${String(ss).padStart(2,"0")}+01:00`);
}

export function isVotingOpen(now = lagosNow()): boolean {
  const start = new Date(now); start.setHours(18, 0, 0, 0); // 6:00 PM
  const end = new Date(now);   end.setHours(23, 0, 0, 0);   // 11:00 PM
  return now >= start && now <= end;
}

export function nextVotingTimes(now = lagosNow()) {
  const start = new Date(now); start.setHours(18, 0, 0, 0);
  const cutoff = new Date(now); cutoff.setHours(23, 0, 0, 0);
  const publish = new Date(now); publish.setHours(23, 30, 0, 0); // 11:30 PM
  const effect = new Date(now); effect.setHours(24, 0, 0, 0);     // midnight next day
  return { start, cutoff, publish, effect };
}
