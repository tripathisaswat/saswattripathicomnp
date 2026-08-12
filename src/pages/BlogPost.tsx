import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Seo, faqJsonLd, breadcrumbJsonLd } from "@/components/Seo";
import { POSTS, PERSON, SITE_URL } from "@/lib/site";
import { FaqList } from "@/components/FaqList";

const BlogPost = () => {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/404" replace />;

  const path = `/blog/${post.slug}`;
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageLayout
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path },
      ]}
    >
      <Seo
        title={post.metaTitle}
        description={post.description}
        path={path}
        type="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: `${SITE_URL}${path}`,
            keywords: post.tags.join(", "),
            author: { "@type": "Person", name: PERSON.name, url: SITE_URL },
            publisher: { "@type": "Person", name: PERSON.name, url: SITE_URL },
          },
          ...(post.faq ? [faqJsonLd(post.faq)] : []),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
          ]),
        ]}
      />

      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
        {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        <span className="mx-2 text-border">/</span>
        {post.readMins} min read
      </div>

      <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] mb-8">{post.title}</h1>

      <div className="flex flex-wrap gap-2 mb-12">
        {post.tags.map((t) => (
          <span key={t} className="font-mono text-[10px] uppercase tracking-[0.2em] border border-border px-3 py-1 text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <article className="space-y-8">
        {post.body.map((b, i) => (
          <section key={i}>
            {b.h && <h2 className="font-display text-2xl sm:text-3xl mb-4">{b.h}</h2>}
            {b.p?.map((p) => (
              <p key={p} className="text-muted-foreground leading-relaxed text-lg mb-4">
                {p}
              </p>
            ))}
            {b.ul && (
              <ul className="space-y-3">
                {b.ul.map((li) => (
                  <li key={li} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <span className="text-primary shrink-0">—</span>
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      {post.faq && (
        <div className="mt-16">
          <h2 className="font-display text-3xl mb-6">FAQ</h2>
          <FaqList items={post.faq} />
        </div>
      )}

      <div className="mt-16 border border-primary/30 bg-card/40 p-8">
        <h2 className="font-display text-2xl mb-3">Working on something like this?</h2>
        <p className="text-muted-foreground mb-6">
          I scope ERP, HR and AI automation projects for businesses in Nepal. A short conversation is free.
        </p>
        <a href={PERSON.whatsapp} className="btn-gold">
          <MessageCircle size={14} /> Message on WhatsApp
        </a>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-3xl mb-6">Keep reading</h2>
        <ul className="space-y-px bg-border">
          {others.map((p) => (
            <li key={p.slug}>
              <Link to={`/blog/${p.slug}`} className="bg-background p-5 flex items-center justify-between gap-4 group hover:bg-card transition-colors">
                <span className="group-hover:text-primary transition-colors">{p.title}</span>
                <ArrowRight size={16} className="text-primary shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
};

export default BlogPost;
