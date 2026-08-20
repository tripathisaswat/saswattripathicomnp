import { useCallback, useEffect, useRef, useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

const W = 320;
const H = 380;
const GAP = 110;
const PIPE_W = 46;

type Pipe = { x: number; top: number; passed: boolean };

const FlappyApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const { best, submit } = useHighScore("Flappy");

  const game = useRef({ y: H / 2, v: 0, pipes: [] as Pipe[], t: 0, score: 0 });

  const reset = useCallback(() => {
    game.current = { y: H / 2, v: 0, pipes: [], t: 0, score: 0 };
    setScore(0);
    setOver(false);
    setRunning(true);
  }, []);

  const flap = useCallback(() => {
    if (!running) {
      reset();
      return;
    }
    game.current.v = -5.2;
  }, [running, reset]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        flap();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flap]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    const draw = () => {
      const g = game.current;
      if (running) {
        g.t++;
        g.v += 0.28;
        g.y += g.v;
        if (g.t % 90 === 0) g.pipes.push({ x: W, top: 40 + Math.random() * (H - GAP - 100), passed: false });
        g.pipes.forEach((p) => (p.x -= 2));
        g.pipes = g.pipes.filter((p) => p.x > -PIPE_W);
        for (const p of g.pipes) {
          if (!p.passed && p.x + PIPE_W < 60) {
            p.passed = true;
            g.score++;
            setScore(g.score);
          }
          const hitX = 60 + 12 > p.x && 60 - 12 < p.x + PIPE_W;
          const hitY = g.y - 12 < p.top || g.y + 12 > p.top + GAP;
          if (hitX && hitY) {
            setRunning(false);
            setOver(true);
            submit(g.score);
          }
        }
        if (g.y > H - 10 || g.y < 0) {
          setRunning(false);
          setOver(true);
          submit(g.score);
        }
      }

      const css = getComputedStyle(document.documentElement);
      const bg = `hsl(${css.getPropertyValue("--card")})`;
      const fg = `hsl(${css.getPropertyValue("--primary")})`;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = fg;
      for (const p of g.pipes) {
        ctx.fillRect(p.x, 0, PIPE_W, p.top);
        ctx.fillRect(p.x, p.top + GAP, PIPE_W, H - p.top - GAP);
      }
      ctx.beginPath();
      ctx.arc(60, g.y, 12, 0, Math.PI * 2);
      ctx.fill();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [running, submit]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
        <span>score {score}</span>
        <span className="text-muted-foreground">best {best ?? 0}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onClick={flap}
        className="border border-border cursor-pointer touch-none"
      />
      <p className="font-mono text-xs text-muted-foreground">
        {over ? `Crashed at ${score} — click to try again` : running ? "Click or press space to flap" : "Click to start"}
      </p>
    </div>
  );
};

export default FlappyApp;
