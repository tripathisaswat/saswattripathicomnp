import { useState } from "react";

const BS_MONTHS: Record<number, number[]> = {
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2081: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2084: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2085: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
};
const NEPALI_MONTHS = ["Baishakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];

function adToBs(date: Date): { y: number; m: number; d: number } {
  const ref = new Date("2023-04-14");
  let diff = Math.floor((date.getTime() - ref.getTime()) / 86400000);
  let y = 2080, m = 0, d = 1;
  while (diff > 0) {
    const dim = BS_MONTHS[y]?.[m] ?? 30;
    if (d + diff <= dim) { d += diff; diff = 0; }
    else { diff -= dim - d + 1; d = 1; m++; if (m > 11) { m = 0; y++; } }
  }
  return { y, m, d };
}

const FESTIVALS = [
  "Baishakh 1 — Nepali New Year",
  "Ashwin — Dashain",
  "Kartik — Tihar",
  "Falgun — Holi",
  "Magh 1 — Maghe Sankranti",
  "Shrawan — Janai Purnima",
];

export default function CalendarApp() {
  const [date] = useState(new Date());
  const bs = adToBs(date);
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-px bg-border mb-6">
        <div className="bg-card p-5">
          <p className="font-mono text-xs text-muted-foreground mb-1">AD (Gregorian)</p>
          <p className="text-xl font-bold">{date.toDateString()}</p>
        </div>
        <div className="bg-card p-5">
          <p className="font-mono text-xs text-muted-foreground mb-1">BS (Bikram Sambat)</p>
          <p className="text-xl font-bold">{NEPALI_MONTHS[bs.m]} {bs.d}, {bs.y}</p>
        </div>
      </div>
      <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">Major festivals</h3>
      <ul className="space-y-1 font-mono text-sm">
        {FESTIVALS.map((f) => <li key={f} className="text-muted-foreground">— {f}</li>)}
      </ul>
    </div>
  );
}
