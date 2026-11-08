import { getCategoriesByParent, getPageBySlug, getPosts, getPostsByCategory } from "@/lib/api";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { Card, CardContent } from "@/components/ui/card";
import { CategorySection } from "@/components/parliamentary/CategorySection";
import { DeliberationTable } from "@/components/parliamentary/DeliberationTable";
import type { WpCategory, WpPost } from "@/lib/wp-types";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, ChevronRight, FileCheck2, Gavel, ScrollText } from "lucide-react";
import { CAT_LOIS_ADOPTES, PARENT_CATEGORY_ID } from "@/constants/constants";
import { cleanText, formatDate } from "@/utils/utilities";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { AGENDA_INTRO, NAV, norm, TEXTS_INTRO } from "@/constants/parliamentaryProceedings";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
    title: "Travaux législatifs du Sénat",
    description: "Découvrez la procédure législative, les lois, les délibérations et l'ordre du jour du Sénat de Madagascar.",
    path: "/parliamentary-proceedings/legislative-proceedings",
});

function SectionTitle({ icon: Icon, title, id }: { icon: typeof BookOpen; title: string; id?: string }) {
    return (
        <div id={id} className="scroll-mt-40 flex items-center gap-4 mb-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-300/30">
                <Icon className="h-5 w-5" />
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
            <span className="hidden sm:block h-px flex-1 bg-linear-to-r from-white/25 to-transparent" />
        </div>
    );
}

