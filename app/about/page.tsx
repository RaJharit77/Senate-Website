import { MissionSection } from "@/components/about/MissionSection";
import { StructuresSection } from "@/components/about/StructuresSection";
import { TextesSection } from "@/components/about/TextesSection";
import { EMERALD, RED, WHITE } from "@/utils/colors";

export default function AboutPage() {
    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h1
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 700,
                            color: WHITE,
                            lineHeight: 1.2,
                        }}
                    >
                        À propos du Sénat
                    </h1>
                    <p
                        style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "1.1rem",
                            color: "rgba(255,255,255,0.5)",
                            marginTop: "0.5rem",
                            maxWidth: "600px",
                        }}
                    >
                        Découvrez l&apos;histoire, la mission et l&apos;organisation de la chambre haute du Parlement malgache.
                    </p>
                </div>

                <div className="space-y-16">
                    <MissionSection />
                    <StructuresSection />
                    <TextesSection />
                </div>
            </div>
        </div>
    );
}