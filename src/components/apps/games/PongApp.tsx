import { useEffect, useRef, useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

const W = 420;
const H = 280;
const PAD_H = 60;

const PongApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ you: 0, cpu: 0 });
  const { best, submit } = useHighScore("Pong");
  const st = useRef({ ball: { x: W / 2, y: H / 2, vx: 3.2, vy: 2.2 }, py: H / 2, cy: H / 2, you: 0, cpu: 0 });

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      st.current.py = Math.max(PAD_H / 2, Math.min(H - PAD_H / 2, e.clientY - r.top));
    };
    cv.addEventListener("mousemove", onMove);

    const loop = () => {
      const s = st.current;
      const b = s.ball;
      b.x += b.vx;
      b.y += b.vy;
      if (b.y < 6 || b.y > H - 6) b.vy *= -1;
      s.cy += Math.sign(b.y - s.cy) * 2.6;
      s.cy = Math.max(PAD_H / 2, Math.min(H - PAD_H / 2, s.cy));

      if (b.x < 20 && Math.abs(b.y - s.py) < PAD_H / 2 && b.vx < 0) {
        b.vx = -b.vx * 1.04;
        b.vy += (b.y - s.py) * 0.05;
      }
      if (b.x > W - 20 && Math.abs(b.y - s.cy) < PAD_H / 2 && b.vx > 0) b.vx = -b.vx;

      if (b.x < 0 || b.x > W) {
        if (b.x < 0) s.cpu++;
        else {
          s.you++;
          submit(s.you);
        }
        setScore({ you: s.you, cpu: s.cpu });
        s.ball = { x: W / 2, y: H / 2, vx: b.x < 0 ? 3.2 : -3.2, vy: 2.2 };
      }

      const css = getComputedStyle(document.documentElement);
      ctx.fillStyle = `hsl(${css.getPropertyValue("--card")})`;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = `hsl(${css.getPropertyValue("--primary")})`;
      ctx.fillRect(8, s.py - PAD_H / 2, 6, PAD_H);
      ctx.fillRect(W - 14, s.cy - PAD_H / 2, 6, PAD_H);
      ctx.beginPath();
      ctx.arc(s.ball.x, s.ball.y, 6, 0, Math.PI * 2);
      ctx.fill();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener("mousemove", onMove);
    };
  }, [submit]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
        <span>you {score.you}</span>
        <span>cpu {score.cpu}</span>
        <span className="text-muted-foreground">best {best ?? 0}</span>
      </div>
      <canvas ref={canvasRef} width={W} height={H} className="border border-border max-w-full" />
      <p className="font-mono text-xs text-muted-foreground">Move your mouse over the board to control the left paddle.</p>
    </div>
  );
};

export default PongApp;
