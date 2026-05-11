import { useEffect, useRef, useState } from "react";

type Phase = "chase" | "caught" | "escape";

export const PetCat = () => {
  const [jerry, setJerry] = useState(20); // mouse position %
  const [tom, setTom] = useState(5); // cat position %
  const [phase, setPhase] = useState<Phase>("chase");
  const [bubble, setBubble] = useState<{ who: "tom" | "jerry"; text: string } | null>(null);
  const [hidden, setHidden] = useState(false);
  const jerryTarget = useRef(80);

  // Jerry picks new escape targets
  useEffect(() => {
    if (phase !== "chase") return;
    const id = setInterval(() => {
      jerryTarget.current = Math.random() * 90 + 5;
    }, 2500);
    return () => clearInterval(id);
  }, [phase]);

  // Movement loop
  useEffect(() => {
    if (phase !== "chase") return;
    const id = setInterval(() => {
      setJerry((j) => {
        const diff = jerryTarget.current - j;
        if (Math.abs(diff) < 0.4) return j;
        return j + Math.sign(diff) * 0.7;
      });
      setTom((t) => {
        // Tom chases Jerry
        const diff = jerry - t;
        if (Math.abs(diff) < 0.5) {
          // Caught!
          setPhase("caught");
          return t;
        }
        return t + Math.sign(diff) * 0.55;
      });
    }, 30);
    return () => clearInterval(id);
  }, [phase, jerry]);

  // When caught -> Jerry escapes
  useEffect(() => {
    if (phase !== "caught") return;
    setBubble({ who: "tom", text: "Gotcha!" });
    const t1 = setTimeout(() => {
      setBubble({ who: "jerry", text: "Hehe, bye!" });
      setPhase("escape");
    }, 900);
    return () => clearTimeout(t1);
  }, [phase]);

  // Escape: jerry teleports far away, resume chase
  useEffect(() => {
    if (phase !== "escape") return;
    const t = setTimeout(() => {
      const newPos = tom > 50 ? 5 : 95;
      setJerry(newPos);
      jerryTarget.current = newPos;
      setBubble(null);
      setPhase("chase");
    }, 800);
    return () => clearTimeout(t);
  }, [phase, tom]);

  const tomBoost = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBubble({ who: "tom", text: "Rawr! 💨" });
    setTom((t) => Math.min(100, t + (jerry > t ? 8 : -8)));
    setTimeout(() => setBubble(null), 1000);
  };

  const jerryBoost = (e: React.MouseEvent) => {
    e.stopPropagation();
    const lines = ["Squeak! 🧀", "Catch me!", "Too slow!", "Hehe!"];
    setBubble({ who: "jerry", text: lines[Math.floor(Math.random() * lines.length)] });
    const newPos = tom > 50 ? Math.random() * 20 + 5 : Math.random() * 20 + 75;
    setJerry(newPos);
    jerryTarget.current = newPos;
    setTimeout(() => setBubble(null), 1200);
  };

  if (hidden) {
    return (
      <button
        onClick={() => setHidden(false)}
        className="fixed bottom-4 left-4 z-40 font-mono text-xs bg-card border border-border px-3 py-2 hover:border-primary text-muted-foreground hover:text-primary transition-colors"
      >
        🐱 bring chase back
      </button>
    );
  }

  const tomDir = jerry >= tom ? 1 : -1;
  const jerryDir = jerryTarget.current >= jerry ? 1 : -1;

  return (
    <>
      {/* Jerry (mouse) */}
      <div
        className="fixed bottom-2 z-40"
        style={{
          left: `${jerry}%`,
          transform: `translateX(-50%) scaleX(${jerryDir === 1 ? 1 : -1})`,
          transition: phase === "escape" ? "left 0.6s ease-out" : "left 0.05s linear",
        }}
      >
        <div className="relative flex flex-col items-center">
          {bubble?.who === "jerry" && (
            <div
              className="absolute -top-9 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider bg-accent text-accent-foreground px-2 py-1 rounded-sm"
              style={{ transform: `scaleX(${jerryDir === 1 ? 1 : -1})` }}
            >
              {bubble.text}
            </div>
          )}
          <button
            onClick={jerryBoost}
            className="text-3xl select-none cursor-pointer hover:scale-125 transition-transform animate-[bounce_0.4s_ease-in-out_infinite]"
            aria-label="Help Jerry escape"
          >
            🐭
          </button>
        </div>
      </div>

      {/* Tom (cat) */}
      <div
        className="fixed bottom-2 z-40"
        style={{
          left: `${tom}%`,
          transform: `translateX(-50%) scaleX(${tomDir === 1 ? 1 : -1})`,
          transition: "left 0.05s linear",
        }}
      >
        <div className="relative flex flex-col items-center">
          {bubble?.who === "tom" && (
            <div
              className="absolute -top-9 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider bg-primary text-primary-foreground px-2 py-1 rounded-sm"
              style={{ transform: `scaleX(${tomDir === 1 ? 1 : -1})` }}
            >
              {bubble.text}
            </div>
          )}
          <button
            onClick={tomBoost}
            className={`text-4xl select-none cursor-pointer hover:scale-125 transition-transform ${
              phase === "caught" ? "animate-pulse" : "animate-[bounce_0.5s_ease-in-out_infinite]"
            }`}
            aria-label="Boost Tom"
          >
            🐱
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHidden(true);
            }}
            className="absolute -top-1 -right-3 text-[8px] font-mono text-muted-foreground hover:text-destructive bg-card border border-border w-4 h-4 flex items-center justify-center rounded-full"
            style={{ transform: `scaleX(${tomDir === 1 ? 1 : -1})` }}
            aria-label="Hide"
          >
            ×
          </button>
        </div>
      </div>
    </>
  );
};
