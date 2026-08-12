import { Nav } from "@/components/portfolio/Nav";
import { Footer } from "@/components/portfolio/Footer";
import { Tools } from "@/components/portfolio/Tools";
import { Seo, breadcrumbJsonLd } from "@/components/Seo";

const ToolsPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main className="pt-32">
      <Seo
        title="Free Online Tools for Nepal — Tax, Loan, Calendar & More"
        description="Free browser tools for Nepal: salary tax calculator, EMI/loan calculator, BS-AD calendar converter, unicode converter, weather, QR generator and more."
        path="/tools"
        jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }])}
      />
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label mb-6">Free tools</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
          Everyday tools, built for Nepal<span className="text-primary">.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Free, no sign-up, no data leaves your browser. Tap any card to open it instantly.
        </p>
      </div>
      <Tools />
    </main>
    <Footer />
  </div>
);

export default ToolsPage;
