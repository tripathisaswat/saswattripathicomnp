import { useState } from "react";
import { Briefcase, Code2, Database, Rocket, Crown } from "lucide-react";

const jobs = [
  {
    role: "Flow Worker",
    co: "CloudFactory",
    period: "Dec 2018 — Nov 2019",
    location: "Nepal",
    level: "Entry",
    icon: Database,
    desc: "Started the journey processing data across distributed workflows. Learning the ropes of analytics at scale.",
    bullets: ["Data Analytics", "Intelligence Analysis"],
  },
  {
    role: "Data Quality Analyst",
    co: "CloudFactory",
    period: "Jan 2019 — Nov 2019",
    location: "Nepal",
    level: "Junior",
    icon: Database,
    desc: "Promoted to QA. Owned data quality on cloud-based pipelines and intelligence analysis tasks.",
    bullets: ["Intelligence Analysis", "HUMINT", "Data QA"],
  },
  {
    role: "Junior Consultant",
    co: "Neosoftware Pvt. Ltd.",
    period: "May 2021 — Mar 2022",
    location: "Kathmandu, Nepal",
    level: "Mid",
    icon: Code2,
    desc: "Switched lanes into software. ERP consulting on SAP, building database and backend foundations.",
    bullets: ["RDBMS", "ASP.NET MVC", "SAP", "Consulting"],
  },
  {
    role: "Senior Developer / Team Lead",
    co: "Neosoftware Pvt. Ltd.",
    period: "Mar 2022 — Jul 2025",
    location: "Jhamsikhel, Lalitpur",
    level: "Senior",
    icon: Rocket,
    desc: "Architected and built a home-grown ERP system from the ground up. Leading the engineering team end-to-end.",
    bullets: ["Blazor", ".NET", "PostgreSQL", "DevOps", "CI/CD", "Architecture"],
  },
  {
    role: "Project Manager",
    co: "Neosoftware Pvt. Ltd.",
    period: "Jul 2025 — Present",
    location: "Jhamsikhel, Lalitpur",
    level: "Lead",
    icon: Crown,
    desc: "Now leading teams to streamline operations, enhance UX, and ship scalable ERP for modern businesses.",
    bullets: ["Project Management", "Planning", "Team Leadership", "ERP Strategy"],
  },
];

export const Experience = () => {
  const [active, setActive] = useState(jobs.length - 1);
  const job = jobs[active];
  const Icon = job.icon;
  const progress = ((active + 1) / jobs.length) * 100;

  return (
    <section id="experience" className="py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <p className="section-label mb-4">career.timeline</p>
        <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl">
          From flow worker to PM<span className="text-primary">.</span>
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          A 7-year climb. Click any milestone to revisit the chapter.
        </p>

        {/* Progress bar */}
        <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Entry</span>
          <span>Junior</span>
          <span>Mid</span>
          <span>Senior</span>
          <span className="text-primary">Lead</span>
        </div>
        <div className="h-1 bg-border relative mb-8">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Timeline dots */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
          <div className="relative flex justify-between">
            {jobs.map((j, i) => {
              const JIcon = j.icon;
              const isActive = i === active;
              const isPast = i <= active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="group flex flex-col items-center gap-3 relative z-10"
                >
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-primary border-primary text-primary-foreground scale-125 shadow-[0_0_30px_hsl(var(--primary)/0.6)]"
                        : isPast
                        ? "bg-background border-primary text-primary"
                        : "bg-background border-border text-muted-foreground group-hover:border-primary/50"
                    }`}
                  >
                    <JIcon className="w-5 h-5" />
                  </div>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider hidden sm:block transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {j.period.split("—")[0].trim().split(" ")[1]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active job card */}
        <article
          key={active}
          className="bg-card border border-border p-8 lg:p-12 grid lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary">
              <Icon className="w-4 h-4" />
              {job.level} level
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              <div>{job.period}</div>
              <div className="mt-1">{job.location}</div>
            </div>
            <div className="font-mono text-6xl font-bold text-primary/20">
              0{active + 1}
            </div>
          </div>
          <div className="lg:col-span-8 space-y-5">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground">{job.role}</h3>
              <p className="font-mono text-sm text-muted-foreground mt-2">@ {job.co}</p>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">{job.desc}</p>
            <ul className="flex flex-wrap gap-2 pt-2">
              {job.bullets.map((b) => (
                <li
                  key={b}
                  className="font-mono text-xs text-foreground bg-secondary px-3 py-1.5 border border-border"
                >
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                onClick={() => setActive((i) => Math.max(0, i - 1))}
                disabled={active === 0}
                className="font-mono text-xs uppercase tracking-wider px-4 py-2 border border-border hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              <button
                onClick={() => setActive((i) => Math.min(jobs.length - 1, i + 1))}
                disabled={active === jobs.length - 1}
                className="font-mono text-xs uppercase tracking-wider px-4 py-2 border border-border hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
