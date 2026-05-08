import { useMemo, useState } from "react";

const UNITS: Record<string, Record<string, number>> = {
  Length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, ft: 0.3048, in: 0.0254 },
  Weight: { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 },
  Volume: { L: 1, mL: 0.001, gal: 3.78541, cup: 0.24 },
};

export default function UnitApp() {
  const [cat, setCat] = useState("Length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [val, setVal] = useState("1");

  const keys = Object.keys(UNITS[cat]);
  const result = useMemo(() => {
    const v = parseFloat(val) || 0;
    const inBase = v * (UNITS[cat][from] ?? 1);
    return inBase / (UNITS[cat][to] ?? 1);
  }, [cat, from, to, val]);

  return (
    <div>
      <select value={cat} onChange={(e) => { setCat(e.target.value); const k = Object.keys(UNITS[e.target.value]); setFrom(k[0]); setTo(k[1]); }}
        className="bg-card border border-border px-3 py-2 font-mono mb-4">
        {Object.keys(UNITS).map((k) => <option key={k}>{k}</option>)}
      </select>
      <div className="grid sm:grid-cols-3 gap-3">
        <input type="number" value={val} onChange={(e) => setVal(e.target.value)}
          className="bg-card border border-border px-3 py-2 font-mono" />
        <select value={from} onChange={(e) => setFrom(e.target.value)} className="bg-card border border-border px-3 py-2 font-mono">
          {keys.map((k) => <option key={k}>{k}</option>)}
        </select>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="bg-card border border-border px-3 py-2 font-mono">
          {keys.map((k) => <option key={k}>{k}</option>)}
        </select>
      </div>
      <div className="mt-4 bg-card border border-border p-5">
        <p className="font-mono text-xs text-muted-foreground">Result</p>
        <p className="text-2xl font-bold text-primary mt-1">{result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {to}</p>
      </div>
    </div>
  );
}
