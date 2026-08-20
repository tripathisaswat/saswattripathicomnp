import { useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

const WORDS = [
  "KATHMANDU",
  "EVEREST",
  "SOFTWARE",
  "DATABASE",
  "MANAGER",
  "PAYROLL",
  "INVENTORY",
  "ANALYTICS",
  "AUTOMATION",
  "CONSULTING",
  "POKHARA",
  "LALITPUR",
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MAX = 7;

const HangmanApp = () => {
  const [word, setWord] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const { best, submit } = useHighScore("Hangman");

  const wrong = guessed.filter((g) => !word.includes(g));
  const won = word.split("").every((c) => guessed.includes(c));
  const lost = wrong.length >= MAX;

  const guess = (l: string) => {
    if (won || lost || guessed.includes(l)) return;
    const next = [...guessed, l];
    setGuessed(next);
    const nowWon = word.split("").every((c) => next.includes(c));
    if (nowWon) {
      const s = streak + 1;
      setStreak(s);
      submit(s);
    } else if (next.filter((g) => !word.includes(g)).length >= MAX) {
      setStreak(0);
    }
  };

  const newGame = () => {
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuessed([]);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
        <span>streak {streak}</span>
        <span>lives {MAX - wrong.length}</span>
        <span className="text-muted-foreground">best {best ?? 0}</span>
      </div>
      <p className="font-mono text-2xl tracking-[0.3em]">
        {word
          .split("")
          .map((c) => (guessed.includes(c) || lost ? c : "_"))
          .join(" ")}
      </p>
      <div className="grid grid-cols-7 sm:grid-cols-9 gap-1">
        {LETTERS.map((l) => {
          const used = guessed.includes(l);
          return (
            <button
              key={l}
              onClick={() => guess(l)}
              disabled={used || won || lost}
              className={`h-9 w-9 font-mono text-sm border transition-colors ${
                used
                  ? word.includes(l)
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground opacity-40"
                  : "border-border hover:border-primary"
              }`}
            >
              {l}
            </button>
          );
        })}
      </div>
      {(won || lost) && (
        <p className="font-mono text-sm text-primary">{won ? "Correct!" : `Out of lives — it was ${word}`}</p>
      )}
      <button className="font-mono text-xs uppercase tracking-wider bg-primary text-primary-foreground px-4 py-2" onClick={newGame}>
        new word
      </button>
    </div>
  );
};

export default HangmanApp;
