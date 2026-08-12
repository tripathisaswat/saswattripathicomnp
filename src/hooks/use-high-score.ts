import { useCallback, useEffect, useState } from "react";

const KEY = "st-highscores";

type Scores = Record<string, number>;

const read = (): Scores => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
};

export const readScores = read;

/** higher-is-better by default; pass lowerIsBetter for time-based games */
export const useHighScore = (game: string, lowerIsBetter = false) => {
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    const v = read()[game];
    setBest(typeof v === "number" ? v : null);
  }, [game]);

  const submit = useCallback(
    (score: number) => {
      const all = read();
      const cur = all[game];
      const better =
        typeof cur !== "number" || (lowerIsBetter ? score < cur : score > cur);
      if (better) {
        all[game] = score;
        try {
          localStorage.setItem(KEY, JSON.stringify(all));
        } catch {
          /* ignore */
        }
        setBest(score);
        window.dispatchEvent(new Event("st-scores-updated"));
        return true;
      }
      return false;
    },
    [game, lowerIsBetter]
  );

  return { best, submit };
};

export const useAllScores = () => {
  const [scores, setScores] = useState<Scores>({});
  useEffect(() => {
    const sync = () => setScores(read());
    sync();
    window.addEventListener("st-scores-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("st-scores-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return scores;
};
