import { Github, Linkedin, Instagram, ArrowDown, Mail } from "lucide-react";
import portrait from "@/assets/saswat.jpg";

export const Hero = () => (
  <section
    id="home"
    className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden"
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "var(--gradient-glow)" }}
    />

    <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative">
      <div className="lg:col-span-7 space-y-8">
        <p className="section-label">welcome.init()</p>

        <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight">
          Hi, I'm{" "}
          <span className="text-primary text-glow">Saswat</span>
          <span className="text-primary">.</span>
        </h1>

        <p className="font-mono text-sm sm:text-base text-muted-foreground max-w-xl">
          <span className="text-primary">&gt;</span> Senior Software Developer building
          ERP systems, full-stack apps, and digital tools for Nepal.{" "}
          <span className="cursor-blink" />
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="#contact"
            className="group font-mono text-xs uppercase tracking-wider bg-primary text-primary-foreground px-6 py-3 inline-flex items-center gap-2 hover:bg-accent transition-colors"
          >
            <Mail size={14} />
            Get in touch
          </a>
          <a
            href="#about"
            className="group font-mono text-xs uppercase tracking-wider border border-border text-foreground px-6 py-3 inline-flex items-center gap-2 hover:border-primary hover:text-primary transition-colors"
          >
            About me
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <a
            href="https://github.com/tripathisaswat"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/saswat-tripathi-95b599142/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://instagram.com/tripsaswat"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram size={20} />
          </a>
          <span className="font-mono text-xs text-muted-foreground ml-2">
            @tripsaswat
          </span>
        </div>
      </div>

      <div className="lg:col-span-5 relative">
        <div className="relative max-w-md mx-auto">
          <div className="absolute -inset-1 bg-primary/30 blur-2xl rounded-full" />
          <div className="relative aspect-square overflow-hidden border-2 border-primary/40 rounded-full">
            <img
              src={portrait}
              alt="Saswat Tripathi"
              width={768}
              height={768}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-card border border-border px-4 py-2 font-mono text-xs">
            <span className="text-primary">●</span> available for work
          </div>
          <div className="absolute -top-4 -right-4 bg-card border border-border px-4 py-2 font-mono text-xs">
            KTM, NP
          </div>
        </div>
      </div>
    </div>
  </section>
);
