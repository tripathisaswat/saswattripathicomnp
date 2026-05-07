const jobs = [
  {
    role: "Project Manager",
    co: "Neosoftware Pvt. Ltd.",
    period: "Jul 2025 — Present",
    location: "Jhamsikhel, Lalitpur",
    desc: "Leading a talented team to streamline operations, enhance UX, and deliver scalable ERP solutions for modern businesses.",
    bullets: ["Project Management", "Project Planning", "Team Leadership", "ERP Strategy"],
  },
  {
    role: "Senior Software Developer / Team Lead",
    co: "Neosoftware Pvt. Ltd.",
    period: "Mar 2022 — Jul 2025",
    location: "Jhamsikhel, Lalitpur",
    desc: "Architected and built a home-grown ERP system from the ground up.",
    bullets: ["Blazor", "DevOps", ".NET", "PostgreSQL", "System Architecture", "CI/CD"],
  },
  {
    role: "Junior Consultant",
    co: "Neosoftware Pvt. Ltd.",
    period: "May 2021 — Mar 2022",
    location: "Kathmandu, Nepal",
    desc: "ERP consulting on the SAP system; database and backend foundations.",
    bullets: ["RDBMS", "ASP.NET MVC", "SAP", "Consulting"],
  },
  {
    role: "Data Quality Analyst",
    co: "CloudFactory",
    period: "Jan 2019 — Nov 2019",
    location: "Nepal",
    desc: "Intelligence analysis and data quality on cloud-based pipelines.",
    bullets: ["Intelligence Analysis", "HUMINT", "Data QA"],
  },
  {
    role: "Flow Worker",
    co: "CloudFactory",
    period: "Dec 2018 — Nov 2019",
    location: "Nepal",
    desc: "Data analytics and processing across distributed workflows.",
    bullets: ["Data Analytics", "Intelligence Analysis"],
  },
];

export const Experience = () => (
  <section id="experience" className="py-32 px-6 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <p className="section-label mb-4">work.history</p>
      <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold mb-16 max-w-3xl">
        Professional journey<span className="text-primary">.</span>
      </h2>

      <div className="space-y-px bg-border">
        {jobs.map((j, i) => (
          <article
            key={i}
            className="bg-background p-8 lg:p-10 grid lg:grid-cols-12 gap-6 group hover:bg-card transition-colors"
          >
            <div className="lg:col-span-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <div className="text-primary mb-1">0{i + 1}</div>
              {j.period}
              <div className="mt-1 normal-case tracking-normal">{j.location}</div>
            </div>
            <div className="lg:col-span-9 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {j.role}
                </h3>
                <p className="font-mono text-sm text-muted-foreground mt-1">@ {j.co}</p>
              </div>
              <p className="text-muted-foreground">{j.desc}</p>
              <ul className="flex flex-wrap gap-2">
                {j.bullets.map((b) => (
                  <li
                    key={b}
                    className="font-mono text-xs text-muted-foreground border border-border px-2 py-1"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
