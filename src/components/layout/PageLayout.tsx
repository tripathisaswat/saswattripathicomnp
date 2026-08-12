import { Link } from "react-router-dom";
import { Nav } from "@/components/portfolio/Nav";
import { Footer } from "@/components/portfolio/Footer";

export const PageLayout = ({
  crumbs,
  children,
}: {
  crumbs: { name: string; path: string }[];
  children: React.ReactNode;
}) => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span className="text-border">/</span>}
                {i === crumbs.length - 1 ? (
                  <span className="text-primary">{c.name}</span>
                ) : (
                  <Link to={c.path} className="hover:text-primary transition-colors">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

export const Prose = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-5 text-muted-foreground leading-relaxed [&_strong]:text-foreground">
    {children}
  </div>
);
