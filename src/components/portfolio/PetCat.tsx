import { useEffect, useRef, useState } from "react";

type Mood = "walk" | "sit" | "jump" | "play" | "sleep" | "love";

const moods: { mood: Mood; emoji: string; says: string; duration: number }[] = [
  { mood: "jump", emoji: "🐱", says: "Meow! *jumps*", duration: 1500 },
  { mood: "play", emoji: "🐱", says: "Let's play! 🧶", duration: 2000 },
  { mood: "love", emoji: "😻", says: "Purrr ♥", duration: 1800 },
  { mood: "sleep", emoji: "😴", says: "Zzz...", duration: 2200 },
  { mood: "sit", emoji: "🐈", says: "*tail flick*", duration: 1500 },
];

export const PetCat = () => {
  const [x, setX] = useState(20);
  const [dir, setDir] = useState<1 | -1>(1);
  const [mood, setMood] = useState<Mood>("walk");
  const [emoji, setEmoji] = useState("🐈");
  const [bubble, setBubble] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const targetRef = useRef<number>(80);

  // Pick a new random target periodically
  useEffect(() => {
    if (mood !== "walk") return;
    const id = setInterval(() => {
      const next = Math.random() * 90 + 5;
      targetRef.current = next;
    }, 4000);
    return () => clearInterval(id);
  }, [mood]);

  // Walk loop
  useEffect(() => {
    if (mood !== "walk") return;
    const id = setInterval(() => {
      setX((cur) => {
        const t = targetRef.current;
        const diff = t - cur;
        if (Math.abs(diff) < 0.3) return cur;
        setDir(diff > 0 ? 1 : -1);
        return cur + Math.sign(diff) * 0.4;
      });
    }, 30);
    return () => clearInterval(id);
  }, [mood]);

  const handleClick = () => {
    if (mood !== "walk") return;
    const pick = moods[Math.floor(Math.random() * moods.length)];
    setMood(pick.mood);
    setEmoji(pick.emoji);
    setBubble(pick.says);
    setTimeout(() => {
      setMood("walk");
      setEmoji("🐈");
      setBubble(null);
    }, pick.duration);
  };

  if (hidden) {
    return (
      <button
        onClick={() => setHidden(false)}
        className="fixed bottom-4 left-4 z-40 font-mono text-xs bg-card border border-border px-3 py-2 hover:border-primary text-muted-foreground hover:text-primary transition-colors"
        aria-label="Bring back the cat"
      >
        🐈 bring kitty back
      </button>
    );
  }

  const animClass =
    mood === "jump"
      ? "animate-bounce"
      : mood === "play"
      ? "animate-spin"
      : mood === "love"
      ? "animate-pulse"
      : mood === "sleep"
      ? ""
      : mood === "sit"
      ? ""
      : "animate-[bounce_0.5s_ease-in-out_infinite]";

  return (
    <div
      className="fixed bottom-2 z-40 pointer-events-none"
      style={{
        left: `${x}%`,
        transform: `translateX(-50%) scaleX(${dir === 1 ? 1 : -1})`,
        transition: "left 0.05s linear",
      }}
    >
      <div className="relative flex flex-col items-center pointer-events-auto">
        {bubble && (
          <div
            className="absolute -top-10 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider bg-primary text-primary-foreground px-2 py-1 rounded-sm animate-in fade-in"
            style={{ transform: `scaleX(${dir === 1 ? 1 : -1})` }}
          >
            {bubble}
          </div>
        )}
        <button
          onClick={handleClick}
          className={`text-4xl select-none cursor-pointer hover:scale-125 transition-transform ${animClass}`}
          title="Click me!"
          aria-label="Pet the cat"
        >
          {emoji}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setHidden(true);
          }}
          className="absolute -top-1 -right-3 text-[8px] font-mono text-muted-foreground hover:text-destructive bg-card border border-border w-4 h-4 flex items-center justify-center rounded-full"
          style={{ transform: `scaleX(${dir === 1 ? 1 : -1})` }}
          aria-label="Hide cat"
        >
          ×
        </button>
      </div>
    </div>
  );
};
