import { useCallback, useEffect, useRef, useState } from "react";
import { useHighScore } from "@/hooks/use-high-score";

const PADS = [0, 1, 2, 3];

const SimonApp = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [lit, setLit] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [msg, setMsg] = useState("Press start");
  const inputIdx = useRef(0);
  const { best, submit } = useHighScore("Simon Says");

  const playback = useCallback(async (seq: number[]) => {
    setPlaying(true);
    for (const s of seq) {
      await new Promise((r) => setTimeout(r, 260));
      setLit(s);
      await new Promise((r) => setTimeout(r, 340));
      setLit(null);
    }
    setPlaying(false);
    inputIdx.current = 0;
    setMsg("Your turn");
  }, []);

  const next = useCallback(
    (seq: number[]) => {
      const n = [...seq, PADS[Math.floor(Math.random() * 4)]];
      setSequence(n);
      playback(n);
    },
    [playback]
  );

  const start = () => {
    setSequence([]);
    setMsg("Watch");
    next([]);
  };

  const press = (p: number) => {
    if (playing || !sequence.length) return;
    setLit(p);
    setTimeout(() => setLit(null), 180);
    if (sequence[inputIdx.current] !== p) {
      submit(sequence.length - 1);
      setMsg(`Wrong — you reached round ${sequence.length - 1}`);
      setSequence([]);
      return;
    }
    inputIdx.current++;
    if (inputIdx.current === sequence.length) {
      submit(sequence.length);
      setMsg("Nice — next round");
      setTimeout(() => next(sequence), 600);
    }
  };

  useEffect(() => () => setLit(null), []);

  const colors = ["bg-primary", "bg-accent", "bg-secondary", "bg-muted"];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
        <span>round {Math.max(sequence.length, 0)}</span>
        <span className="text-muted-foreground">best {best ?? 0}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {PADS.map((p) => (
          <button
            key={p}
            onClick={() => press(p)}
            aria-label={`pad ${p + 1}`}
            className={`h-24 w-24 sm:h-28 sm:w-28 border border-border transition-opacity ${colors[p]} ${
              lit === p ? "opacity-100" : "opacity-30"
            }`}
          />
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">{msg}</p>
      <button className="font-mono text-xs uppercase tracking-wider bg-primary text-primary-foreground px-4 py-2" onClick={start}>
        start
      </button>
    </div>
  );
};

export default SimonApp;
