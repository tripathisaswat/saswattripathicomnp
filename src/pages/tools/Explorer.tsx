import { PageShell } from "@/components/portfolio/PageShell";

const FACTS = [
  { k: "Capital", v: "Kathmandu" },
  { k: "Population", v: "~30 million" },
  { k: "Area", v: "147,516 km²" },
  { k: "Provinces", v: "7" },
  { k: "Languages", v: "Nepali (official), 123+ others" },
  { k: "Highest peak", v: "Mt. Everest (8,848.86 m)" },
  { k: "Currency", v: "Nepalese Rupee (NPR)" },
  { k: "Time zone", v: "NPT (UTC+5:45)" },
];

const PLACES = [
  { name: "Kathmandu Valley", desc: "7 UNESCO World Heritage Sites" },
  { name: "Pokhara", desc: "Lakes, paragliding, Annapurna views" },
  { name: "Lumbini", desc: "Birthplace of Lord Buddha" },
  { name: "Chitwan National Park", desc: "Rhinos, tigers, jungle safari" },
  { name: "Everest Base Camp", desc: "World's most iconic trek" },
  { name: "Mustang", desc: "Forbidden kingdom, Tibetan culture" },
];

export default function Explorer() {
  return (
    <PageShell label="tools/explore" title="Nepal Explorer">
      <h2 className="font-mono text-xs uppercase tracking-wider text-primary mb-4">Quick facts</h2>
      <div className="grid sm:grid-cols-2 gap-px bg-border mb-12">
        {FACTS.map((f) => (
          <div key={f.k} className="bg-card p-5">
            <p className="font-mono text-xs text-muted-foreground">{f.k}</p>
            <p className="text-lg font-bold mt-1">{f.v}</p>
          </div>
        ))}
      </div>

      <h2 className="font-mono text-xs uppercase tracking-wider text-primary mb-4">Iconic places</h2>
      <div className="space-y-px bg-border">
        {PLACES.map((p) => (
          <div key={p.name} className="bg-card p-5">
            <p className="text-lg font-bold">{p.name}</p>
            <p className="font-mono text-sm text-muted-foreground mt-1">{p.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
