import { getCategoriesByParent, getPageBySlug, getPosts, getPostsByCategory } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { Card, CardContent } from "@/components/ui/card";
import { CategorySection } from "@/components/parliamentary/CategorySection";
import { DeliberationTable } from "@/components/parliamentary/DeliberationTable";
import type { WpCategory, WpPost } from "@/lib/types";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const PARENT_CATEGORY_ID = 10;

export default async function LegislativeProceedingsPage() {
    const introPage = await getPageBySlug("travaux-legislatifs-2").catch(() => null);

    const subCategories: WpCategory[] = await getCategoriesByParent(PARENT_CATEGORY_ID, {
        _embed: true,
    }).catch(() => []);

    const sections = await Promise.all(
        subCategories.map(async (cat) => {
            const posts = await getPostsByCategory(cat.id, {
                per_page: 10,
                _embed: true,
            }).catch(() => []) as WpPost[];
            return { category: cat, posts };
        })
    );

    sections.sort((a, b) => a.category.name.localeCompare(b.category.name));

    let deliberationPost = null;
    const deliberationPosts = await getPostsByCategory(53, { per_page: 1, _embed: true }).catch(() => []);
    if (deliberationPosts.length > 0) {
        deliberationPost = deliberationPosts[0];
    } else {
        const slugPosts = await getPosts({ slug: "deliberation", _embed: true }).catch(() => []);
        deliberationPost = slugPosts[0] || null;
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
                    <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Travaux législatifs
                    </h1>
                    <p className="text-white/60 text-lg mt-2 max-w-2xl leading-relaxed">
                        Découvrez la procédure législative, les lois et les délibérations du Sénat.
                    </p>
                </div>

                {introPage && (
                    <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-12 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-emerald-500/5" />
                        <div className="relative prose prose-lg prose-invert max-w-none">
                            <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="inline-block w-1 h-8 bg-cyan-400 rounded-full" />
                                Procédure législative
                            </h2>
                            <div
                                className="text-white/80 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_strong]:text-cyan-300"
                                dangerouslySetInnerHTML={{ __html: introPage.content.rendered }}
                            />
                        </div>
                    </div>
                )}

                {sections.length === 0 ? (
                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 text-center text-white/40 border border-white/10">
                        Aucune sous-catégorie trouvée.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {sections
                            .filter(({ category }) => category.slug !== "deliberation")
                            .map(({ category, posts }) => (
                                <div
                                    key={category.id}
                                    className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                                >
                                    <CategorySection title={category.name} posts={posts} isDeliberation={false} />
                                </div>
                            ))}
                    </div>
                )}

                {deliberationPost && (
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                                <span className="inline-block w-1 h-8 bg-emerald-400 rounded-full" />
                                Délibérations
                            </h2>
                            <Link
                                href="/parliamentary-proceedings/legislative-proceedings/deliberation"
                                className="text-sm text-cyan-300 hover:text-cyan-200 transition flex items-center gap-1"
                            >
                                Voir en plein écran <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <Card className="bg-white/5 backdrop-blur-md rounded-3xl border-white/10 shadow-2xl overflow-hidden">
                            <CardContent className="p-4 md:p-6">
                                {deliberationPost.content.rendered.includes("<table") ? (
                                    <DeliberationTable tableHtml={deliberationPost.content.rendered} />
                                ) : (
                                    <p className="text-white/50">Aucun tableau de délibérations.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}