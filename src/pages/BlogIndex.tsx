import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Seo, breadcrumbJsonLd } from "@/components/Seo";
import { POSTS, SITE_URL } from "@/lib/site";

const BlogIndex = () => (
  <PageLayout crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]}>
    <Seo
      title="Blog — ERP, HR Software & Software Development in Nepal"
      description="Practical writing on ERP, HR and payroll software, AI agents, and what custom software really costs in Nepal — from a project manager who ships it."
      path="/blog"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Saswat Tripathi — Notes on software in Nepal",
          url: `${SITE_URL}/blog`,
          blogPost: POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            datePublished: p.date,
            url: `${SITE_URL}/blog/${p.slug}`,
          })),
        },
        breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]),
      ]}
    />

    <p className="section-label mb-6">Writing</p>
    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
      Notes on building software in Nepal<span className="text-primary">.</span>
    </h1>
    <p className="text-lg text-muted-foreground max-w-2xl mb-16">
      No thought-leadership fluff — buying guides, real price ranges, and the things vendors in this
      market would rather you didn't ask.
    </p>

    <ul className="space-y-px bg-border">
      {POSTS.map((p) => (
        <li key={p.slug}>
          <Link to={`/blog/${p.slug}`} className="bg-background p-7 block group hover:bg-card transition-colors">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              <span className="mx-2 text-border">/</span>
              {p.readMins} min read
            </div>
            <h2 className="font-display text-2xl sm:text-3xl mb-2 group-hover:text-primary transition-colors">
              {p.title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mb-4">{p.description}</p>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary inline-flex items-center gap-2">
              Read <ArrowRight size={12} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </PageLayout>
);

export default BlogIndex;
