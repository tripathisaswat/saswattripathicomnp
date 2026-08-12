import { useEffect, useRef, useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

const W = 360, H = 300;

const BreakoutApp = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [state, setState] = useState<"idle" | "play" | "over" | "won">("idle");
  const { best, submit } = useHighScore("Breakout");
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    if (state !== "play") return;
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const cols = 8, rows = 4, bw = W / cols, bh = 16;
    const bricks: boolean[] = Array(cols * rows).fill(true);
    let bx = W / 2, by = H - 40, vx = 2.6, vy = -2.6;
    let px = W / 2 - 34;
    const pw = 68;
    let pts = 0;
    let raf = 0;

    const onMove = (clientX: number) => {
      const r = c.getBoundingClientRect();
      px = Math.max(0, Math.min(W - pw, ((clientX - r.left) / r.width) * W - pw / 2));
    };
    const mm = (e: MouseEvent) => onMove(e.clientX);
    const tm = (e: TouchEvent) => onMove(e.touches[0].clientX);
    c.addEventListener("mousemove", mm);
    c.addEventListener("touchmove", tm, { passive: true });

    const loop = () => {
      bx += vx; by += vy;
      if (bx < 6 || bx > W - 6) vx = -vx;
      if (by < 6) vy = -vy;
      if (by > H - 18 && by < H - 10 && bx > px && bx < px + pw) {
        vy = -Math.abs(vy);
        vx += ((bx - (px + pw / 2)) / pw) * 2;
      }
      if (by > H) {
        setState("over");
        submit(pts);
        return;
      }
      bricks.forEach((alive, i) => {
        if (!alive) return;
        const x = (i % cols) * bw, y = Math.floor(i / cols) * bh + 24;
        if (bx > x && bx < x + bw && by > y && by < y + bh) {
          bricks[i] = false;
          vy = -vy;
          pts += 10;
          setScore(pts);
        }
      });
      if (bricks.every((b) => !b)) {
        setState("won");
        submit(pts + 100);
        return;
      }

      ctx.fillStyle = "#0d0d0d";
      ctx.fillRect(0, 0, W, H);
      bricks.forEach((alive, i) => {
        if (!alive) return;
        const x = (i % cols) * bw, y = Math.floor(i / cols) * bh + 24;
        ctx.fillStyle = i % 2 ? "#c9a84c" : "#f0d78c";
        ctx.fillRect(x + 1, y + 1, bw - 2, bh - 2);
      });
      ctx.fillStyle = "#c9a84c";
      ctx.fillRect(px, H - 14, pw, 8);
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#f0d78c";
      ctx.fill();

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      c.removeEventListener("mousemove", mm);
      c.removeEventListener("touchmove", tm);
    };
  }, [state, submit]);

  const start = () => {
    setScore(0);
    setState("play");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between font-mono text-xs">
        <span>SCORE <span className="text-primary">{score}</span></span>
        <span className="text-muted-foreground">BEST {best ?? 0}</span>
      </div>
      <div className="relative mx-auto w-fit">
        <canvas ref={canvas} width={W} height={H} className="border border-border max-w-full touch-none" />
        {state !== "play" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/85">
            <p className="font-mono text-sm">
              {state === "idle" ? "Move mouse or finger to steer" : state === "won" ? "Cleared!" : "Game over"}
            </p>
            <button onClick={start} className="btn-gold">{state === "idle" ? "Start" : "Play again"}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreakoutApp;
