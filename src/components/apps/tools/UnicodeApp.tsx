import { useState } from "react";

const MAP: [string, string][] = [
  ["ksh", "क्ष"], ["gya", "ज्ञ"], ["sha", "श"], ["chh", "छ"],
  ["tha", "थ"], ["dha", "ध"], ["pha", "फ"], ["bha", "भ"],
  ["kha", "ख"], ["gha", "घ"], ["jha", "झ"],
  ["aa", "आ"], ["ee", "ई"], ["oo", "ऊ"], ["ai", "ऐ"], ["au", "औ"],
  ["ka", "क"], ["ga", "ग"], ["ja", "ज"], ["ta", "त"], ["da", "द"],
  ["na", "न"], ["pa", "प"], ["ba", "ब"], ["ma", "म"], ["ya", "य"],
  ["ra", "र"], ["la", "ल"], ["va", "व"], ["wa", "व"], ["sa", "स"], ["ha", "ह"],
  ["a", "अ"], ["i", "इ"], ["u", "उ"], ["e", "ए"], ["o", "ओ"],
];

function convert(s: string): string {
  let out = "", i = 0;
  const lower = s.toLowerCase();
  while (i < lower.length) {
    let matched = false;
    for (const [k, v] of MAP) {
      if (lower.slice(i, i + k.length) === k) { out += v; i += k.length; matched = true; break; }
    }
    if (!matched) { out += s[i]; i++; }
  }
  return out;
}

export default function UnicodeApp() {
  const [text, setText] = useState("namaste");
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">Type Romanized Nepali → Devanagari.</p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4}
        className="w-full bg-card border border-border px-4 py-3 font-mono" />
      <div className="mt-4 bg-card border border-border p-5">
        <p className="font-mono text-xs text-muted-foreground mb-2">Output</p>
        <p className="text-2xl">{convert(text)}</p>
      </div>
      <button onClick={() => navigator.clipboard.writeText(convert(text))}
        className="mt-4 font-mono text-xs uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground">
        [ copy ]
      </button>
    </div>
  );
}
