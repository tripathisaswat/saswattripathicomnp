import { useEffect, useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

const W = 9, H = 9, MINES = 10;

type Cell = { mine: boolean; open: boolean; flag: boolean; n: number };

const build = (): Cell[] => {
  const cells: Cell[] = Array.from({ length: W * H }, () => ({ mine: false, open: false, flag: false, n: 0 }));
  let placed = 0;
  while (placed < MINES) {
    const i = Math.floor(Math.random() * W * H);
    if (!cells[i].mine) {
      cells[i].mine = true;
      placed++;
    }
  }
  const around = (i: number) => {
    const x = i % W, y = Math.floor(i / W);
    const out: number[] = [];
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if ((dx || dy) && nx >= 0 && nx < W && ny >= 0 && ny < H) out.push(ny * W + nx);
      }
    return out;
  };
  cells.forEach((c, i) => {
    c.n = around(i).filter((j) => cells[j].mine).length;
  });
  return cells;
};

const neighbours = (i: number) => {
  const x = i % W, y = Math.floor(i / W);
  const out: number[] = [];
  for (let dy = -1; dy <= 1; dy++)
    for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if ((dx || dy) && nx >= 0 && nx < W && ny >= 0 && ny < H) out.push(ny * W + nx);
    }
  return out;
};

const MinesweeperApp = () => {
  const [cells, setCells] = useState<Cell[]>(build);
  const [state, setState] = useState<"play" | "won" | "lost">("play");
  const [secs, setSecs] = useState(0);
  const { best, submit } = useHighScore("Minesweeper", true);

  useEffect(() => {
    if (state !== "play") return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [state]);

  const reset = () => {
    setCells(build());
    setState("play");
    setSecs(0);
  };

  const open = (i: number) => {
    if (state !== "play" || cells[i].open || cells[i].flag) return;
    const next = cells.map((c) => ({ ...c }));
    if (next[i].mine) {
      next.forEach((c) => {
        if (c.mine) c.open = true;
      });
      setCells(next);
      setState("lost");
      return;
    }
    const stack = [i];
    while (stack.length) {
      const j = stack.pop()!;
      if (next[j].open || next[j].flag) continue;
      next[j].open = true;
      if (next[j].n === 0) neighbours(j).forEach((k) => !next[k].open && stack.push(k));
    }
    setCells(next);
    if (next.every((c) => c.open || c.mine)) {
      setState("won");
      submit(secs);
    }
  };

  const flag = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    if (state !== "play" || cells[i].open) return;
    setCells(cells.map((c, j) => (j === i ? { ...c, flag: !c.flag } : c)));
  };

  const flags = cells.filter((c) => c.flag).length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between font-mono text-xs">
        <span>💣 {MINES - flags}</span>
        <span className="text-primary">{secs}s</span>
        <span className="text-muted-foreground">BEST {best ? `${best}s` : "—"}</span>
      </div>

      <div className="grid gap-px bg-border mx-auto w-fit" style={{ gridTemplateColumns: `repeat(${W}, minmax(0,1fr))` }}>
        {cells.map((c, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            onContextMenu={(e) => flag(e, i)}
            className={`w-8 h-8 sm:w-9 sm:h-9 font-mono text-sm font-bold flex items-center justify-center transition-colors ${
              c.open ? (c.mine ? "bg-destructive text-destructive-foreground" : "bg-card") : "bg-secondary hover:bg-secondary/70"
            }`}
          >
            {c.open ? (c.mine ? "💥" : c.n || "") : c.flag ? "🚩" : ""}
          </button>
        ))}
      </div>

      <p className="text-center font-mono text-xs text-muted-foreground">
        Left click to open, right click to flag
      </p>
      {state === "won" && <p className="text-center font-mono text-sm text-primary">Cleared in {secs}s</p>}
      {state === "lost" && <p className="text-center font-mono text-sm text-destructive">Boom.</p>}

      <div className="text-center">
        <button onClick={reset} className="btn-gold">New game</button>
      </div>
    </div>
  );
};

export default MinesweeperApp;
