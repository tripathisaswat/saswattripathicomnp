import { ArrowUpRight } from "lucide-react";

const tools = [
  { name: "Nepal Calendar", desc: "Multi-calendar system with festivals & events", path: "/calendar" },
  { name: "Tax Calculator", desc: "Nepal tax calculation and planning tools", path: "/tax-calculator" },
  { name: "Finance Tools", desc: "NEPSE, forex, and market analysis", path: "/finance" },
  { name: "Weather Portal", desc: "Weather forecasts for Nepal cities", path: "/weather" },
  { name: "Unicode Converter", desc: "Nepali text conversion tools", path: "/tools" },
  { name: "Nepal Explorer", desc: "Discover Nepal's culture and facts", path: "/explore" },
];

export const Tools = () => (
  <section id="tools" className="py-32 px-6 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <p className="section-label mb-4">tools.forNepal()</p>
      <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl">
        Digital solutions for Nepal<span className="text-primary">.</span>
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-16">
        A collection of tools and services built specifically for the Nepalese community.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {tools.map((t, i) => (
          <a
            key={t.name}
            href={t.path}
            className="bg-background p-8 group hover-lift relative block"
          >
            <div className="font-mono text-xs text-muted-foreground mb-6">
              0{i + 1} / 0{tools.length}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {t.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-8">{t.desc}</p>
            <div className="font-mono text-xs uppercase tracking-wider text-primary inline-flex items-center gap-2">
              Explore <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
