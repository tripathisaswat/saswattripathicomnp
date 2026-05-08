import { useMemo, useState } from "react";

export default function LoanApp() {
  const [principal, setPrincipal] = useState("1000000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("5");

  const r = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const R = (parseFloat(rate) || 0) / 12 / 100;
    const N = (parseFloat(years) || 0) * 12;
    if (!P || !N) return { emi: 0, total: 0, interest: 0 };
    const emi = R === 0 ? P / N : (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    return { emi, total: emi * N, interest: emi * N - P };
  }, [principal, rate, years]);

  const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">Calculate monthly loan installment.</p>
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <label className="block">
          <span className="font-mono text-xs text-muted-foreground">Loan amount (NPR)</span>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)}
            className="mt-1 w-full bg-card border border-border px-3 py-2 font-mono" />
        </label>
        <label className="block">
          <span className="font-mono text-xs text-muted-foreground">Annual rate (%)</span>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)}
            className="mt-1 w-full bg-card border border-border px-3 py-2 font-mono" />
        </label>
        <label className="block">
          <span className="font-mono text-xs text-muted-foreground">Years</span>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
            className="mt-1 w-full bg-card border border-border px-3 py-2 font-mono" />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-px bg-border">
        <div className="bg-card p-4">
          <p className="font-mono text-xs text-muted-foreground">Monthly EMI</p>
          <p className="text-xl font-bold text-primary mt-1">NPR {fmt(r.emi)}</p>
        </div>
        <div className="bg-card p-4">
          <p className="font-mono text-xs text-muted-foreground">Total interest</p>
          <p className="text-xl font-bold mt-1">NPR {fmt(r.interest)}</p>
        </div>
        <div className="bg-card p-4">
          <p className="font-mono text-xs text-muted-foreground">Total payable</p>
          <p className="text-xl font-bold mt-1">NPR {fmt(r.total)}</p>
        </div>
      </div>
    </div>
  );
}
