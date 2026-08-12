import { MessageCircle } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Seo, faqJsonLd, breadcrumbJsonLd } from "@/components/Seo";
import { PERSON, SITE_URL } from "@/lib/site";
import { FaqList } from "@/components/FaqList";

const faq = [
  { q: "What does a consulting engagement look like?", a: "Usually a fixed-scope review over one to three weeks: I read the code and documents, interview the people who use the system, and deliver a written assessment with prioritised recommendations and rough costs." },
  { q: "Do you do ongoing advisory?", a: "Yes — a monthly retainer where I join key decisions, review architecture and vendor proposals, and act as an independent technical voice for the business." },
  { q: "Can you evaluate a vendor's quotation?", a: "That is one of the most common requests. I compare the quote against the scope, flag what is missing, and tell you which line items are realistic." },
];

const Consulting = () => (
  <PageLayout crumbs={[{ name: "Home", path: "/" }, { name: "Consulting", path: "/consulting" }]}>
    <Seo
      title="Software & ERP Consulting in Nepal — Independent Technical Advice"
      description="Independent software and ERP consulting in Nepal: vendor quote review, architecture assessment, project rescue and technical advisory for business leaders."
      path="/consulting"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: `${PERSON.name} — Software & ERP Consulting`,
          url: `${SITE_URL}/consulting`,
          areaServed: { "@type": "Country", name: "Nepal" },
          address: { "@type": "PostalAddress", addressLocality: PERSON.city, addressRegion: PERSON.region, addressCountry: "NP" },
          telephone: PERSON.phone,
          email: PERSON.email,
        },
        faqJsonLd(faq),
        breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Consulting", path: "/consulting" }]),
      ]}
    />

    <p className="section-label mb-6">Consulting</p>
    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-8">
      An independent second opinion<span className="text-primary">.</span>
    </h1>

    <div className="space-y-5 text-muted-foreground leading-relaxed text-lg mb-14">
      <p>
        Most expensive software mistakes are made in the first three weeks, before a single line of code
        exists — the wrong scope, the wrong vendor, the wrong sequencing. I sell the part that prevents that.
      </p>
      <p>
        I manage delivery teams full time, so I know what a realistic plan looks like from the inside, and
        I have no incentive to sell you a bigger build than you need.
      </p>
    </div>

    <h2 className="font-display text-3xl mb-8">What I'm typically asked to do</h2>
    <ul className="space-y-3 mb-16 text-muted-foreground leading-relaxed">
      {[
        "Review a vendor proposal or quotation before you sign it.",
        "Assess an existing system: architecture, data model, security, maintainability.",
        "Decide between buying a ready-made product and building custom.",
        "Rescue or re-plan a project that has stalled.",
        "Define the phases and acceptance criteria for an ERP rollout.",
        "Advise on where AI automation is worth the money and where it isn't.",
      ].map((t) => (
        <li key={t} className="flex gap-3">
          <span className="text-primary shrink-0">—</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>

    <h2 className="font-display text-3xl mb-8">Questions</h2>
    <FaqList items={faq} />

    <div className="mt-16 border border-primary/30 bg-card/40 p-8">
      <h2 className="font-display text-2xl mb-3">Start with a short call</h2>
      <p className="text-muted-foreground mb-6">No charge for the first conversation.</p>
      <a href={PERSON.whatsapp} className="btn-gold">
        <MessageCircle size={14} /> WhatsApp {PERSON.phone}
      </a>
    </div>
  </PageLayout>
);

export default Consulting;
