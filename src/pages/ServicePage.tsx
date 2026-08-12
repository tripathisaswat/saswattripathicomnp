import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Seo, faqJsonLd, breadcrumbJsonLd } from "@/components/Seo";
import { SERVICES, POSTS, PERSON, SITE_URL } from "@/lib/site";
import { FaqList } from "@/components/FaqList";

const ServicePage = () => {
  const { slug } = useParams();
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) return <Navigate to="/404" replace />;

  const path = `/services/${svc.slug}`;

  return (
    <PageLayout
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services/erp-development" },
        { name: svc.nav, path },
      ]}
    >
      <Seo
        title={svc.title}
        description={svc.description}
        path={path}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: svc.h1,
            description: svc.description,
            serviceType: svc.nav,
            areaServed: { "@type": "Country", name: "Nepal" },
            provider: {
              "@type": "Person",
              name: PERSON.name,
              url: SITE_URL,
              jobTitle: PERSON.role,
              address: { "@type": "PostalAddress", addressLocality: PERSON.city, addressCountry: "NP" },
            },
          },
          faqJsonLd(svc.faq),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: svc.nav, path },
          ]),
        ]}
      />

      <p className="section-label mb-6">{svc.nav}</p>
      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-8">
        {svc.h1}<span className="text-primary">.</span>
      </h1>

      <div className="space-y-5 text-muted-foreground leading-relaxed text-lg mb-14">
        {svc.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <h2 className="font-display text-3xl mb-8">What's included</h2>
      <div className="grid sm:grid-cols-2 gap-px bg-border mb-16">
        {svc.bullets.map((b) => (
          <div key={b.h} className="bg-background p-6">
            <div className="flex items-start gap-3">
              <Check size={16} className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">{b.h}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.p}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-3xl mb-8">Common questions</h2>
      <FaqList items={svc.faq} />

      <div className="mt-16 border border-primary/30 bg-card/40 p-8">
        <h2 className="font-display text-3xl mb-3">Talk it through</h2>
        <p className="text-muted-foreground mb-6 max-w-xl">
          Send a two-line description of what you're trying to do. I'll tell you whether it's worth
          building, roughly what it costs, and if I'm the right person for it.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={PERSON.whatsapp} className="btn-gold">
            <MessageCircle size={14} /> WhatsApp {PERSON.phone}
          </a>
          <Link to="/#contact" className="btn-ghost">
            Send a message <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-3xl mb-6">Related reading</h2>
        <ul className="space-y-px bg-border">
          {POSTS.slice(0, 3).map((p) => (
            <li key={p.slug}>
              <Link to={`/blog/${p.slug}`} className="bg-background p-5 flex items-center justify-between gap-4 group hover:bg-card transition-colors">
                <span className="group-hover:text-primary transition-colors">{p.title}</span>
                <ArrowRight size={16} className="text-primary shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 flex flex-wrap gap-3">
        {SERVICES.filter((s) => s.slug !== svc.slug).map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className="font-mono text-[10px] uppercase tracking-[0.2em] border border-border px-4 py-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {s.nav}
          </Link>
        ))}
      </div>
    </PageLayout>
  );
};

export default ServicePage;
