import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SERVICES } from "@/lib/site";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/services/erp-development", label: "Services" },
  { href: "/tools", label: "Tools" },
  { href: "/games", label: "Arcade" },
  { href: "/blog", label: "Blog" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl leading-none tracking-tight">
          Saswat<span className="text-primary">.</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) =>
            l.label === "Services" ? (
              <li
                key={l.label}
                className="relative"
                onMouseEnter={() => setSvcOpen(true)}
                onMouseLeave={() => setSvcOpen(false)}
              >
                <button className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 text-muted-foreground hover:text-primary transition-colors">
                  Services
                </button>
                {svcOpen && (
                  <div className="absolute left-0 top-full w-64 bg-popover border border-border">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-card transition-colors"
                      >
                        {s.nav}
                      </Link>
                    ))}
                    <Link
                      to="/consulting"
                      className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-card transition-colors border-t border-border"
                    >
                      Consulting
                    </Link>
                  </div>
                )}
              </li>
            ) : (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <Link
          to="/#contact"
          className="hidden lg:inline-block font-mono text-[10px] uppercase tracking-[0.2em] border border-primary text-primary px-5 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Hire Me
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground p-2 min-h-11 min-w-11 flex items-center justify-center"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-background border-t border-border max-h-[75vh] overflow-y-auto">
          <ul className="px-6 py-4 space-y-1">
            {links
              .filter((l) => l.label !== "Services")
              .map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="block font-mono text-sm py-2.5 text-muted-foreground hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            <li className="pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Services</li>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="block font-mono text-sm py-2.5 text-muted-foreground hover:text-primary">
                  {s.nav}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/consulting" className="block font-mono text-sm py-2.5 text-muted-foreground hover:text-primary">
                Consulting
              </Link>
            </li>
            <li>
              <Link to="/#contact" className="block font-mono text-sm py-2.5 text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
