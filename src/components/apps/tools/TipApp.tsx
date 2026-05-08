import { useMemo, useState } from "react";

export default function TipApp() {
  const [bill, setBill] = useState("1000");
  const [pct, setPct] = useState("10");
  const [people, setPeople] = useState("2");

  const r = useMemo(() => {
    const B = parseFloat(bill) || 0;
    const P = parseFloat(pct) || 0;
    const N = Math.max(1, parseFloat(people) || 1);
    const tip = B * P / 100;
    const total = B + tip;
    return { tip, total, perPerson: total / N };
  }, [bill, pct, people]);

  const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <label className="block">
          <span className="font-mono text-xs text-muted-foreground">Bill (NPR)</span>
          <input type="number" value={bill} onChange={(e) => setBill(e.target.value)}
            className="mt-1 w-full bg-card border border-border px-3 py-2 font-mono" />
        </label>
        <label className="block">
          <span className="font-mono text-xs text-muted-foreground">Tip %</span>
          <input type="number" value={pct} onChange={(e) => setPct(e.target.value)}
            className="mt-1 w-full bg-card border border-border px-3 py-2 font-mono" />
        </label>
        <label className="block">
          <span className="font-mono text-xs text-muted-foreground">People</span>
          <input type="number" value={people} onChange={(e) => setPeople(e.target.value)}
            className="mt-1 w-full bg-card border border-border px-3 py-2 font-mono" />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-px bg-border">
        <div className="bg-card p-4">
          <p className="font-mono text-xs text-muted-foreground">Tip</p>
          <p className="text-xl font-bold mt-1">NPR {fmt(r.tip)}</p>
        </div>
        <div className="bg-card p-4">
          <p className="font-mono text-xs text-muted-foreground">Total</p>
          <p className="text-xl font-bold mt-1">NPR {fmt(r.total)}</p>
        </div>
        <div className="bg-card p-4">
          <p className="font-mono text-xs text-muted-foreground">Per person</p>
          <p className="text-xl font-bold text-primary mt-1">NPR {fmt(r.perPerson)}</p>
        </div>
      </div>
    </div>
  );
}
