import { useEffect, useRef, useState, useCallback } from "react";
import tomImg from "@/assets/tom.png";
import jerryImg from "@/assets/jerry.png";

type Phase = "chase" | "caught" | "escape";

const SPRITE = 72; // px

// inject shake keyframes once
const STYLE_ID = "tj-shake-style";
const ensureStyle = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes tj-shake {
      0%,100% { transform: translate(0,0) rotate(0); }
      20% { transform: translate(-4px,2px) rotate(-2deg); }
      40% { transform: translate(4px,-2px) rotate(2deg); }
      60% { transform: translate(-3px,-2px) rotate(-1deg); }
      80% { transform: translate(3px,2px) rotate(1deg); }
    }
    .tj-shake { animation: tj-shake 0.5s ease-in-out; }
    @keyframes tj-pop { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(1.6); opacity: 0; } }
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

export const PetCat = () => {
  const [hidden, setHidden] = useState(false);
  const [phase, setPhase] = useState<Phase>("chase");
  const [tom, setTom] = useState({ x: 100, y: 400 });
  const [jerry, setJerry] = useState({ x: 300, y: 400 });
  const [bubble, setBubble] = useState<{ who: "tom" | "jerry"; text: string } | null>(null);
  const [boom, setBoom] = useState<{ x: number; y: number; id: number } | null>(null);
  const jerryTarget = useRef(randomTarget());
  const lastShake = useRef(0);

  useEffect(() => {
    ensureStyle();
  }, []);

  // Jerry picks new targets
  useEffect(() => {
    if (phase !== "chase") return;
    const id = setInterval(() => {
      jerryTarget.current = randomTarget();
    }, 2200);
    return () => clearInterval(id);
  }, [phase]);

  // shake an element under a point (avoid the pets themselves & nav)
  const shakeUnder = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastShake.current < 250) return;
    const els = document.elementsFromPoint(x, y);
    for (const el of els) {
      if (!(el instanceof HTMLElement)) continue;
      if (el.closest("[data-pet]")) continue;
      // pick a meaningful target: heading, paragraph, button, list item, card-ish block
      const target = el.closest("h1,h2,h3,h4,p,li,button,article,a") as HTMLElement | null;
      if (!target) continue;
      if (target.classList.contains("tj-shake")) return;
      target.classList.add("tj-shake");
      setTimeout(() => target.classList.remove("tj-shake"), 550);
      lastShake.current = now;
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
        if (dist < 4) return j;
        const speed = 3.5;
        const nx = j.x + (dx / dist) * speed;
        const ny = j.y + (dy / dist) * speed;
        shakeUnder(nx, ny);
        return { x: nx, y: ny };
      });
      setTom((t) => {
        const dx = jerry.x - t.x;
        const dy = jerry.y - t.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 30) {
          setPhase("caught");
          return t;
        }
        const speed = 2.8;
        const nx = t.x + (dx / dist) * speed;
        const ny = t.y + (dy / dist) * speed;
        shakeUnder(nx, ny);
        return { x: nx, y: ny };
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, jerry.x, jerry.y, shakeUnder]);

  // caught -> escape
  useEffect(() => {
    if (phase !== "caught") return;
    setBubble({ who: "tom", text: "Gotcha!" });
    setBoom({ x: jerry.x, y: jerry.y, id: Date.now() });
    const t1 = setTimeout(() => {
      setBubble({ who: "jerry", text: "Bye bye! 🧀" });
      setPhase("escape");
    }, 800);
    return () => clearTimeout(t1);
  }, [phase, jerry.x, jerry.y]);

  useEffect(() => {
    if (phase !== "escape") return;
    const t = setTimeout(() => {
      const next = randomTarget();
      // teleport jerry far from tom
      setJerry({
        x: tom.x > window.innerWidth / 2 ? 60 : window.innerWidth - 60,
        y: 60 + Math.random() * (window.innerHeight - 120),
      });
      jerryTarget.current = next;
      setBubble(null);
      setBoom(null);
      setPhase("chase");
    }, 700);
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
      {/* hide button */}
      <button
        onClick={() => setHidden(true)}
        className="pointer-events-auto fixed bottom-4 left-4 z-[60] font-mono text-[10px] uppercase tracking-wider bg-card border border-border px-2 py-1 hover:border-destructive hover:text-destructive text-muted-foreground"
      >
        × stop chase
      </button>

      {/* boom */}
      {boom && (
        <div
          key={boom.id}
          className="fixed z-[55] text-4xl pointer-events-none"
          style={{
            left: boom.x,
            top: boom.y,
            transform: "translate(-50%,-50%)",
            animation: "tj-pop 0.7s ease-out forwards",
          }}
        >
          💥
        </div>
      )}

      {/* Jerry */}
      <Sprite
        src={jerryImg}
        x={jerry.x}
        y={jerry.y}
        dir={jerryDir}
        size={SPRITE * 0.75}
        bubble={bubble?.who === "jerry" ? bubble.text : null}
        bubbleClass="bg-accent text-accent-foreground"
        onClick={() => {
          const lines = ["Squeak!", "Catch me!", "Too slow!", "Hehe!"];
          setBubble({ who: "jerry", text: lines[Math.floor(Math.random() * lines.length)] });
          jerryTarget.current = randomTarget();
          setTimeout(() => setBubble(null), 1200);
        }}
        smooth={phase === "escape"}
      />

      {/* Tom */}
      <Sprite
        src={tomImg}
        x={tom.x}
        y={tom.y}
        dir={tomDir}
        size={SPRITE}
        bubble={bubble?.who === "tom" ? bubble.text : null}
        bubbleClass="bg-primary text-primary-foreground"
        onClick={() => {
          setBubble({ who: "tom", text: "Rawr! 💨" });
          // teleport tom closer to jerry
          setTom({
            x: jerry.x - 80 * (jerry.x > tom.x ? 1 : -1),
            y: jerry.y,
          });
          setTimeout(() => setBubble(null), 900);
        }}
        smooth={false}
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
  smooth,
}: {
  src: string;
  x: number;
  y: number;
  dir: 1 | -1;
  size: number;
  bubble: string | null;
  bubbleClass: string;
  onClick: () => void;
  smooth: boolean;
}) => (
  <div
    className="fixed z-[55] pointer-events-none"
    style={{
      left: x,
      top: y,
      transform: `translate(-50%,-50%)`,
      transition: smooth ? "left 0.5s ease-out, top 0.5s ease-out" : "none",
    }}
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
      className="pointer-events-auto block hover:scale-110 transition-transform"
      style={{ transform: `scaleX(${dir === 1 ? 1 : -1})` }}
    >
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="select-none drop-shadow-lg"
        draggable={false}
      />
    </button>
  </div>
);
