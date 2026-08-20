import { useEffect, useRef, useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

const SENTENCES = [
  "Good software ships early and improves in small steady increments.",
  "A project manager removes blockers before the team notices them.",
  "Clear requirements save more time than fast typing ever will.",
  "Automation is worth it when the task repeats more than three times.",
];

const TypingApp = () => {
  const [target, setTarget] = useState(() => SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const { best, submit } = useHighScore("Typing Speed");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [target]);

  const onChange = (v: string) => {
    if (wpm !== null) return;
    if (!startedAt) setStartedAt(performance.now());
    setTyped(v);
    if (v === target) {
      const mins = (performance.now() - (startedAt ?? performance.now())) / 60000;
      const words = target.split(" ").length;
      const result = Math.max(1, Math.round(words / Math.max(mins, 0.0001)));
      setWpm(result);
      submit(result);
    }
  };

  const reset = () => {
    setTarget(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
    setTyped("");
    setStartedAt(null);
    setWpm(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
        <span>{wpm !== null ? `${wpm} wpm` : "start typing"}</span>
        <span className="text-muted-foreground">best {best ?? 0} wpm</span>
      </div>
      <p className="font-mono text-base leading-relaxed">
        {target.split("").map((c, i) => {
          const t = typed[i];
          const cls = t === undefined ? "text-muted-foreground" : t === c ? "text-primary" : "text-destructive underline";
          return (
            <span key={i} className={cls}>
              {c}
            </span>
          );
        })}
      </p>
      <input
        ref={inputRef}
        value={typed}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Type the sentence"
        className="bg-card border border-border px-4 py-3 font-mono text-sm focus:border-primary outline-none"
      />
      <button className="font-mono text-xs uppercase tracking-wider border border-border px-4 py-2 hover:border-primary self-start" onClick={reset}>
        new sentence
      </button>
    </div>
  );
};

export default TypingApp;
