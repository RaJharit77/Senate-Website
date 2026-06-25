import { TextesSection } from "@/components/about/TextesSection";
import Link from "next/link";
import { GREEN, RED, WHITE } from "@/components/about/AboutStyles";

export default function TextesPage() {
    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                {/* Fil d'Ariane */}
                <div className="mb-6">
                    <Link
                        href="/about"
                        className="text-white/50 hover:text-white transition-colors text-sm"
                    >
                        À propos
                    </Link>
                    <span className="text-white/30 mx-2">/</span>
                    <span className="text-cyan-400 text-sm font-semibold">Textes de référence</span>
                </div>

                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: GREEN }} />
                    </div>
                    <h1
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 700,
                            color: "#ffffff",
                            lineHeight: 1.2,
                        }}
                    >
                        Textes de référence
                    </h1>
                </div>

                <TextesSection />
            </div>
        </div>
    );
}