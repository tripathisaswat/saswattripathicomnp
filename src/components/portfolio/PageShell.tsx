import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const PageShell = ({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: React.ReactNode;
}) => (
  <main className="min-h-screen bg-background text-foreground">
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link
        to="/"
        className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary inline-flex items-center gap-2 mb-8"
      >
        <ArrowLeft size={14} /> back
      </Link>
      <p className="font-mono text-xs uppercase tracking-wider text-primary mb-3">{label}</p>
      <h1 className="font-sans text-4xl sm:text-5xl font-bold mb-10">
        {title}
        <span className="text-primary">.</span>
      </h1>
      {children}
    </div>
  </main>
);
