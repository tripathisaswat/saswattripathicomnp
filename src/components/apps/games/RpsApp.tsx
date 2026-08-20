import { useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

const MOVES = [
  { key: "rock", icon: "✊" },
  { key: "paper", icon: "✋" },
  { key: "scissors", icon: "✌️" },
];

const beats: Record<string, string> = { rock: "scissors", paper: "rock", scissors: "paper" };

const RpsApp = () => {
  const [you, setYou] = useState<string | null>(null);
  const [cpu, setCpu] = useState<string | null>(null);
  const [result, setResult] = useState("Pick your move");
  const [streak, setStreak] = useState(0);
  const { best, submit } = useHighScore("Rock Paper Scissors");

  const play = (m: string) => {
    const c = MOVES[Math.floor(Math.random() * 3)].key;
    setYou(m);
    setCpu(c);
    if (m === c) {
      setResult("Draw");
    } else if (beats[m] === c) {
      const s = streak + 1;
      setStreak(s);
      submit(s);
      setResult("You win!");
    } else {
      setStreak(0);
      setResult("You lose");
    }
  };

  const icon = (k: string | null) => MOVES.find((m) => m.key === k)?.icon ?? "❔";

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
        <span>win streak {streak}</span>
        <span className="text-muted-foreground">best {best ?? 0}</span>
      </div>
      <div className="flex items-center gap-8 text-5xl">
        <span>{icon(you)}</span>
        <span className="font-mono text-sm text-muted-foreground">vs</span>
        <span>{icon(cpu)}</span>
      </div>
      <p className="font-mono text-sm text-primary">{result}</p>
      <div className="flex gap-2">
        {MOVES.map((m) => (
          <button
            key={m.key}
            onClick={() => play(m.key)}
            className="border border-border hover:border-primary px-5 py-3 text-3xl"
            aria-label={m.key}
          >
            {m.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RpsApp;
