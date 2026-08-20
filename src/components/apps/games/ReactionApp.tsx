import { useCallback, useEffect, useRef, useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

type State = "idle" | "waiting" | "go" | "result" | "early";

const ReactionApp = () => {
  const [state, setState] = useState<State>("idle");
  const [ms, setMs] = useState(0);
  const start = useRef(0);
  const timer = useRef<number>();
  const { best, submit } = useHighScore("Reaction Test", true);

  const begin = useCallback(() => {
    setState("waiting");
    timer.current = window.setTimeout(() => {
      start.current = performance.now();
      setState("go");
    }, 1200 + Math.random() * 2500);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const click = () => {
    if (state === "idle" || state === "result" || state === "early") return begin();
    if (state === "waiting") {
      window.clearTimeout(timer.current);
      setState("early");
      return;
    }
    const t = Math.round(performance.now() - start.current);
    setMs(t);
    submit(t);
    setState("result");
  };

  const copy: Record<State, string> = {
    idle: "Click to start",
    waiting: "Wait for gold…",
    go: "CLICK NOW",
    result: `${ms} ms — click to retry`,
    early: "Too early! Click to retry",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
        <span className="text-muted-foreground">best {best ? `${best} ms` : "—"}</span>
      </div>
      <button
        onClick={click}
        className={`w-full h-56 border font-mono text-lg uppercase tracking-wider transition-colors ${
          state === "go" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground"
        }`}
      >
        {copy[state]}
      </button>
    </div>
  );
};

export default ReactionApp;
