import "../styles/fonts.css";
import { Header } from "./components/Header";
import { HeroCarousel } from "./components/HeroCarousel";
import { InfoStrip } from "./components/InfoStrip";
import { NewsGrid } from "./components/NewsGrid";
import { AboutSection } from "./components/AboutSection";
import { ParliamentaryWork } from "./components/ParliamentaryWork";
import { SenatorsSection } from "./components/SenatorsSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Header />
      <main>
        <HeroCarousel />
        <InfoStrip />
        <NewsGrid />
        <AboutSection />
        <ParliamentaryWork />
        <SenatorsSection />
      </main>
      <Footer />
    </div>
  );
}
