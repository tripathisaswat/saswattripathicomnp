import { useMemo, useState } from "react";

export default function QrApp() {
  const [text, setText] = useState("https://saswatamarasaini.com.np");
  const url = useMemo(() => `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(text)}`, [text]);
  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3}
        className="w-full bg-card border border-border px-4 py-3 font-mono mb-4" />
      <div className="bg-card border border-border p-6 flex justify-center">
        {text ? <img src={url} alt="QR code" width={240} height={240} /> : <p className="text-muted-foreground">Enter text</p>}
      </div>
    </div>
  );
}
