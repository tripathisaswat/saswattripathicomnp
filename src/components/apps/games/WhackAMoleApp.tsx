import { useEffect, useRef, useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

const WhackAMoleApp = () => {
  const [active, setActive] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [running, setRunning] = useState(false);
  const { best, submit } = useHighScore("Whack-a-Mole");
  const scoreRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const hop = setInterval(() => setActive(Math.floor(Math.random() * 9)), 750);
    const tick = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setRunning(false);
          setActive(null);
          submit(scoreRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      clearInterval(hop);
      clearInterval(tick);
    };
  }, [running, submit]);

  const start = () => {
    scoreRef.current = 0;
    setScore(0);
    setTime(30);
    setRunning(true);
  };

  const whack = (i: number) => {
    if (!running || i !== active) return;
    scoreRef.current += 1;
    setScore(scoreRef.current);
    setActive(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
        <span>hits {score}</span>
        <span>time {time}s</span>
        <span className="text-muted-foreground">best {best ?? 0}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i}
            onClick={() => whack(i)}
            className={`h-20 w-20 sm:h-24 sm:w-24 border text-4xl transition-colors ${
              active === i ? "border-primary bg-primary/10" : "border-border bg-card"
            }`}
            aria-label={`hole ${i + 1}`}
          >
            {active === i ? "🐹" : ""}
          </button>
        ))}
      </div>
      <button className="font-mono text-xs uppercase tracking-wider bg-primary text-primary-foreground px-4 py-2" onClick={start}>
        {running ? "restart" : "start 30s round"}
      </button>
    </div>
  );
};

export default WhackAMoleApp;
