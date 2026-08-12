import { Nav } from "@/components/portfolio/Nav";
import { Footer } from "@/components/portfolio/Footer";
import { Games } from "@/components/portfolio/Games";
import { Seo, breadcrumbJsonLd } from "@/components/Seo";

const GamesPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main className="pt-32">
      <Seo
        title="Free Browser Games Arcade — Play Instantly, No Download"
        description="A free browser arcade: 2048, Minesweeper, Breakout, Snake, Connect Four, Memory and more. Play instantly in a popup, no download or sign-up."
        path="/games"
        jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Arcade", path: "/games" }])}
      />
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label mb-6">Arcade</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
          Browser games, zero downloads<span className="text-primary">.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Built for fun in spare evenings. Your best scores are saved locally in your browser.
        </p>
      </div>
      <Games />
    </main>
    <Footer />
  </div>
);

export default GamesPage;
