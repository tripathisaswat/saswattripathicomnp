import { useMemo, useState } from "react";

const BASE = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const shuffled = () => {
  const map = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 8; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [map[i], map[j]] = [map[j], map[i]];
  }
  return BASE.map((row) => row.map((v) => map[v - 1]));
};

const makePuzzle = (holes: number) => {
  const sol = shuffled();
  const grid = sol.map((r) => [...r]);
  let removed = 0;
  while (removed < holes) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (grid[r][c] !== 0) {
      grid[r][c] = 0;
      removed++;
    }
  }
  return { sol, grid };
};

const SudokuApp = () => {
  const [seed, setSeed] = useState(0);
  const { sol, grid } = useMemo(() => makePuzzle(40), [seed]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const reset = () => {
    setSeed((s) => s + 1);
    setValues({});
    setChecked(false);
  };

  const solvedAll = grid.every((row, r) =>
    row.every((v, c) => (v !== 0 ? true : Number(values[`${r}-${c}`]) === sol[r][c]))
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-9 bg-border gap-px p-px">
        {grid.map((row, r) =>
          row.map((v, c) => {
            const key = `${r}-${c}`;
            const fixed = v !== 0;
            const val = fixed ? String(v) : values[key] ?? "";
            const wrong = checked && !fixed && val !== "" && Number(val) !== sol[r][c];
            return (
              <div
                key={key}
                className={`bg-card ${(c + 1) % 3 === 0 && c !== 8 ? "mr-[2px]" : ""} ${
                  (r + 1) % 3 === 0 && r !== 8 ? "mb-[2px]" : ""
                }`}
              >
                {fixed ? (
                  <div className="h-8 w-8 sm:h-9 sm:w-9 grid place-items-center font-mono text-sm text-foreground">{v}</div>
                ) : (
                  <input
                    value={val}
                    onChange={(e) => {
                      const d = e.target.value.replace(/[^1-9]/g, "").slice(-1);
                      setValues((s) => ({ ...s, [key]: d }));
                    }}
                    aria-label={`row ${r + 1} column ${c + 1}`}
                    className={`h-8 w-8 sm:h-9 sm:w-9 bg-transparent text-center font-mono text-sm outline-none focus:bg-primary/10 ${
                      wrong ? "text-destructive" : "text-primary"
                    }`}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
      {checked && (
        <p className="font-mono text-sm text-primary">{solvedAll ? "Solved — nice work!" : "Not quite yet."}</p>
      )}
      <div className="flex gap-2 font-mono text-xs uppercase tracking-wider">
        <button className="bg-primary text-primary-foreground px-4 py-2" onClick={() => setChecked(true)}>
          check
        </button>
        <button className="border border-border px-4 py-2 hover:border-primary" onClick={reset}>
          new puzzle
        </button>
      </div>
    </div>
  );
};

export default SudokuApp;
