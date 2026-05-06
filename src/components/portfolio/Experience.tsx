const jobs = [
  {
    role: "Senior Software Developer",
    co: "NeoSoftware Pvt. Ltd.",
    period: "2021 — Present",
    desc: "Leading ERP development projects and managing a team of developers.",
    bullets: [
      "Led development of enterprise ERP solutions",
      "Managed team of 5+ developers",
      "Improved system performance by 40%",
      "Implemented CI/CD pipelines",
    ],
  },
  {
    role: "Software Developer",
    co: "CodexOrient",
    period: "2019 — 2021",
    desc: "Developed custom software solutions for finance and healthcare sectors.",
    bullets: [
      "Built mobile applications using Flutter",
      "Implemented secure authentication systems",
      "Created data visualization dashboards",
      "Worked with healthcare compliance standards",
    ],
  },
  {
    role: "Junior Developer",
    co: "CloudFactory",
    period: "2017 — 2019",
    desc: "Started career in cloud-based data processing applications.",
    bullets: [
      "Developed data processing pipelines",
      "Worked with machine learning models",
      "Contributed to internal tools development",
      "Learned cloud technologies and best practices",
    ],
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
            key={j.co}
            className="bg-background p-8 lg:p-10 grid lg:grid-cols-12 gap-6 group hover:bg-card transition-colors"
          >
            <div className="lg:col-span-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <div className="text-primary mb-1">0{i + 1}</div>
              {j.period}
            </div>
            <div className="lg:col-span-9 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {j.role}
                </h3>
                <p className="font-mono text-sm text-muted-foreground mt-1">@ {j.co}</p>
              </div>
              <p className="text-muted-foreground">{j.desc}</p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {j.bullets.map((b) => (
                  <li
                    key={b}
                    className="font-mono text-xs text-muted-foreground flex gap-2"
                  >
                    <span className="text-primary">▸</span> {b}
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
