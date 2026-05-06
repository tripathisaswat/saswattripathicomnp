export const Footer = () => (
  <footer className="border-t border-border py-8 px-6">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs text-muted-foreground">
      <p>
        <span className="text-primary">©</span> {new Date().getFullYear()} Saswat Tripathi — built with care in Kathmandu.
      </p>
      <p>
        v2.0 / <span className="text-primary">●</span> live
      </p>
    </div>
  </footer>
);
