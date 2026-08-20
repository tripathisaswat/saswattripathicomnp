import { useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

const WORDS = [
  "project",
  "manager",
  "sprint",
  "backlog",
  "invoice",
  "ledger",
  "payroll",
  "server",
  "network",
  "himalaya",
  "gorkha",
  "monsoon",
];

const scramble = (w: string) => {
  const a = w.split("");
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  const out = a.join("");
  return out === w ? scramble(w) : out;
};

const pick = () => {
  const w = WORDS[Math.floor(Math.random() * WORDS.length)];
  return { word: w, shown: scramble(w) };
};

const WordScrambleApp = () => {
  const [round, setRound] = useState(pick);
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState("Unscramble the word");
  const { best, submit } = useHighScore("Word Scramble");

  const check = () => {
    if (value.trim().toLowerCase() === round.word) {
      const s = score + 1;
      setScore(s);
      submit(s);
      setMsg("Correct!");
    } else {
      setScore(0);
      setMsg(`Nope — it was "${round.word}"`);
    }
    setValue("");
    setRound(pick());
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
        <span>streak {score}</span>
        <span className="text-muted-foreground">best {best ?? 0}</span>
      </div>
      <p className="font-mono text-3xl tracking-[0.3em] uppercase text-primary">{round.shown}</p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder="your answer"
        aria-label="Your answer"
        className="bg-card border border-border px-4 py-2 font-mono text-sm focus:border-primary outline-none"
      />
      <div className="flex gap-2 font-mono text-xs uppercase tracking-wider">
        <button className="bg-primary text-primary-foreground px-4 py-2" onClick={check}>
          check
        </button>
        <button className="border border-border px-4 py-2 hover:border-primary" onClick={() => setRound(pick())}>
          skip
        </button>
      </div>
      <p className="font-mono text-xs text-muted-foreground">{msg}</p>
    </div>
  );
};

export default WordScrambleApp;
