import { useEffect, useRef, useState } from "react";

const SIZE = 16;

export default function SnakeApp() {
  const [snake, setSnake] = useState<number[][]>([[8, 8]]);
  const [food, setFood] = useState<number[]>([4, 4]);
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
      e.preventDefault();
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
          setOver(true); return s;
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
    }, 130);
    return () => clearInterval(id);
  }, [over, food]);

  const reset = () => {
    setSnake([[8, 8]]); setFood([4, 4]); setDir([0, 1]); setOver(false); setScore(0);
  };

  return (
    <div>
      <p className="font-mono text-sm text-muted-foreground mb-4">
        Score: {score} {over && "— Game Over"} · Arrow keys
      </p>
      <div className="inline-grid bg-card border border-border" style={{ gridTemplateColumns: `repeat(${SIZE}, 16px)` }}>
        {Array.from({ length: SIZE * SIZE }).map((_, i) => {
          const r = Math.floor(i / SIZE), c = i % SIZE;
          const isSnake = snake.some(([sr, sc]) => sr === r && sc === c);
          const isFood = food[0] === r && food[1] === c;
          return <div key={i} className={`w-4 h-4 ${isSnake ? "bg-primary" : isFood ? "bg-accent" : ""}`} />;
        })}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 max-w-[180px] sm:hidden">
        <div /><button onClick={() => setDir([-1, 0])} className="h-12 border border-border bg-card">▲</button><div />
        <button onClick={() => setDir([0, -1])} className="h-12 border border-border bg-card">◀</button>
        <button onClick={() => setDir([1, 0])} className="h-12 border border-border bg-card">▼</button>
        <button onClick={() => setDir([0, 1])} className="h-12 border border-border bg-card">▶</button>
      </div>
      <button onClick={reset} className="mt-6 font-mono text-xs uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground">
        [ reset ]
      </button>
    </div>
  );
}
