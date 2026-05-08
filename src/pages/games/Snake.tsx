import { useEffect, useRef, useState } from "react";
import { PageShell } from "@/components/portfolio/PageShell";

const SIZE = 20;

export default function Snake() {
  const [snake, setSnake] = useState<number[][]>([[10, 10]]);
  const [food, setFood] = useState<number[]>([5, 5]);
  const [dir, setDir] = useState<number[]>([0, 1]);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);
  const dirRef = useRef(dir);
  dirRef.current = dir;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, number[]> = {
        ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1],
      };
      const nd = map[e.key];
      if (!nd) return;
      const [dr, dc] = dirRef.current;
      if (dr === -nd[0] && dc === -nd[1]) return;
      setDir(nd);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (over) return;
    const id = setInterval(() => {
      setSnake((s) => {
        const head = [s[0][0] + dirRef.current[0], s[0][1] + dirRef.current[1]];
        if (head[0] < 0 || head[0] >= SIZE || head[1] < 0 || head[1] >= SIZE
          || s.some(([r, c]) => r === head[0] && c === head[1])) {
          setOver(true);
          return s;
        }
        const ate = head[0] === food[0] && head[1] === food[1];
        const ns = [head, ...s];
        if (!ate) ns.pop();
        else {
          setScore((x) => x + 1);
          setFood([Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)]);
        }
        return ns;
      });
    }, 120);
    return () => clearInterval(id);
  }, [over, food]);

  const reset = () => {
    setSnake([[10, 10]]);
    setFood([5, 5]);
    setDir([0, 1]);
    setOver(false);
    setScore(0);
  };

  return (
    <PageShell label="games/snake" title="Snake">
      <p className="font-mono text-sm text-muted-foreground mb-6">
        Score: {score} {over && "— Game Over"} · Use arrow keys
      </p>
      <div
        className="inline-grid bg-card border border-border"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 16px)` }}
      >
        {Array.from({ length: SIZE * SIZE }).map((_, i) => {
          const r = Math.floor(i / SIZE), c = i % SIZE;
          const isSnake = snake.some(([sr, sc]) => sr === r && sc === c);
          const isFood = food[0] === r && food[1] === c;
          return (
            <div
              key={i}
              className={`w-4 h-4 ${isSnake ? "bg-primary" : isFood ? "bg-accent" : ""}`}
            />
          );
        })}
      </div>
      <div className="mt-6 flex gap-2 sm:hidden">
        {[["▲", [-1, 0]], ["◀", [0, -1]], ["▼", [1, 0]], ["▶", [0, 1]]].map(([l, d]) => (
          <button
            key={l as string}
            onClick={() => setDir(d as number[])}
            className="w-12 h-12 border border-border bg-card"
          >{l as string}</button>
        ))}
      </div>
      <button onClick={reset} className="mt-6 font-mono text-xs uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors">
        [ reset ]
      </button>
    </PageShell>
  );
}
