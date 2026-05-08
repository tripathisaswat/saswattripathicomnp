import { useEffect, useRef, useState } from "react";
import { PageShell } from "@/components/portfolio/PageShell";

export default function Dino() {
  const [y, setY] = useState(0);
  const [obs, setObs] = useState(400);
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const vel = useRef(0);
  const yRef = useRef(0);

  const jump = () => { if (yRef.current === 0 && !over) vel.current = 12; };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.code === "Space") jump(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (over) return;
    const id = setInterval(() => {
      vel.current -= 0.8;
      let ny = yRef.current + vel.current;
      if (ny <= 0) { ny = 0; vel.current = 0; }
      yRef.current = ny;
      setY(ny);
      setObs((o) => {
        const no = o - 6;
        if (no < -20) { setScore((s) => s + 1); return 400; }
        if (no < 40 && no > 0 && ny < 30) { setOver(true); }
        return no;
      });
    }, 30);
    return () => clearInterval(id);
  }, [over]);

  const reset = () => { yRef.current = 0; vel.current = 0; setY(0); setObs(400); setScore(0); setOver(false); };

  return (
    <PageShell label="games/dino" title="Dino Runner">
      <p className="font-mono text-sm text-muted-foreground mb-6">
        Score: {score} {over && "— Game Over"} · Press Space / tap to jump
      </p>
      <div
        onClick={jump}
        className="relative bg-card border border-border h-48 w-full max-w-2xl cursor-pointer overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
        <div
          className="absolute left-12 w-8 h-8 bg-primary"
          style={{ bottom: y }}
        />
        <div
          className="absolute bottom-0 w-6 h-10 bg-accent"
          style={{ left: obs }}
        />
      </div>
      <button onClick={reset} className="mt-6 font-mono text-xs uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors">
        [ reset ]
      </button>
    </PageShell>
  );
}
