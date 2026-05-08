import { useEffect, useState } from "react";
import { PageShell } from "@/components/portfolio/PageShell";

const EMOJIS = ["🌸", "🍕", "🚀", "🎸", "⚡", "🌙", "🔥", "🎲"];

export default function Memory() {
  const [cards, setCards] = useState<{ v: string; flipped: boolean; matched: boolean }[]>([]);
  const [picks, setPicks] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const init = () => {
    const arr = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((v) => ({ v, flipped: false, matched: false }));
    setCards(arr);
    setPicks([]);
    setMoves(0);
  };

  useEffect(init, []);

  const click = (i: number) => {
    if (cards[i].flipped || picks.length === 2) return;
    const nc = cards.slice();
    nc[i] = { ...nc[i], flipped: true };
    const np = [...picks, i];
    setCards(nc);
    setPicks(np);
    if (np.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = np;
      if (nc[a].v === nc[b].v) {
        setTimeout(() => {
          setCards((cs) => cs.map((c, idx) => idx === a || idx === b ? { ...c, matched: true } : c));
          setPicks([]);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((cs) => cs.map((c, idx) => idx === a || idx === b ? { ...c, flipped: false } : c));
          setPicks([]);
        }, 800);
      }
    }
  };

  const won = cards.length > 0 && cards.every((c) => c.matched);

  return (
    <PageShell label="games/memory" title="Memory Match">
      <p className="font-mono text-sm text-muted-foreground mb-6">
        Moves: {moves} {won && "— You won!"}
      </p>
      <div className="grid grid-cols-4 gap-3 max-w-md">
        {cards.map((c, i) => (
          <button
            key={i}
            onClick={() => click(i)}
            className={`aspect-square text-3xl border border-border transition-colors ${
              c.flipped ? "bg-card" : "bg-secondary"
            } ${c.matched ? "opacity-40" : ""}`}
          >
            {c.flipped ? c.v : ""}
          </button>
        ))}
      </div>
      <button onClick={init} className="mt-6 font-mono text-xs uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors">
        [ reset ]
      </button>
    </PageShell>
  );
}
