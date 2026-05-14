import { useEffect, useRef, useState, useCallback } from "react";
import tomImg from "@/assets/tom.png";
import jerryImg from "@/assets/jerry.png";

type Phase = "chase" | "caught" | "escape";

const SPRITE = 72; // px

// inject keyframes once
const STYLE_ID = "tj-shake-style";
const ensureStyle = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes tj-shake {
      0%,100% { transform: translate(0,0) rotate(0); }
      25% { transform: translate(-5px,2px) rotate(-2deg); }
      50% { transform: translate(5px,-2px) rotate(2deg); }
      75% { transform: translate(-3px,-2px) rotate(-1deg); }
    }
    .tj-shake { animation: tj-shake 0.45s ease-in-out; }
    @keyframes tj-pop { 0% { transform: translate(-50%,-50%) scale(0); opacity: 1; } 100% { transform: translate(-50%,-50%) scale(1.8); opacity: 0; } }
    @keyframes tj-body { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-2px) rotate(0); } }
    .tj-body { animation: tj-body 0.22s ease-in-out infinite; transform-origin: 50% 70%; }
    .tj-body-slow { animation: tj-body 0.32s ease-in-out infinite; transform-origin: 50% 70%; }

    /* feet: alternate up/down */
    @keyframes tj-foot-a { 0%,100% { transform: translateY(0) rotate(-10deg);} 50% { transform: translateY(-6px) rotate(20deg);} }
    @keyframes tj-foot-b { 0%,100% { transform: translateY(-6px) rotate(20deg);} 50% { transform: translateY(0) rotate(-10deg);} }
    .tj-foot-l { animation: tj-foot-a 0.22s linear infinite; transform-origin: 50% 0%; }
    .tj-foot-r { animation: tj-foot-b 0.22s linear infinite; transform-origin: 50% 0%; }
    .tj-foot-l-slow { animation: tj-foot-a 0.32s linear infinite; transform-origin: 50% 0%; }
    .tj-foot-r-slow { animation: tj-foot-b 0.32s linear infinite; transform-origin: 50% 0%; }

    /* hands swing opposite to feet */
    @keyframes tj-hand-a { 0%,100% { transform: rotate(35deg);} 50% { transform: rotate(-35deg);} }
    @keyframes tj-hand-b { 0%,100% { transform: rotate(-35deg);} 50% { transform: rotate(35deg);} }
    .tj-hand-l { animation: tj-hand-a 0.22s linear infinite; transform-origin: 50% 0%; }
    .tj-hand-r { animation: tj-hand-b 0.22s linear infinite; transform-origin: 50% 0%; }
    .tj-hand-l-slow { animation: tj-hand-a 0.32s linear infinite; transform-origin: 50% 0%; }
    .tj-hand-r-slow { animation: tj-hand-b 0.32s linear infinite; transform-origin: 50% 0%; }

    /* dust puff behind feet */
    @keyframes tj-dust { 0% { transform: scale(0.4); opacity: 0.8; } 100% { transform: scale(1.3); opacity: 0; } }
    .tj-dust { animation: tj-dust 0.5s ease-out infinite; }
  `;
  document.head.appendChild(s);
};

const randomTarget = () => {
  const pad = 60;
  return {
    x: pad + Math.random() * (window.innerWidth - pad * 2),
    y: pad + Math.random() * (window.innerHeight - pad * 2),
  };
};

// pick a target far away from a point
const evasiveTarget = (from: { x: number; y: number }) => {
  let best = randomTarget();
  let bestDist = 0;
  for (let i = 0; i < 5; i++) {
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
  const [tom, setTom] = useState({ x: 100, y: 400 });
  const [jerry, setJerry] = useState({ x: 600, y: 400 });
  const [bubble, setBubble] = useState<{ who: "tom" | "jerry"; text: string } | null>(null);
  const [boom, setBoom] = useState<{ x: number; y: number; id: number } | null>(null);
  const jerryTarget = useRef({ x: 600, y: 400 });
  const tomRef = useRef(tom);
  tomRef.current = tom;

  useEffect(() => {
    ensureStyle();
  }, []);

  // Jerry picks new evasive targets very frequently
  useEffect(() => {
    if (phase !== "chase") return;
    const id = setInterval(() => {
      jerryTarget.current = evasiveTarget(tomRef.current);
    }, 700);
    return () => clearInterval(id);
  }, [phase]);

  // shake an element ONLY at a specific point (used for boom)
  const shakeAt = useCallback((x: number, y: number) => {
    const els = document.elementsFromPoint(x, y);
    for (const el of els) {
      if (!(el instanceof HTMLElement)) continue;
      if (el.closest("[data-pet]")) continue;
      const target = el.closest("h1,h2,h3,h4,p,li,button,article,a") as HTMLElement | null;
      if (!target) continue;
      if (target.classList.contains("tj-shake")) return;
      target.classList.add("tj-shake");
      setTimeout(() => target.classList.remove("tj-shake"), 500);
      return;
    }
  }, []);

  // movement loop
  useEffect(() => {
    if (phase !== "chase") return;
    let raf = 0;
    const tick = () => {
      setJerry((j) => {
        const dx = jerryTarget.current.x - j.x;
        const dy = jerryTarget.current.y - j.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 6) {
          jerryTarget.current = evasiveTarget(tomRef.current);
          return j;
        }
        // Jerry is FAST and slippery
        const speed = 8;
        // add a little zig-zag perpendicular jitter
        const perp = Math.sin(Date.now() / 80) * 1.2;
        const ux = dx / dist;
        const uy = dy / dist;
        const nx = j.x + ux * speed + -uy * perp;
        const ny = j.y + uy * speed + ux * perp;
        return { x: nx, y: ny };
      });
      setTom((t) => {
        const dx = jerry.x - t.x;
        const dy = jerry.y - t.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 28) {
          setPhase("caught");
          return t;
        }
        const speed = 3.2;
        const nx = t.x + (dx / dist) * speed;
        const ny = t.y + (dy / dist) * speed;
        return { x: nx, y: ny };
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, jerry.x, jerry.y]);

  // caught -> escape
  useEffect(() => {
    if (phase !== "caught") return;
    setBubble({ who: "tom", text: "Gotcha!" });
    setBoom({ x: jerry.x, y: jerry.y, id: Date.now() });
    shakeAt(jerry.x, jerry.y);
    const t1 = setTimeout(() => {
      setBubble({ who: "jerry", text: "Bye bye! 🧀" });
      setPhase("escape");
    }, 700);
    return () => clearTimeout(t1);
  }, [phase, jerry.x, jerry.y, shakeAt]);

  useEffect(() => {
    if (phase !== "escape") return;
    const t = setTimeout(() => {
      setJerry({
        x: tom.x > window.innerWidth / 2 ? 60 : window.innerWidth - 60,
        y: 60 + Math.random() * (window.innerHeight - 120),
      });
      jerryTarget.current = evasiveTarget(tomRef.current);
      setBubble(null);
      setBoom(null);
      setPhase("chase");
    }, 600);
    return () => clearTimeout(t);
  }, [phase, tom.x]);

  if (hidden) {
    return (
      <button
        onClick={() => setHidden(false)}
        className="fixed bottom-4 left-4 z-[60] font-mono text-xs bg-card border border-border px-3 py-2 hover:border-primary text-muted-foreground hover:text-primary transition-colors"
      >
        🐱🐭 unleash the chaos
      </button>
    );
  }

  const tomDir = jerry.x >= tom.x ? 1 : -1;
  const jerryDir = jerryTarget.current.x >= jerry.x ? 1 : -1;

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
          style={{
            left: boom.x,
            top: boom.y,
            animation: "tj-pop 0.7s ease-out forwards",
          }}
        >
          💥
        </div>
      )}

      <Sprite
        src={jerryImg}
        x={jerry.x}
        y={jerry.y}
        dir={jerryDir}
        size={SPRITE * 0.7}
        bubble={bubble?.who === "jerry" ? bubble.text : null}
        bubbleClass="bg-accent text-accent-foreground"
        running={phase === "chase"}
        runFast
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
        runFast={false}
        onClick={() => {
          setBubble({ who: "tom", text: "Rawr! 💨" });
          setTom({
            x: jerry.x - 80 * (jerry.x > tom.x ? 1 : -1),
            y: jerry.y,
          });
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
  runFast,
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
  runFast: boolean;
  limbColor: string;
}) => {
  const fast = runFast;
  const footL = running ? (fast ? "tj-foot-l" : "tj-foot-l-slow") : "";
  const footR = running ? (fast ? "tj-foot-r" : "tj-foot-r-slow") : "";
  const handL = running ? (fast ? "tj-hand-l" : "tj-hand-l-slow") : "";
  const handR = running ? (fast ? "tj-hand-r" : "tj-hand-r-slow") : "";
  const bodyAnim = running ? (fast ? "tj-body" : "tj-body-slow") : "";
  const footW = Math.max(8, size * 0.18);
  const footH = Math.max(5, size * 0.1);
  const handW = Math.max(7, size * 0.14);
  const handH = Math.max(10, size * 0.22);
  return (
    <div
      className="fixed z-[55] pointer-events-none"
      style={{ left: x, top: y, transform: `translate(-50%,-50%)` }}
    >
      {bubble && (
        <div
          className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm ${bubbleClass}`}
        >
          {bubble}
        </div>
      )}
      <button
        onClick={onClick}
        className="pointer-events-auto block hover:scale-110 transition-transform relative"
        style={{ transform: `scaleX(${dir === 1 ? 1 : -1})`, width: size, height: size }}
      >
        {/* hands (behind body) */}
        <span
          className={handL}
          style={{
            position: "absolute",
            left: size * 0.12,
            top: size * 0.45,
            width: handW,
            height: handH,
            borderRadius: "9999px",
            background: limbColor,
            boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            zIndex: 0,
          }}
        />
        <span
          className={handR}
          style={{
            position: "absolute",
            right: size * 0.12,
            top: size * 0.45,
            width: handW,
            height: handH,
            borderRadius: "9999px",
            background: limbColor,
            boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            zIndex: 0,
          }}
        />
        {/* body */}
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          style={{ width: size, height: size, position: "relative", zIndex: 1 }}
          className={`select-none drop-shadow-lg ${bodyAnim}`}
          draggable={false}
        />
        {/* feet */}
        <span
          className={footL}
          style={{
            position: "absolute",
            left: size * 0.28,
            top: size * 0.88,
            width: footW,
            height: footH,
            borderRadius: "9999px",
            background: limbColor,
            boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            zIndex: 2,
          }}
        />
        <span
          className={footR}
          style={{
            position: "absolute",
            right: size * 0.28,
            top: size * 0.88,
            width: footW,
            height: footH,
            borderRadius: "9999px",
            background: limbColor,
            boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            zIndex: 2,
          }}
        />
      </button>
    </div>
  );
};
