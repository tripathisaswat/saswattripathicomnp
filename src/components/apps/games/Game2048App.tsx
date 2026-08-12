import { useCallback, useEffect, useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

type Grid = number[];
const SIZE = 4;

const empty = (): Grid => Array(SIZE * SIZE).fill(0);

const addTile = (g: Grid): Grid => {
  const free = g.map((v, i) => (v === 0 ? i : -1)).filter((i) => i >= 0);
  if (!free.length) return g;
  const n = [...g];
  n[free[Math.floor(Math.random() * free.length)]] = Math.random() < 0.9 ? 2 : 4;
  return n;
};

const slide = (row: number[]) => {
  const arr = row.filter((v) => v);
  let gained = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      gained += arr[i];
      arr.splice(i + 1, 1);
    }
  }
  while (arr.length < SIZE) arr.push(0);
  return { arr, gained };
};

const rotate = (g: Grid): Grid => {
  const n = empty();
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) n[c * SIZE + (SIZE - 1 - r)] = g[r * SIZE + c];
  return n;
};

const move = (g: Grid, dir: number) => {
  let grid = [...g];
  for (let i = 0; i < dir; i++) grid = rotate(grid);
  let gained = 0;
  const out = empty();
  for (let r = 0; r < SIZE; r++) {
    const { arr, gained: gd } = slide(grid.slice(r * SIZE, r * SIZE + SIZE));
    gained += gd;
    for (let c = 0; c < SIZE; c++) out[r * SIZE + c] = arr[c];
  }
  let res = out;
  for (let i = 0; i < (4 - dir) % 4; i++) res = rotate(res);
  return { grid: res, gained };
};

const tileClass = (v: number) => {
  if (!v) return "bg-secondary/40 text-transparent";
  if (v < 8) return "bg-secondary text-foreground";
  if (v < 64) return "bg-primary/30 text-foreground";
  if (v < 512) return "bg-primary/60 text-primary-foreground";
  return "bg-primary text-primary-foreground";
};

const Game2048 = () => {
  const [grid, setGrid] = useState<Grid>(() => addTile(addTile(empty())));
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const { best, submit } = useHighScore("2048");

  const reset = () => {
    setGrid(addTile(addTile(empty())));
    setScore(0);
    setOver(false);
  };

  const push = useCallback(
    (dir: number) => {
      if (over) return;
      setGrid((g) => {
        const { grid: ng, gained } = move(g, dir);
        if (ng.every((v, i) => v === g[i])) return g;
        setScore((s) => s + gained);
        const withTile = addTile(ng);
        const stuck = [0, 1, 2, 3].every((d) => {
          const m = move(withTile, d).grid;
          return m.every((v, i) => v === withTile[i]);
        });
        if (stuck) setOver(true);
        return withTile;
      });
    },
    [over]
  );

  useEffect(() => {
    if (over) submit(score);
  }, [over, score, submit]);

  useEffect(() => {
    const keys: Record<string, number> = { ArrowUp: 1, ArrowRight: 2, ArrowDown: 3, ArrowLeft: 0 };
    const onKey = (e: KeyboardEvent) => {
      if (e.key in keys) {
        e.preventDefault();
        push(keys[e.key]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [push]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between font-mono text-xs">
        <span>SCORE <span className="text-primary text-base">{score}</span></span>
        <span className="text-muted-foreground">BEST {best ?? 0}</span>
      </div>

      <div className="grid grid-cols-4 gap-2 bg-border p-2 max-w-sm mx-auto">
        {grid.map((v, i) => (
          <div
            key={i}
            className={`aspect-square flex items-center justify-center font-mono font-bold text-lg sm:text-xl transition-colors ${tileClass(v)}`}
          >
            {v || 0}
          </div>
        ))}
      </div>

      {over && <p className="text-center font-mono text-sm text-destructive">Game over</p>}

      <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto">
        <span />
        <button onClick={() => push(1)} className="btn-ghost justify-center min-h-11" aria-label="Up">↑</button>
        <span />
        <button onClick={() => push(0)} className="btn-ghost justify-center min-h-11" aria-label="Left">←</button>
        <button onClick={() => push(3)} className="btn-ghost justify-center min-h-11" aria-label="Down">↓</button>
        <button onClick={() => push(2)} className="btn-ghost justify-center min-h-11" aria-label="Right">→</button>
      </div>

      <div className="text-center">
        <button onClick={reset} className="btn-gold">New game</button>
      </div>
    </div>
  );
};

export default Game2048;
