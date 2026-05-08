import { useState } from "react";

const SIZE = 5;
type Line = { r: number; c: number; horiz: boolean };

export default function ConnectDotsApp() {
  const [lines, setLines] = useState<Record<string, 1 | 2>>({});
  const [boxes, setBoxes] = useState<Record<string, 1 | 2>>({});
  const [player, setPlayer] = useState<1 | 2>(1);

  const key = (l: Line) => `${l.r}-${l.c}-${l.horiz ? "h" : "v"}`;

  const click = (l: Line) => {
    if (lines[key(l)]) return;
    const nl = { ...lines, [key(l)]: player };
    const nb = { ...boxes };
    let claimed = false;
    for (let r = 0; r < SIZE - 1; r++) {
      for (let c = 0; c < SIZE - 1; c++) {
        const bk = `${r}-${c}`;
        if (nb[bk]) continue;
        if (nl[`${r}-${c}-h`] && nl[`${r + 1}-${c}-h`] && nl[`${r}-${c}-v`] && nl[`${r}-${c + 1}-v`]) {
          nb[bk] = player; claimed = true;
        }
      }
    }
    setLines(nl); setBoxes(nb);
    if (!claimed) setPlayer(player === 1 ? 2 : 1);
  };

  const score1 = Object.values(boxes).filter((v) => v === 1).length;
  const score2 = Object.values(boxes).filter((v) => v === 2).length;

  return (
    <div>
      <p className="font-mono text-sm text-muted-foreground mb-4">
        P1: {score1} · P2: {score2} · Turn: P{player}
      </p>
      <div className="inline-block">
        {Array.from({ length: SIZE }).map((_, r) => (
          <div key={r}>
            <div className="flex items-center">
              {Array.from({ length: SIZE }).map((_, c) => (
                <div key={c} className="flex items-center">
                  <div className="w-3 h-3 bg-foreground rounded-full" />
                  {c < SIZE - 1 && (
                    <button onClick={() => click({ r, c, horiz: true })}
                      className={`w-10 h-1 mx-1 ${lines[`${r}-${c}-h`] === 1 ? "bg-primary" : lines[`${r}-${c}-h`] === 2 ? "bg-accent" : "bg-border hover:bg-muted-foreground"}`} />
                  )}
                </div>
              ))}
            </div>
            {r < SIZE - 1 && (
              <div className="flex items-center">
                {Array.from({ length: SIZE }).map((_, c) => (
                  <div key={c} className="flex items-center">
                    <button onClick={() => click({ r, c, horiz: false })}
                      className={`w-1 h-10 my-1 ${lines[`${r}-${c}-v`] === 1 ? "bg-primary" : lines[`${r}-${c}-v`] === 2 ? "bg-accent" : "bg-border hover:bg-muted-foreground"}`} />
                    {c < SIZE - 1 && (
                      <div className={`w-10 h-10 mx-1 my-1 flex items-center justify-center text-xs font-bold ${boxes[`${r}-${c}`] === 1 ? "bg-primary/20 text-primary" : boxes[`${r}-${c}`] === 2 ? "bg-accent/20 text-accent" : ""}`}>
                        {boxes[`${r}-${c}`] && `P${boxes[`${r}-${c}`]}`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => { setLines({}); setBoxes({}); setPlayer(1); }}
        className="mt-6 block font-mono text-xs uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground">
        [ reset ]
      </button>
    </div>
  );
}
