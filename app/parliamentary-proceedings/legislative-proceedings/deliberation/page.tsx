import { getPostsByCategory } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ClientDeliberationList } from "@/components/parliamentary/ClientDeliberationList";

const CAT_ORDRE_JOUR = 11;
const CAT_DELIBERATION = 53;

export default async function DeliberationPage() {
    const [ordreJourPosts, deliberationPosts] = await Promise.all([
        getPostsByCategory(CAT_ORDRE_JOUR, {
            per_page: 100,
            _embed: true,
        }).catch(() => []),
        getPostsByCategory(CAT_DELIBERATION, {
            per_page: 1,
            _embed: true,
        }).catch(() => []),
    ]);

    const allPosts = [...ordreJourPosts];
    const deliberationSlug = "deliberation";
    const hasDeliberation = allPosts.some((p) => p.slug === deliberationSlug);
    if (deliberationPosts.length > 0 && !hasDeliberation) {
        allPosts.push(deliberationPosts[0]);
    }

    const postsWithTable = allPosts.filter((post) =>
        post.content.rendered.includes("<table")
    );

    if (postsWithTable.length === 0) {
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
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Délibérations
                        </h1>
                        <p className="text-white/60 text-lg mt-2 max-w-2xl">
                            Consultez tous les ordres du jour et délibérations du Sénat.
                        </p>
                    </div>
                    <Card className="bg-white/5 backdrop-blur-md rounded-3xl border-white/10 shadow-2xl overflow-hidden">
                        <CardContent className="p-8 text-center text-white/50">
                            Aucun tableau de délibérations trouvé.
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

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
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Délibérations
                    </h1>
                    <p className="text-white/60 text-lg mt-2 max-w-2xl">
                        Consultez tous les ordres du jour et délibérations du Sénat.
                    </p>
                </div>

                <ClientDeliberationList posts={postsWithTable} />
            </div>
        </div>
    );
}