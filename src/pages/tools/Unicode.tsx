import { useState } from "react";
import { PageShell } from "@/components/portfolio/PageShell";

// Simple Romanized -> Devanagari mapping (Preeti-style basic)
const MAP: [string, string][] = [
  ["ksh", "क्ष"], ["gya", "ज्ञ"], ["sha", "श"], ["chh", "छ"],
  ["tha", "थ"], ["dha", "ध"], ["pha", "फ"], ["bha", "भ"],
  ["kha", "ख"], ["gha", "घ"], ["jha", "झ"],
  ["aa", "आ"], ["ee", "ई"], ["oo", "ऊ"], ["ai", "ऐ"], ["au", "औ"],
  ["ka", "क"], ["ga", "ग"], ["ja", "ज"], ["ta", "त"], ["da", "द"],
  ["na", "न"], ["pa", "प"], ["ba", "ब"], ["ma", "म"], ["ya", "य"],
  ["ra", "र"], ["la", "ल"], ["va", "व"], ["wa", "व"], ["sa", "स"], ["ha", "ह"],
  ["a", "अ"], ["i", "इ"], ["u", "उ"], ["e", "ए"], ["o", "ओ"],
  ["k", "क्"], ["g", "ग्"], ["j", "ज्"], ["t", "त्"], ["d", "द्"],
  ["n", "न्"], ["p", "प्"], ["b", "ब्"], ["m", "म्"], ["y", "य्"],
  ["r", "र्"], ["l", "ल्"], ["v", "व्"], ["w", "व्"], ["s", "स्"], ["h", "ह्"],
];

function convert(s: string): string {
  let out = "";
  let i = 0;
  const lower = s.toLowerCase();
  while (i < lower.length) {
    let matched = false;
    for (const [k, v] of MAP) {
      if (lower.slice(i, i + k.length) === k) {
        out += v;
        i += k.length;
        matched = true;
        break;
      }
    }
    if (!matched) { out += s[i]; i++; }
  }
  return out;
}

export default function Unicode() {
  const [text, setText] = useState("namaste");

  return (
    <PageShell label="tools/unicode" title="Nepali Unicode Converter">
      <p className="text-muted-foreground mb-6">Type Romanized Nepali, see Devanagari output.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="w-full bg-card border border-border px-4 py-3 font-mono"
      />
      <div className="mt-6 bg-card border border-border p-6">
        <p className="font-mono text-xs text-muted-foreground mb-2">Output</p>
        <p className="text-2xl">{convert(text)}</p>
      </div>
      <button
        onClick={() => navigator.clipboard.writeText(convert(text))}
        className="mt-4 font-mono text-xs uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        [ copy ]
      </button>
    </PageShell>
  );
}
