import { StructuresSection } from "@/components/about/StructuresSection";
import Link from "next/link";
import { GREEN, RED, WHITE } from "@/utils/colors";

export default function StructuresPage() {
    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/about"
                        className="text-white/50 hover:text-white transition-colors text-sm"
                    >
                        À propos
                    </Link>
                    <span className="text-white/30 mx-2">/</span>
                    <span className="text-cyan-400 text-sm font-semibold">Structures</span>
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
                        Structures du Sénat
                    </h1>
                </div>

                <StructuresSection />
            </div>
        </div>
    );
}