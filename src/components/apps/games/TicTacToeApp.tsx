import { useState } from "react";

type Cell = "X" | "O" | null;

function calc(b: Cell[]): Cell {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a, b1, c] of lines) if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
  return null;
}

export default function TicTacToeApp() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);
  const winner = calc(board);
  const draw = !winner && board.every(Boolean);

  const click = (i: number) => {
    if (board[i] || winner) return;
    const b = board.slice();
    b[i] = xNext ? "X" : "O";
    setBoard(b);
    setXNext(!xNext);
  };

  return (
    <div>
      <p className="font-mono text-sm text-muted-foreground mb-4">
        {winner ? `Winner: ${winner}` : draw ? "Draw" : `Turn: ${xNext ? "X" : "O"}`}
      </p>
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {board.map((c, i) => (
          <button key={i} onClick={() => click(i)}
            className="aspect-square bg-card border border-border text-4xl font-bold hover:bg-secondary text-primary">
            {c}
          </button>
        ))}
      </div>
      <button onClick={() => { setBoard(Array(9).fill(null)); setXNext(true); }}
        className="mt-6 font-mono text-xs uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground">
        [ reset ]
      </button>
    </div>
  );
}
