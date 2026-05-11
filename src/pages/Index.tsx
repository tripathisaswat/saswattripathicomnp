import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Tools } from "@/components/portfolio/Tools";
import { Games } from "@/components/portfolio/Games";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { PetCat } from "@/components/portfolio/PetCat";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Tools />
      <Games />
      <Contact />
      <Footer />
      <PetCat />
    </main>
  );
};

export default Index;
