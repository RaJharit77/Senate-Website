import { getAllRelevantPosts } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClientDeliberationList } from "@/components/parliamentary/ClientDeliberationList";

export const dynamic = "force-dynamic";

export default async function DeliberationListPage() {
    const allPosts = await getAllRelevantPosts().catch(() => []);
    const postsWithContent = allPosts;

    return (
        <div className="min-h-screen bg-linear-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-sm py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <Link
                        href="/parliamentary-proceedings/legislative-proceedings"
                        className="text-cyan-300 hover:text-cyan-200 text-sm items-center gap-1 mb-4 inline-flex transition group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Retour aux travaux législatifs
                    </Link>
                    <h1
                        className="text-white text-4xl md:text-5xl font-bold tracking-tight"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Délibérations et ordres du jour
                    </h1>
                    <p className="text-white/60 text-lg mt-2 max-w-2xl">
                        Consultez tous les ordres du jour, délibérations et textes adoptés par le Sénat.
                    </p>
                </div>

                {postsWithContent.length === 0 ? (
                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 text-center text-white/40 border border-white/10">
                        Aucun article trouvé dans cette section.
                    </div>
                ) : (
                    <ClientDeliberationList
                        posts={postsWithContent}
                        initialIndex={0}
                        useRouterNavigation={true}
                    />
                )}
            </div>
        </div>
    );
}