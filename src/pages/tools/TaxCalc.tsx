import { useMemo, useState } from "react";
import { PageShell } from "@/components/portfolio/PageShell";

// Nepal income tax FY 2081/82 (approx slabs, individual unmarried)
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

export default function TaxCalc() {
  const [income, setIncome] = useState("1200000");
  const [married, setMarried] = useState(false);

  const result = useMemo(() => {
    const slabs = married ? SLABS_MARRIED : SLABS_SINGLE;
    let remaining = parseFloat(income) || 0;
    let last = 0;
    let tax = 0;
    const breakdown: { range: string; rate: string; tax: number }[] = [];
    for (const s of slabs) {
      if (remaining <= 0) break;
      const span = Math.min(s.upto - last, remaining);
      const t = span * s.rate;
      tax += t;
      breakdown.push({
        range: `${last.toLocaleString()} – ${(last + span).toLocaleString()}`,
        rate: `${(s.rate * 100).toFixed(0)}%`,
        tax: t,
      });
      remaining -= span;
      last = s.upto;
    }
    return { tax, breakdown };
  }, [income, married]);

  return (
    <PageShell label="tools/tax" title="Nepal Tax Calculator">
      <p className="text-muted-foreground mb-8">FY 2081/82 individual income tax (annual).</p>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <label className="block">
          <span className="font-mono text-xs text-muted-foreground">Annual income (NPR)</span>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="mt-2 w-full bg-card border border-border px-4 py-3 text-lg font-mono"
          />
        </label>
        <label className="flex items-center gap-3 mt-7">
          <input type="checkbox" checked={married} onChange={(e) => setMarried(e.target.checked)} />
          <span className="font-mono text-sm">Married (couple)</span>
        </label>
      </div>

      <div className="bg-card border border-border p-6 mb-6">
        <p className="font-mono text-xs text-muted-foreground">Total tax</p>
        <p className="text-4xl font-bold text-primary mt-1">
          NPR {result.tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </p>
      </div>

      <table className="w-full font-mono text-sm">
        <thead>
          <tr className="text-left text-muted-foreground border-b border-border">
            <th className="py-2">Range</th><th>Rate</th><th className="text-right">Tax</th>
          </tr>
        </thead>
        <tbody>
          {result.breakdown.map((b, i) => (
            <tr key={i} className="border-b border-border">
              <td className="py-2">{b.range}</td>
              <td>{b.rate}</td>
              <td className="text-right">{b.tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageShell>
  );
}
