import { getPageBySlug } from "@/lib/api";
import { EMERALD, RED, WHITE, GREEN } from "@/utils/colors";
import { DocCard, Divider } from "@/components/about/AboutStyles";
import Link from "next/link";

export default async function MissionsPage() {
    const page = await getPageBySlug("nature-et-missions-2");
    if (!page) return <div className="text-white">Page non trouvée</div>;

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <Link href="/about" className="text-cyan-400 font-semibold hover:text-white transition-colors text-sm">
                        À propos
                    </Link>
                    <span className="text-gray-300 mx-2">/</span>
                    <span className="text-cyan-400 text-sm font-semibold">Missions et attributions</span>
                </div>

                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: WHITE, lineHeight: 1.2 }}>
                        Missions et attributions
                    </h1>
                </div>

                <DocCard title="Missions et attributions du Sénat" pillColor={RED}>
                    <Divider color={GREEN}>Missions</Divider>
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