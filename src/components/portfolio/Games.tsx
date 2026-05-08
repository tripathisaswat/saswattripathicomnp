import { AppDialog } from "@/components/apps/AppDialog";
import TicTacToeApp from "@/components/apps/games/TicTacToeApp";
import ConnectFourApp from "@/components/apps/games/ConnectFourApp";
import SnakeApp from "@/components/apps/games/SnakeApp";
import ConnectDotsApp from "@/components/apps/games/ConnectDotsApp";
import DinoApp from "@/components/apps/games/DinoApp";
import MemoryApp from "@/components/apps/games/MemoryApp";

const games = [
  { name: "Connect Four", icon: "🔴", desc: "Classic strategy", label: "games/connect-four", Comp: ConnectFourApp },
  { name: "Tic Tac Toe", icon: "❌", desc: "Traditional 3x3 grid", label: "games/tic-tac-toe", Comp: TicTacToeApp },
  { name: "Snake", icon: "🐍", desc: "Classic arcade", label: "games/snake", Comp: SnakeApp },
  { name: "Connect Dots", icon: "⚫", desc: "Dots & boxes", label: "games/connect-dots", Comp: ConnectDotsApp },
  { name: "Dino Runner", icon: "🦕", desc: "Endless runner", label: "games/dino", Comp: DinoApp },
  { name: "Memory Match", icon: "🧠", desc: "Memory cards", label: "games/memory", Comp: MemoryApp },
];

export const Games = () => (
  <section id="games" className="py-32 px-6 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <p className="section-label mb-4">play.now()</p>
      <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl">
        Interactive games<span className="text-primary">.</span>
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-16">
        Fun browser games — play instantly in a popup.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {games.map((g) => {
          const Comp = g.Comp;
          return (
            <AppDialog
              key={g.name}
              label={g.label}
              title={g.name}
              trigger={
                <button className="bg-background p-8 group hover:bg-card transition-colors flex flex-col text-left w-full">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left">{g.icon}</div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{g.name}</h3>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{g.desc}</p>
                  <div className="font-mono text-xs uppercase tracking-wider mt-6 text-primary">[ play ]</div>
                </button>
              }
            >
              <Comp />
            </AppDialog>
          );
        })}
      </div>
    </div>
  </section>
);
