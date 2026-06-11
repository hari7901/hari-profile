import { Background } from "@/components/layout/Background";
import { Intro } from "@/components/layout/Intro";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EasterEggs } from "@/components/layout/EasterEggs";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";

const MARQUEE_WORDS = [
  "TypeScript",
  "Full-Stack",
  "Microservices",
  "AWS Cloud",
  "React",
  "Node.js",
  "TypeScript · First",
  "SOLID",
  "OAuth 2.0",
];

export default function App() {
  return (
    <div className="grain relative min-h-screen">
      <Intro />
      <Background />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <VelocityMarquee items={MARQUEE_WORDS} className="my-16 md:my-24" />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <EasterEggs />
    </div>
  );
}
