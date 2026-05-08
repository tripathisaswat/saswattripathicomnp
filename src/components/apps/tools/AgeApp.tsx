import { useMemo, useState } from "react";

export default function AgeApp() {
  const [dob, setDob] = useState("1995-01-01");
  const r = useMemo(() => {
    const d = new Date(dob);
    if (isNaN(d.getTime())) return null;
    const now = new Date();
    let y = now.getFullYear() - d.getFullYear();
    let m = now.getMonth() - d.getMonth();
    let day = now.getDate() - d.getDate();
    if (day < 0) { m--; day += 30; }
    if (m < 0) { y--; m += 12; }
    const days = Math.floor((now.getTime() - d.getTime()) / 86400000);
    return { y, m, day, days, weeks: Math.floor(days / 7), hours: days * 24 };
  }, [dob]);

  return (
    <div>
      <label className="block mb-6">
        <span className="font-mono text-xs text-muted-foreground">Date of birth</span>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
          className="mt-1 w-full bg-card border border-border px-3 py-2 font-mono" />
      </label>
      {r && (
        <div className="grid sm:grid-cols-2 gap-px bg-border">
          <div className="bg-card p-4">
            <p className="font-mono text-xs text-muted-foreground">Age</p>
            <p className="text-2xl font-bold text-primary mt-1">{r.y}y {r.m}m {r.day}d</p>
          </div>
          <div className="bg-card p-4">
            <p className="font-mono text-xs text-muted-foreground">Total days</p>
            <p className="text-2xl font-bold mt-1">{r.days.toLocaleString()}</p>
          </div>
          <div className="bg-card p-4">
            <p className="font-mono text-xs text-muted-foreground">Weeks</p>
            <p className="text-2xl font-bold mt-1">{r.weeks.toLocaleString()}</p>
          </div>
          <div className="bg-card p-4">
            <p className="font-mono text-xs text-muted-foreground">Hours</p>
            <p className="text-2xl font-bold mt-1">{r.hours.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
