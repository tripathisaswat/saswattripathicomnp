import { useState } from "react";

export default function PasswordApp() {
  const [len, setLen] = useState(16);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [pwd, setPwd] = useState("");

  const gen = () => {
    let pool = "";
    if (lower) pool += "abcdefghijklmnopqrstuvwxyz";
    if (upper) pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (digits) pool += "0123456789";
    if (symbols) pool += "!@#$%^&*()-_=+[]{};:,.?";
    if (!pool) return setPwd("");
    let p = "";
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    for (let i = 0; i < len; i++) p += pool[arr[i] % pool.length];
    setPwd(p);
  };

  return (
    <div>
      <label className="block mb-4">
        <span className="font-mono text-xs text-muted-foreground">Length: {len}</span>
        <input type="range" min={6} max={48} value={len} onChange={(e) => setLen(+e.target.value)} className="w-full mt-2" />
      </label>
      <div className="grid grid-cols-2 gap-3 font-mono text-sm mb-4">
        {[["a-z", lower, setLower], ["A-Z", upper, setUpper], ["0-9", digits, setDigits], ["!@#", symbols, setSymbols]].map(([l, v, s]: any) => (
          <label key={l} className="flex items-center gap-2">
            <input type="checkbox" checked={v} onChange={(e) => s(e.target.checked)} /> {l}
          </label>
        ))}
      </div>
      <button onClick={gen} className="font-mono text-xs uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground">
        [ generate ]
      </button>
      {pwd && (
        <div className="mt-4 bg-card border border-border p-4 flex items-center justify-between gap-3">
          <code className="break-all">{pwd}</code>
          <button onClick={() => navigator.clipboard.writeText(pwd)} className="font-mono text-xs text-primary shrink-0">copy</button>
        </div>
      )}
    </div>
  );
}
