export const FaqList = ({ items }: { items: { q: string; a: string }[] }) => (
  <div className="space-y-px bg-border">
    {items.map((f) => (
      <details key={f.q} className="bg-background group">
        <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4 hover:text-primary transition-colors">
          <h3 className="font-medium">{f.q}</h3>
          <span className="text-primary font-mono text-lg leading-none shrink-0 group-open:rotate-45 transition-transform">
            +
          </span>
        </summary>
        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
      </details>
    ))}
  </div>
);
