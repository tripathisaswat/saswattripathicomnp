import { useState } from "react";

const ROWS = 6, COLS = 7;
type Cell = 0 | 1 | 2;

function check(g: Cell[][], r: number, c: number, p: Cell) {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  for (const [dr, dc] of dirs) {
    let count = 1;
    for (const sign of [1, -1]) {
      let i = r + dr * sign, j = c + dc * sign;
      while (i >= 0 && i < ROWS && j >= 0 && j < COLS && g[i][j] === p) {
        count++; i += dr * sign; j += dc * sign;
      }
    }
    if (count >= 4) return true;
  }
  return false;
}

export default function ConnectFourApp() {
  const [grid, setGrid] = useState<Cell[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(0) as Cell[])
  );
  const [player, setPlayer] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<0 | 1 | 2>(0);

  const drop = (col: number) => {
    if (winner) return;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (grid[r][col] === 0) {
        const g = grid.map((row) => row.slice());
        g[r][col] = player;
        setGrid(g);
        if (check(g, r, col, player)) setWinner(player);
        else setPlayer(player === 1 ? 2 : 1);
        return;
      }
    }
  };

  const reset = () => {
    setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(0) as Cell[]));
    setPlayer(1); setWinner(0);
  };

  return (
    <div>
      <p className="font-mono text-sm text-muted-foreground mb-4">
        {winner ? `Winner: P${winner}` : `Turn: P${player}`}
      </p>
      <div className="inline-block bg-card p-2 border border-border">
        {grid.map((row, r) => (
          <div key={r} className="flex gap-1">
            {row.map((c, ci) => (
              <button key={ci} onClick={() => drop(ci)}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-background rounded-full border border-border flex items-center justify-center">
                <span className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${c === 1 ? "bg-primary" : c === 2 ? "bg-accent" : ""}`} />
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button onClick={reset} className="font-mono text-xs uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground">
          [ reset ]
        </button>
      </div>
    </div>
  );
}
