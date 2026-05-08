import { useMemo, useState } from "react";

const SLABS_SINGLE = [
  { upto: 500000, rate: 0.01 },
  { upto: 700000, rate: 0.10 },
  { upto: 1000000, rate: 0.20 },
  { upto: 2000000, rate: 0.30 },
  { upto: 5000000, rate: 0.36 },
  { upto: Infinity, rate: 0.39 },
];
const SLABS_MARRIED = [
  { upto: 600000, rate: 0.01 },
  { upto: 800000, rate: 0.10 },
  { upto: 1100000, rate: 0.20 },
  { upto: 2000000, rate: 0.30 },
  { upto: 5000000, rate: 0.36 },
  { upto: Infinity, rate: 0.39 },
];

const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

export default function TaxCalcApp() {
  const [monthly, setMonthly] = useState("100000");
  const [married, setMarried] = useState(false);

  const result = useMemo(() => {
    const annual = (parseFloat(monthly) || 0) * 12;
    const slabs = married ? SLABS_MARRIED : SLABS_SINGLE;
    let remaining = annual;
    let last = 0;
    let tax = 0;
    const breakdown: { range: string; rate: string; tax: number }[] = [];
    for (const s of slabs) {
      if (remaining <= 0) break;
      const span = Math.min(s.upto - last, remaining);
      const t = span * s.rate;
      tax += t;
      breakdown.push({
        range: `${fmt(last)} – ${fmt(last + span)}`,
        rate: `${(s.rate * 100).toFixed(0)}%`,
        tax: t,
      });
      remaining -= span; last = s.upto;
    }
    return { annual, tax, breakdown, monthlyTax: tax / 12, takeHome: annual - tax };
  }, [monthly, married]);

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">
        Enter your <strong>monthly</strong> income. Nepal FY 2081/82 slabs.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="block">
          <span className="font-mono text-xs text-muted-foreground">Monthly income (NPR)</span>
          <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)}
            className="mt-2 w-full bg-card border border-border px-4 py-3 text-lg font-mono" />
        </label>
        <label className="flex items-center gap-3 mt-7">
          <input type="checkbox" checked={married} onChange={(e) => setMarried(e.target.checked)} />
          <span className="font-mono text-sm">Married (couple)</span>
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-px bg-border mb-6">
        <div className="bg-card p-5">
          <p className="font-mono text-xs text-muted-foreground">Monthly tax</p>
          <p className="text-2xl font-bold text-primary mt-1">NPR {fmt(result.monthlyTax)}</p>
          <p className="font-mono text-xs text-muted-foreground mt-3">Take-home / mo: NPR {fmt(result.takeHome / 12)}</p>
        </div>
        <div className="bg-card p-5">
          <p className="font-mono text-xs text-muted-foreground">Yearly tax</p>
          <p className="text-2xl font-bold text-primary mt-1">NPR {fmt(result.tax)}</p>
          <p className="font-mono text-xs text-muted-foreground mt-3">Annual income: NPR {fmt(result.annual)}</p>
        </div>
      </div>

      <table className="w-full font-mono text-xs">
        <thead>
          <tr className="text-left text-muted-foreground border-b border-border">
            <th className="py-2">Range</th><th>Rate</th><th className="text-right">Tax</th>
          </tr>
        </thead>
        <tbody>
          {result.breakdown.map((b, i) => (
            <tr key={i} className="border-b border-border">
              <td className="py-2">{b.range}</td><td>{b.rate}</td>
              <td className="text-right">{fmt(b.tax)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
