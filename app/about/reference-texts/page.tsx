import { getPageBySlug } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { DocCard, Divider } from "@/components/about/AboutStyles";
import { GREEN } from "@/utils/colors";
import Link from "next/link";

export default async function TextesPage() {
    const page = await getPageBySlug("textes-de-reference");
    if (!page) return <div className="text-white">Page non trouvée</div>;

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <Link href="/about" className="text-cyan-400 font-semibold hover:text-white transition-colors text-sm">
                        À propos
                    </Link>
                    <span className="text-gray-300 mx-2">/</span>
                    <span className="text-cyan-400 text-sm font-semibold">Textes de référence</span>
                </div>

                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: WHITE, lineHeight: 1.2 }}>
                        Textes de référence
                    </h1>
                </div>

                <DocCard title="Textes de référence" pillColor={RED}>
                    <Divider color={GREEN}>Textes régissant le Sénat</Divider>
                    <div
                        className="prose prose-lg max-w-none text-gray-800"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                    />
                </DocCard>
            </div>
        </div>
    );
}