const SITE = "https://www.saswattripathi.com.np";
const games = [
  { name: "Connect Four", icon: "🔴", desc: "Classic strategy", path: `${SITE}/games/connect-four` },
  { name: "Tic Tac Toe", icon: "❌", desc: "Traditional 3x3 grid", path: `${SITE}/games/tic-tac-toe` },
  { name: "Snake", icon: "🐍", desc: "Classic arcade", path: `${SITE}/games/snake` },
  { name: "Connect Dots", icon: "⚫", desc: "Puzzle solver", path: `${SITE}/games/connect-dots` },
  { name: "Dino Runner", icon: "🦕", desc: "Endless runner", path: `${SITE}/games/dino-runner` },
  { name: "Memory Match", icon: "🧠", desc: "Memory cards", path: `${SITE}/games/memory-match` },
];

export const Games = () => (
  <section id="games" className="py-32 px-6 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <p className="section-label mb-4">play.now()</p>
      <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl">
        Interactive games<span className="text-primary">.</span>
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-16">
        Fun browser games built with modern web tech. Take a break and challenge yourself.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {games.map((g) => (
          <a
            key={g.name}
            href={g.path}
            className="bg-background p-8 group hover:bg-card transition-colors flex flex-col"
          >
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left">
              {g.icon}
            </div>
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
              {g.name}
            </h3>
            <p className="font-mono text-xs text-muted-foreground mt-1">{g.desc}</p>
            <div className="font-mono text-xs uppercase tracking-wider text-primary mt-6">
              [ play ]
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
