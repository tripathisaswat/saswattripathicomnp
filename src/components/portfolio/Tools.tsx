import { ArrowUpRight, Lock } from "lucide-react";

type Tool = { name: string; desc: string; href?: string };

const tools: Tool[] = [
  { name: "Nepal Calendar", desc: "Multi-calendar system with festivals & events" },
  { name: "Tax Calculator", desc: "Nepal tax calculation and planning tools" },
  { name: "Finance Tools", desc: "NEPSE, forex, and market analysis" },
  { name: "Weather Portal", desc: "Weather forecasts for Nepal cities" },
  { name: "Unicode Converter", desc: "Nepali text conversion tools" },
  { name: "Nepal Explorer", desc: "Discover Nepal's culture and facts" },
];

export const Tools = () => (
  <section id="tools" className="py-32 px-6 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <p className="section-label mb-4">tools.forNepal()</p>
      <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl">
        Digital solutions for Nepal<span className="text-primary">.</span>
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-16">
        A collection of tools and services built for the Nepalese community. More launching soon.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {tools.map((t, i) => {
          const Card = (
            <>
              <div className="font-mono text-xs text-muted-foreground mb-6 flex items-center justify-between">
                <span>0{i + 1} / 0{tools.length}</span>
                {!t.href && (
                  <span className="inline-flex items-center gap-1 text-primary/70">
                    <Lock size={10} /> soon
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {t.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-8">{t.desc}</p>
              <div className="font-mono text-xs uppercase tracking-wider text-primary inline-flex items-center gap-2">
                {t.href ? (
                  <>
                    Explore <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                ) : (
                  <span className="text-muted-foreground">[ coming soon ]</span>
                )}
              </div>
            </>
          );

          return t.href ? (
            <a key={t.name} href={t.href} target="_blank" rel="noreferrer" className="bg-background p-8 group hover-lift relative block">
              {Card}
            </a>
          ) : (
            <div key={t.name} className="bg-background p-8 group relative block opacity-90">
              {Card}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
