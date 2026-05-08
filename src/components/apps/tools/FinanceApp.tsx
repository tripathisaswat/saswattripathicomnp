import { useMemo, useState } from "react";

const RATES: Record<string, number> = {
  USD: 133.5, EUR: 145.2, GBP: 169.8, INR: 1.6, AUD: 86.5, JPY: 0.86, CNY: 18.4, AED: 36.4,
};

const NEPSE_SAMPLE = [
  { ticker: "NABIL", name: "Nabil Bank", price: 510, change: 1.2 },
  { ticker: "NRIC", name: "Nepal Reinsurance", price: 920, change: -0.4 },
  { ticker: "NTC", name: "Nepal Telecom", price: 850, change: 2.1 },
  { ticker: "UPPER", name: "Upper Tamakoshi", price: 380, change: 0.6 },
  { ticker: "CHCL", name: "Chilime Hydropower", price: 525, change: -1.0 },
];

export default function FinanceApp() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const npr = useMemo(() => (parseFloat(amount) || 0) * RATES[from], [amount, from]);

  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">Forex (NPR)</h3>
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
          className="bg-card border border-border px-3 py-2 font-mono" />
        <select value={from} onChange={(e) => setFrom(e.target.value)}
          className="bg-card border border-border px-3 py-2 font-mono">
          {Object.keys(RATES).map((k) => <option key={k}>{k}</option>)}
        </select>
        <div className="bg-card border border-border px-3 py-2 font-mono">
          = NPR {npr.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
      </div>

      <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-3 mt-6">NEPSE snapshot</h3>
      <table className="w-full font-mono text-xs">
        <thead>
          <tr className="text-left text-muted-foreground border-b border-border">
            <th className="py-2">Ticker</th><th>Name</th>
            <th className="text-right">Price</th><th className="text-right">%</th>
          </tr>
        </thead>
        <tbody>
          {NEPSE_SAMPLE.map((s) => (
            <tr key={s.ticker} className="border-b border-border">
              <td className="py-2 text-primary">{s.ticker}</td>
              <td>{s.name}</td>
              <td className="text-right">{s.price}</td>
              <td className={`text-right ${s.change >= 0 ? "text-primary" : "text-destructive"}`}>
                {s.change >= 0 ? "+" : ""}{s.change}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
