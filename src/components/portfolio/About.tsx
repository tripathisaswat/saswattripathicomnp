const skills = [
  "Project Management", "ERP Systems", "Blazor", ".NET", "C#",
  "React", "TypeScript", "Node.js", "PostgreSQL", "DevOps",
  "AI Agents", "LLMs", "System Architecture", "Consulting",
];

const stats = [
  { v: "5+", l: "Years exp" },
  { v: "ERP", l: "Specialist" },
  { v: "AI", l: "Agents built" },
  { v: "PM", l: "Role" },
];

const bars = [
  { l: "Project Management", v: 95 },
  { l: "ERP / Backend", v: 92 },
  { l: "AI Agents & Consulting", v: 88 },
];

export const About = () => (
  <section id="about" className="relative py-32 px-6 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <p className="section-label mb-4">about.me</p>
      <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold mb-16 max-w-3xl">
        Crafting digital experiences for the modern web<span className="text-primary">.</span>
      </h2>

      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            I'm a <span className="text-foreground">Project Manager</span> at Neosoftware,
            based in Lalitpur, Nepal — with <span className="text-foreground">5+ years</span>{" "}
            building and leading the development of home-grown ERP systems.
          </p>
          <p>
            I also <span className="text-foreground">consult</span> on ERP, software architecture
            and digital strategy, and I <span className="text-foreground">build AI agents</span>{" "}
            that automate real workflows for businesses in Nepal and beyond.
          </p>
        </div>

        <div className="space-y-5">
          {bars.map((b) => (
            <div key={b.l}>
              <div className="flex justify-between font-mono text-xs mb-2">
                <span className="text-foreground">{b.l}</span>
                <span className="text-primary">{b.v}%</span>
              </div>
              <div className="h-1 bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000"
                  style={{ width: `${b.v}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-20">
        {stats.map((s) => (
          <div key={s.l} className="bg-background p-8">
            <div className="font-sans text-4xl lg:text-5xl font-bold text-primary">{s.v}</div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-2">
              {s.l}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden border-y border-border py-6">
        <div className="flex marquee whitespace-nowrap">
          {[...skills, ...skills, ...skills].map((s, i) => (
            <span
              key={i}
              className="font-mono text-2xl lg:text-4xl font-bold text-muted-foreground/40 mx-8"
            >
              {s} <span className="text-primary">/</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);
