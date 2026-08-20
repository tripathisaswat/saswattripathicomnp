import { useCallback, useEffect, useRef, useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

const W = 10;
const H = 18;

const SHAPES: number[][][] = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
  [[1, 1, 0], [0, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
];

type Piece = { cells: number[][]; x: number; y: number; kind: number };

const rotate = (m: number[][]) => m[0].map((_, i) => m.map((r) => r[i]).reverse());
const emptyBoard = () => Array.from({ length: H }, () => Array(W).fill(0));

const spawn = (): Piece => {
  const kind = Math.floor(Math.random() * SHAPES.length);
  const cells = SHAPES[kind];
  return { cells, kind: kind + 1, x: Math.floor((W - cells[0].length) / 2), y: 0 };
};

const TetrisApp = () => {
  const [board, setBoard] = useState<number[][]>(emptyBoard);
  const [piece, setPiece] = useState<Piece>(spawn);
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const { best, submit } = useHighScore("Tetris");
  const stateRef = useRef({ board, piece, over, paused });
  stateRef.current = { board, piece, over, paused };

  const collides = useCallback((b: number[][], p: Piece) => {
    for (let r = 0; r < p.cells.length; r++) {
      for (let c = 0; c < p.cells[r].length; c++) {
        if (!p.cells[r][c]) continue;
        const y = p.y + r;
        const x = p.x + c;
        if (x < 0 || x >= W || y >= H) return true;
        if (y >= 0 && b[y][x]) return true;
      }
    }
    return false;
  }, []);

  const step = useCallback(() => {
    const { board: b, piece: p, over: o, paused: pa } = stateRef.current;
    if (o || pa) return;
    const next = { ...p, y: p.y + 1 };
    if (!collides(b, next)) {
      setPiece(next);
      return;
    }
    const nb = b.map((r) => [...r]);
    p.cells.forEach((row, r) =>
      row.forEach((v, c) => {
        if (v && p.y + r >= 0) nb[p.y + r][p.x + c] = p.kind;
      })
    );
    let cleared = 0;
    const filtered = nb.filter((row) => {
      if (row.every((v) => v)) {
        cleared++;
        return false;
      }
      return true;
    });
    while (filtered.length < H) filtered.unshift(Array(W).fill(0));
    if (cleared) setScore((s) => s + [0, 40, 100, 300, 1200][cleared]);
    const fresh = spawn();
    if (collides(filtered, fresh)) {
      setOver(true);
      setScore((s) => {
        submit(s);
        return s;
      });
    } else {
      setPiece(fresh);
    }
    setBoard(filtered);
  }, [collides, submit]);

  useEffect(() => {
    const id = setInterval(step, 500);
    return () => clearInterval(id);
  }, [step]);

  const move = useCallback(
    (dx: number) => {
      const { board: b, piece: p } = stateRef.current;
      const n = { ...p, x: p.x + dx };
      if (!collides(b, n)) setPiece(n);
    },
    [collides]
  );

  const spin = useCallback(() => {
    const { board: b, piece: p } = stateRef.current;
    const n = { ...p, cells: rotate(p.cells) };
    if (!collides(b, n)) setPiece(n);
  }, [collides]);

  const drop = useCallback(() => {
    const { board: b, piece: p } = stateRef.current;
    let y = p.y;
    while (!collides(b, { ...p, y: y + 1 })) y++;
    setPiece({ ...p, y });
  }, [collides]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "].includes(e.key)) e.preventDefault();
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowDown") step();
      if (e.key === "ArrowUp") spin();
      if (e.key === " ") drop();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, spin, step, drop]);

  const reset = () => {
    setBoard(emptyBoard());
    setPiece(spawn());
    setScore(0);
    setOver(false);
  };

  const view = board.map((r) => [...r]);
  piece.cells.forEach((row, r) =>
    row.forEach((v, c) => {
      const y = piece.y + r;
      const x = piece.x + c;
      if (v && y >= 0 && y < H && x >= 0 && x < W) view[y][x] = piece.kind;
    })
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
        <span>score {score}</span>
        <span className="text-muted-foreground">best {best ?? 0}</span>
      </div>
      <div className="grid gap-px bg-border p-px" style={{ gridTemplateColumns: `repeat(${W}, 1.1rem)` }}>
        {view.flatMap((row, y) =>
          row.map((v, x) => (
            <div
              key={`${y}-${x}`}
              className={`h-[1.1rem] w-[1.1rem] ${v ? "bg-primary" : "bg-card"}`}
              style={v ? { opacity: 0.45 + v * 0.08 } : undefined}
            />
          ))
        )}
      </div>
      {over && <p className="font-mono text-sm text-primary">Game over — {score} points</p>}
      <div className="flex flex-wrap justify-center gap-2 font-mono text-xs uppercase tracking-wider">
        <button className="border border-border px-3 py-2 hover:border-primary" onClick={() => move(-1)}>◀</button>
        <button className="border border-border px-3 py-2 hover:border-primary" onClick={spin}>rotate</button>
        <button className="border border-border px-3 py-2 hover:border-primary" onClick={() => move(1)}>▶</button>
        <button className="border border-border px-3 py-2 hover:border-primary" onClick={drop}>drop</button>
        <button className="border border-border px-3 py-2 hover:border-primary" onClick={() => setPaused((p) => !p)}>
          {paused ? "resume" : "pause"}
        </button>
        <button className="bg-primary text-primary-foreground px-3 py-2" onClick={reset}>restart</button>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">Arrows to move/rotate · Space to drop</p>
    </div>
  );
};

export default TetrisApp;
