import { Link } from "react-router-dom";
import { SERVICES, POSTS, PERSON } from "@/lib/site";

export const Footer = () => (
  <footer className="border-t border-border pt-16 pb-8 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
        <div>
          <p className="font-display text-2xl mb-3">
            Saswat Tripathi<span className="text-primary">.</span>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Project Manager, ERP consultant and AI agent developer based in {PERSON.city}, {PERSON.country}.
          </p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-4">Services</p>
          <ul className="space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {s.nav}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/consulting" className="text-muted-foreground hover:text-primary transition-colors">
                Consulting
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-4">Writing</p>
          <ul className="space-y-2 text-sm">
            {POSTS.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-4">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tools" className="text-muted-foreground hover:text-primary transition-colors">Free tools</Link></li>
            <li><Link to="/games" className="text-muted-foreground hover:text-primary transition-colors">Arcade</Link></li>
            <li><a href={PERSON.whatsapp} className="text-muted-foreground hover:text-primary transition-colors">WhatsApp</a></li>
            <li><a href={PERSON.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
            <li><a href={PERSON.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <p>© {new Date().getFullYear()} Saswat Tripathi — {PERSON.city}, Nepal</p>
        <p><span className="text-primary">●</span> available for work</p>
      </div>
    </div>
  </footer>
);