export default async function LegislativeProceedingsPage() {
    const introPage = await getPageBySlug("travaux-legislatifs-2").catch(() => null);

    const subCategories: WpCategory[] = await getCategoriesByParent(PARENT_CATEGORY_ID, {
        _embed: true,
    }).catch(() => []);

    const sections = await Promise.all(
        subCategories.map(async (cat) => {
            const posts = (await getPostsByCategory(cat.id, {
                per_page: 10,
                _embed: true,
            }).catch(() => [])) as WpPost[];
            return { category: cat, posts };
        })
    );

    sections.sort((a, b) => a.category.name.localeCompare(b.category.name));

    const lawsAlreadyShown = subCategories.some((c) => c.id === CAT_LOIS_ADOPTES);
    const adoptedLaws: WpPost[] = lawsAlreadyShown
        ? []
        : ((await getPostsByCategory(CAT_LOIS_ADOPTES, { per_page: 10, _embed: true }).catch(() => [])) as WpPost[]);

    let deliberationPost = null;
    const deliberationPosts = await getPostsByCategory(53, { per_page: 1, _embed: true }).catch(() => []);
    if (deliberationPosts.length > 0) {
        deliberationPost = deliberationPosts[0];
    } else {
        const slugPosts = await getPosts({ slug: "deliberation", _embed: true }).catch(() => []);
        deliberationPost = slugPosts[0] || null;
    }

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Travaux parlementaires", url: `${SITE_URL}/parliamentary-proceedings` },
        { name: "Travaux législatifs", url: `${SITE_URL}/parliamentary-proceedings/legislative-proceedings` },
    ]);

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Travaux législatifs du Sénat",
        description: "Procédure législative, lois, délibérations et ordre du jour du Sénat de Madagascar.",
        url: `${SITE_URL}/parliamentary-proceedings/legislative-proceedings`,
        inLanguage: "fr-FR",
    };

    const visibleSections = sections.filter(({ category }) => category.slug !== "deliberation");

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <div className="min-h-screen bg-linear-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-sm py-12 px-4 sm:px-6 font-poppins">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <div className="flex gap-1 mb-4 h-[3px]">
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight font-poppins">
                            Travaux législatifs
                        </h1>
                        <p className="text-[#c0c0c0] text-lg mt-2 max-w-2xl leading-relaxed">
                            Découvrez la procédure législative, les lois et les délibérations du Sénat.
                        </p>
                    </div>

                    <nav className="mb-12 flex flex-wrap gap-2">
                        {NAV.map((n) => (
                            <a
                                key={n.href}
                                href={n.href}
                                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm transition hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-200"
                            >
                                {n.label}
                            </a>
                        ))}
                    </nav>

                    <section id="textes" className="scroll-mt-40 mb-14">
                        <div className="grid gap-6 md:grid-cols-2">
                            <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md shadow-xl">
                                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl" />
                                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-300/30">
                                    <Gavel className="h-5 w-5" />
                                </span>
                                <h2 className="text-xl font-bold text-white mb-2">Textes à examiner</h2>
                                <p className="text-[#c0c0c0] leading-relaxed">{TEXTS_INTRO}</p>
                            </article>

                            <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md shadow-xl">
                                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />
                                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/30">
                                    <CalendarDays className="h-5 w-5" />
                                </span>
                                <h2 className="text-xl font-bold text-white mb-2">Ordre du jour</h2>
                                <p className="text-[#c0c0c0] leading-relaxed">{AGENDA_INTRO}</p>
                            </article>
                        </div>
                    </section>

                    {introPage && (
                        <section id="procedure" className="scroll-mt-40 mb-14">
                            <SectionTitle icon={BookOpen} title="Procédure législative" />
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur-md shadow-2xl">
                                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-emerald-500/5 pointer-events-none" />
                                <div
                                    className="relative prose prose-lg prose-invert max-w-none text-[#c0c0c0]
                                        [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_strong]:text-cyan-300 [&_h2]:text-cyan-300"
                                    dangerouslySetInnerHTML={{ __html: introPage.content.rendered }}
                                />
                            </div>
                        </section>
                    )}

                    <section id="categories" className="scroll-mt-40 mb-14">
                        <SectionTitle icon={ScrollText} title="Ordre du jour et textes" />
                        {visibleSections.length === 0 ? (
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-white/40 backdrop-blur-md">
                                Aucune sous-catégorie trouvée.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {visibleSections.map(({ category, posts }) => {
                                    const isAgenda = norm(category.name).includes("ordre");
                                    return (
                                        <div
                                            key={category.id}
                                            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-2xl"
                                        >
                                            {isAgenda && (
                                                <p className="mb-4 rounded-xl border-l-2 border-cyan-400 bg-cyan-400/5 px-4 py-3 text-sm italic text-[#c0c0c0]">
                                                    {AGENDA_INTRO}
                                                </p>
                                            )}
                                            <CategorySection title={category.name} posts={posts} isDeliberation={false} />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {adoptedLaws.length > 0 && (
                        <section id="adoptes" className="scroll-mt-40 mb-14">
                            <div className="flex items-end justify-between gap-4">
                                <SectionTitle icon={FileCheck2} title="Projets et propositions de lois adoptés" />
                            </div>
                            <ul className="grid gap-3 md:grid-cols-2">
                                {adoptedLaws.map((post) => (
                                    <li key={post.id}>
                                        <Link
                                            href={`/texts-and-laws/${post.slug}`}
                                            className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:border-cyan-300/40 hover:bg-white/10"
                                        >
                                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                                            <span className="flex-1">
                                                <span className="block text-[#d5d5d5] italic leading-snug group-hover:text-cyan-200">
                                                    {cleanText(post.title.rendered)}
                                                </span>
                                                <span className="mt-1 block text-xs text-white/40">{formatDate(post.date)}</span>
                                            </span>
                                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/30 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-5 text-right">
                                <Link
                                    href="/texts-and-laws"
                                    className="inline-flex items-center gap-1 text-sm text-cyan-300 transition hover:text-cyan-200"
                                >
                                    Voir tous les textes <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </section>
                    )}

                    {deliberationPost && (
                        <section id="deliberations" className="scroll-mt-40">
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                                <SectionTitle icon={Gavel} title="Délibérations" />
                                <Link
                                    href={`/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${deliberationPost.slug}`}
                                    className="flex items-center gap-1 text-sm text-cyan-300 transition hover:text-cyan-200"
                                >
                                    Voir en plein écran <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                            <Card className="overflow-hidden rounded-3xl border-white/10 bg-white/5 shadow-2xl backdrop-blur-md">
                                <CardContent className="p-4 md:p-6">
                                    {deliberationPost.content.rendered.includes("<table") ? (
                                        <DeliberationTable tableHtml={deliberationPost.content.rendered} />
                                    ) : (
                                        <p className="text-[#c0c0c0]">Aucun tableau de délibérations.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}