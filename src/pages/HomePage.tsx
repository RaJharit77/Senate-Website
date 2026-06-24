import { HeroCarousel } from "../components/home/HeroCarousel";
import { AboutSection } from "../components/home/AboutSection";
import { NewsGrid } from "../components/home/NewsGrid";
import { ParliamentaryWork } from "../components/home/ParliamentaryWork";
import { PartnersBand } from "../components/home/PartnersBand";

export default function HomePage() {
    return (
        <>
            <HeroCarousel />
            <AboutSection />
            <NewsGrid />
            <ParliamentaryWork />
            <PartnersBand />
        </>
    );
}