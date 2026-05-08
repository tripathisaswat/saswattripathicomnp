import { useMemo, useState } from "react";

export default function BmiApp() {
  const [h, setH] = useState("170");
  const [w, setW] = useState("65");
  const r = useMemo(() => {
    const H = (parseFloat(h) || 0) / 100;
    const W = parseFloat(w) || 0;
    if (!H) return { bmi: 0, label: "—" };
    const bmi = W / (H * H);
    const label = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
    return { bmi, label };
  }, [h, w]);
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <label className="block">
          <span className="font-mono text-xs text-muted-foreground">Height (cm)</span>
          <input type="number" value={h} onChange={(e) => setH(e.target.value)}
            className="mt-1 w-full bg-card border border-border px-3 py-2 font-mono" />
        </label>
        <label className="block">
          <span className="font-mono text-xs text-muted-foreground">Weight (kg)</span>
          <input type="number" value={w} onChange={(e) => setW(e.target.value)}
            className="mt-1 w-full bg-card border border-border px-3 py-2 font-mono" />
        </label>
      </div>
      <div className="bg-card border border-border p-5">
        <p className="font-mono text-xs text-muted-foreground">BMI</p>
        <p className="text-4xl font-bold text-primary mt-1">{r.bmi.toFixed(1)}</p>
        <p className="font-mono text-sm mt-2">{r.label}</p>
      </div>
    </div>
  );
}
