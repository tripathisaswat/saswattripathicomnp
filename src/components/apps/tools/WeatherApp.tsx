import { useEffect, useState } from "react";

type W = { city: string; temp: number | null; cond: string };

const CITIES = [
  { name: "Kathmandu", lat: 27.7, lon: 85.3 },
  { name: "Pokhara", lat: 28.2, lon: 83.99 },
  { name: "Lalitpur", lat: 27.67, lon: 85.32 },
  { name: "Biratnagar", lat: 26.45, lon: 87.27 },
  { name: "Birgunj", lat: 27.0, lon: 84.87 },
  { name: "Dharan", lat: 26.81, lon: 87.28 },
];

const CODE: Record<number, string> = {
  0: "Clear", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Fog", 51: "Drizzle", 61: "Rain", 71: "Snow", 80: "Showers", 95: "Thunder",
};

export default function WeatherApp() {
  const [data, setData] = useState<W[]>(CITIES.map((c) => ({ city: c.name, temp: null, cond: "…" })));

  useEffect(() => {
    Promise.all(CITIES.map(async (c) => {
      try {
        const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true`);
        const j = await r.json();
        return { city: c.name, temp: j.current_weather?.temperature ?? null, cond: CODE[j.current_weather?.weathercode] ?? "—" };
      } catch {
        return { city: c.name, temp: null, cond: "Offline" };
      }
    })).then(setData);
  }, []);

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {data.map((d) => (
          <div key={d.city} className="bg-card p-5">
            <p className="font-mono text-xs text-muted-foreground">{d.city}</p>
            <p className="text-3xl font-bold mt-1 text-primary">
              {d.temp !== null ? `${Math.round(d.temp)}°C` : "—"}
            </p>
            <p className="font-mono text-xs mt-1">{d.cond}</p>
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground mt-4">Live data from open-meteo.com</p>
    </div>
  );
}
