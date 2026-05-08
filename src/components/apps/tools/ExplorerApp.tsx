const FACTS = [
  { k: "Capital", v: "Kathmandu" },
  { k: "Population", v: "~30 million" },
  { k: "Area", v: "147,516 km²" },
  { k: "Provinces", v: "7" },
  { k: "Languages", v: "Nepali + 123 others" },
  { k: "Highest peak", v: "Everest 8,848.86 m" },
  { k: "Currency", v: "NPR" },
  { k: "Time zone", v: "UTC+5:45" },
];

const PLACES = [
  { name: "Kathmandu Valley", desc: "7 UNESCO World Heritage Sites" },
  { name: "Pokhara", desc: "Lakes, paragliding, Annapurna views" },
  { name: "Lumbini", desc: "Birthplace of Lord Buddha" },
  { name: "Chitwan National Park", desc: "Rhinos, tigers, jungle safari" },
  { name: "Everest Base Camp", desc: "World's most iconic trek" },
  { name: "Mustang", desc: "Forbidden kingdom, Tibetan culture" },
];

export default function ExplorerApp() {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">Quick facts</h3>
      <div className="grid sm:grid-cols-2 gap-px bg-border mb-6">
        {FACTS.map((f) => (
          <div key={f.k} className="bg-card p-4">
            <p className="font-mono text-xs text-muted-foreground">{f.k}</p>
            <p className="text-base font-bold mt-1">{f.v}</p>
          </div>
        ))}
      </div>
      <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">Iconic places</h3>
      <div className="space-y-px bg-border">
        {PLACES.map((p) => (
          <div key={p.name} className="bg-card p-4">
            <p className="text-base font-bold">{p.name}</p>
            <p className="font-mono text-xs text-muted-foreground mt-1">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
