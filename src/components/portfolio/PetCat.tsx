import { useEffect, useRef, useState, useCallback } from "react";
import tomImg from "@/assets/tom.png";
import jerryImg from "@/assets/jerry.png";

type Phase = "chase" | "caught" | "escape";

const SPRITE = 76;

const STYLE_ID = "tj-style";
const ensureStyle = () => {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes tj-shake {
      0%,100% { transform: translate(0,0) rotate(0); }
      25% { transform: translate(-4px,2px) rotate(-1.2deg); }
      50% { transform: translate(4px,-2px) rotate(1.2deg); }
      75% { transform: translate(-2px,-1px) rotate(-0.6deg); }
    }
    .tj-shake { animation: tj-shake 0.45s ease-in-out; }
    @keyframes tj-pop { 0% { transform: translate(-50%,-50%) scale(0.2); opacity: 1; } 100% { transform: translate(-50%,-50%) scale(1.7); opacity: 0; } }
    @keyframes tj-dust { 0% { transform: translate(-50%,-50%) scale(0.4); opacity: .55; } 100% { transform: translate(-50%,-50%) scale(1.4); opacity: 0; } }

    /* one shared rhythm: --tj-step */
    @keyframes tj-run { 0%,100% { transform: translateY(0) scaleY(1) rotate(0deg); } 25% { transform: translateY(-4px) scaleY(1.04) rotate(-3deg); } 50% { transform: translateY(0) scaleY(0.97) rotate(0deg); } 75% { transform: translateY(-4px) scaleY(1.04) rotate(3deg); } }
    .tj-run { animation: tj-run var(--tj-step) cubic-bezier(.45,.05,.55,.95) infinite; transform-origin: 50% 92%; }

    @keyframes tj-leg-a { 0%,100% { transform: rotate(-32deg) scaleY(1); } 50% { transform: rotate(34deg) scaleY(0.86); } }
    @keyframes tj-leg-b { 0%,100% { transform: rotate(34deg) scaleY(0.86); } 50% { transform: rotate(-32deg) scaleY(1); } }
    .tj-leg-l { animation: tj-leg-a var(--tj-step) cubic-bezier(.45,.05,.55,.95) infinite; transform-origin: 50% 0%; }
    .tj-leg-r { animation: tj-leg-b var(--tj-step) cubic-bezier(.45,.05,.55,.95) infinite; transform-origin: 50% 0%; }

    @keyframes tj-arm-a { 0%,100% { transform: rotate(38deg); } 50% { transform: rotate(-34deg); } }
    @keyframes tj-arm-b { 0%,100% { transform: rotate(-34deg); } 50% { transform: rotate(38deg); } }
    .tj-arm-l { animation: tj-arm-a var(--tj-step) cubic-bezier(.45,.05,.55,.95) infinite; transform-origin: 50% 10%; }
    .tj-arm-r { animation: tj-arm-b var(--tj-step) cubic-bezier(.45,.05,.55,.95) infinite; transform-origin: 50% 10%; }

    @keyframes tj-bob { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-2px);} }
    .tj-bubble { animation: tj-bob 1.1s ease-in-out infinite; }
  `;
  document.head.appendChild(s);
};

const randomTarget = () => {
  const pad = 70;
  return {
    x: pad + Math.random() * (window.innerWidth - pad * 2),
    y: pad + Math.random() * (window.innerHeight - pad * 2),
  };
};

const evasiveTarget = (from: { x: number; y: number }) => {
  let best = randomTarget();
  let bestDist = 0;
  for (let i = 0; i < 6; i++) {
    const t = randomTarget();
    const d = Math.hypot(t.x - from.x, t.y - from.y);
    if (d > bestDist) {
      bestDist = d;
      best = t;
    }
  }
  return best;
};

export const PetCat = () => {
  const [hidden, setHidden] = useState(false);
  const [phase, setPhase] = useState<Phase>("chase");
  const [tom, setTom] = useState({ x: 120, y: 420 });
  const [jerry, setJerry] = useState({ x: 620, y: 420 });
  const [bubble, setBubble] = useState<{ who: "tom" | "jerry"; text: string } | null>(null);
  const [boom, setBoom] = useState<{ x: number; y: number; id: number } | null>(null);
  const jerryTarget = useRef({ x: 620, y: 420 });
  const tomRef = useRef(tom);
  const jerryRef = useRef(jerry);
  tomRef.current = tom;
  jerryRef.current = jerry;

  useEffect(() => {
    ensureStyle();
  }, []);

  useEffect(() => {
    if (phase !== "chase") return;
    const id = setInterval(() => {
      jerryTarget.current = evasiveTarget(tomRef.current);
    }, 900);
    return () => clearInterval(id);
  }, [phase]);

  const shakeAt = useCallback((x: number, y: number) => {
    const els = document.elementsFromPoint(x, y);
    for (const el of els) {
      if (!(el instanceof HTMLElement)) continue;
      if (el.closest("[data-pet]")) continue;
      const target = el.closest("h1,h2,h3,h4,p,li,button,article,a") as HTMLElement | null;
      if (!target || target.classList.contains("tj-shake")) return;
      target.classList.add("tj-shake");
      setTimeout(() => target.classList.remove("tj-shake"), 500);
      return;
    }
  }, []);

  // single rAF loop, both sprites advance from refs (no per-frame re-subscribe)
  useEffect(() => {
    if (phase !== "chase") return;
    let raf = 0;
    const tick = () => {
      const j = jerryRef.current;
      const t = tomRef.current;

      const jdx = jerryTarget.current.x - j.x;
      const jdy = jerryTarget.current.y - j.y;
      const jd = Math.hypot(jdx, jdy) || 1;
      if (jd < 8) jerryTarget.current = evasiveTarget(t);
      const perp = Math.sin(Date.now() / 140) * 0.9;
      const jSpeed = 3.6;
      const nj = {
        x: j.x + (jdx / jd) * jSpeed + (-jdy / jd) * perp,
        y: j.y + (jdy / jd) * jSpeed + (jdx / jd) * perp,
      };
      jerryRef.current = nj;
      setJerry(nj);

      const dx = nj.x - t.x;
      const dy = nj.y - t.y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < 30) {
        setPhase("caught");
      } else {
        const tSpeed = 2.4;
        const nt = { x: t.x + (dx / dist) * tSpeed, y: t.y + (dy / dist) * tSpeed };
        tomRef.current = nt;
        setTom(nt);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (phase !== "caught") return;
    setBubble({ who: "tom", text: "Gotcha!" });
    setBoom({ x: jerry.x, y: jerry.y, id: Date.now() });
    shakeAt(jerry.x, jerry.y);
    const t1 = setTimeout(() => {
      setBubble({ who: "jerry", text: "Bye bye! 🧀" });
      setPhase("escape");
    }, 750);
    return () => clearTimeout(t1);
  }, [phase, jerry.x, jerry.y, shakeAt]);

  useEffect(() => {
    if (phase !== "escape") return;
    const t = setTimeout(() => {
      const nj = {
        x: tomRef.current.x > window.innerWidth / 2 ? 70 : window.innerWidth - 70,
        y: 70 + Math.random() * (window.innerHeight - 140),
      };
      jerryRef.current = nj;
      setJerry(nj);
      jerryTarget.current = evasiveTarget(tomRef.current);
      setBubble(null);
      setBoom(null);
      setPhase("chase");
    }, 650);
    return () => clearTimeout(t);
  }, [phase]);

  if (hidden) {
    return (
      <button
        onClick={() => setHidden(false)}
        className="fixed bottom-4 left-4 z-[60] font-mono text-xs bg-card border border-border px-3 py-2 hover:border-primary text-muted-foreground hover:text-primary transition-colors"
      >
        🐱🐭 unleash the chase
      </button>
    );
  }

  const tomDir: 1 | -1 = jerry.x >= tom.x ? 1 : -1;
  const jerryDir: 1 | -1 = jerryTarget.current.x >= jerry.x ? 1 : -1;

  return (
    <div data-pet className="pointer-events-none">
      <button
        onClick={() => setHidden(true)}
        className="pointer-events-auto fixed bottom-4 left-4 z-[60] font-mono text-[10px] uppercase tracking-wider bg-card border border-border px-2 py-1 hover:border-destructive hover:text-destructive text-muted-foreground"
      >
        × stop chase
      </button>

      {boom && (
        <div
          key={boom.id}
          className="fixed z-[55] text-4xl pointer-events-none"
          style={{ left: boom.x, top: boom.y, animation: "tj-pop 0.7s ease-out forwards" }}
        >
          💥
        </div>
      )}

      <Sprite
        src={jerryImg}
        x={jerry.x}
        y={jerry.y}
        dir={jerryDir}
        size={SPRITE * 0.66}
        bubble={bubble?.who === "jerry" ? bubble.text : null}
        bubbleClass="bg-accent text-accent-foreground"
        running={phase === "chase"}
        step="0.34s"
        limbColor="#8B5A2B"
        onClick={() => {
          const lines = ["Squeak!", "Catch me!", "Too slow!", "Hehe!", "Nope!"];
          setBubble({ who: "jerry", text: lines[Math.floor(Math.random() * lines.length)] });
          jerryTarget.current = evasiveTarget(tomRef.current);
          setTimeout(() => setBubble(null), 1000);
        }}
      />

      <Sprite
        src={tomImg}
        x={tom.x}
        y={tom.y}
        dir={tomDir}
        size={SPRITE}
        bubble={bubble?.who === "tom" ? bubble.text : null}
        bubbleClass="bg-primary text-primary-foreground"
        running={phase === "chase"}
        step="0.46s"
        limbColor="#5C5C5C"
        onClick={() => {
          setBubble({ who: "tom", text: "Rawr! 💨" });
          const nt = { x: jerry.x - 90 * (jerry.x > tom.x ? 1 : -1), y: jerry.y };
          tomRef.current = nt;
          setTom(nt);
          setTimeout(() => setBubble(null), 800);
        }}
      />
    </div>
  );
};

const Sprite = ({
  src,
  x,
  y,
  dir,
  size,
  bubble,
  bubbleClass,
  onClick,
  running,
  step,
  limbColor,
}: {
  src: string;
  x: number;
  y: number;
  dir: 1 | -1;
  size: number;
  bubble: string | null;
  bubbleClass: string;
  onClick: () => void;
  running: boolean;
  step: string;
  limbColor: string;
}) => {
  const legW = Math.max(7, size * 0.15);
  const legH = Math.max(9, size * 0.2);
  const armW = Math.max(6, size * 0.12);
  const armH = Math.max(10, size * 0.2);

  const limb = (extra: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    borderRadius: "9999px",
    background: limbColor,
    boxShadow: "0 1px 2px rgba(0,0,0,0.35)",
    ...extra,
  });

  return (
    <div
      className="fixed z-[55] pointer-events-none"
      style={{ left: x, top: y, transform: "translate(-50%,-50%)" }}
    >
      {bubble && (
        <div
          className={`tj-bubble absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm ${bubbleClass}`}
        >
          {bubble}
        </div>
      )}
      {running && (
        <span
          className="absolute rounded-full bg-foreground/25"
          style={{
            left: "50%",
            top: size * 0.98,
            width: size * 0.5,
            height: size * 0.16,
            animation: "tj-dust 0.5s ease-out infinite",
          }}
        />
      )}
      <button
        onClick={onClick}
        aria-label="poke"
        className="pointer-events-auto block relative"
        style={{
          transform: `scaleX(${dir === 1 ? 1 : -1})`,
          width: size,
          height: size,
          ["--tj-step" as string]: step,
        }}
      >
        <span className={running ? "tj-run" : ""} style={{ display: "block", width: size, height: size, position: "relative" }}>
          <span
            className={running ? "tj-arm-l" : ""}
            style={limb({ left: size * 0.1, top: size * 0.46, width: armW, height: armH, zIndex: 0 })}
          />
          <span
            className={running ? "tj-arm-r" : ""}
            style={limb({ right: size * 0.1, top: size * 0.46, width: armW, height: armH, zIndex: 0 })}
          />
          <img
            src={src}
            alt=""
            width={size}
            height={size}
            style={{ width: size, height: size, position: "relative", zIndex: 1 }}
            className="select-none drop-shadow-xl"
            draggable={false}
          />
          <span
            className={running ? "tj-leg-l" : ""}
            style={limb({ left: size * 0.29, top: size * 0.84, width: legW, height: legH, zIndex: 2 })}
          />
          <span
            className={running ? "tj-leg-r" : ""}
            style={limb({ right: size * 0.29, top: size * 0.84, width: legW, height: legH, zIndex: 2 })}
          />
        </span>
      </button>
    </div>
  );
};
