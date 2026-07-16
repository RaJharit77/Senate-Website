import Link from "next/link";
import { Scale, FileText, Calendar, ChevronRight } from "lucide-react";
import { getPostsByCategorySlug, getAllRepubliques } from "@/lib/api";
import type { WpPost } from "@/lib/types";
import { CYAN, EMERALD, RED, WHITE } from "@/utils/colors";
import { formatDate } from "@/utils/utility";
import NotFoundPage from "../not-found";

export const dynamic = 'force-dynamic';

export default async function TextAndLawsPage() {
    const posts = (await getPostsByCategorySlug("textes-et-lois", {
        per_page: 50,
        _embed: true,
    }).catch(() => [])) as WpPost[];

    if(!posts) return <NotFoundPage />

    const republiquesRaw = (await getAllRepubliques({
        per_page: 20,
        _embed: true,
    }).catch(() => [])) as WpPost[];

    const republiques = republiquesRaw.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                    </div>
                    <h1
                        style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 700,
                            color: WHITE,
                            lineHeight: 1.2,
                        }}
                    >
                        Textes et Lois
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
                        Retrouvez ici les projets et propositions de lois adoptés par le Sénat, ainsi que
                        les textes constitutionnels de Madagascar.
                    </p>
                </div>

                {posts.length > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText size={22} style={{ color: WHITE }} />
                            <h2
                                className="text-2xl font-semibold text-white"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                ADOPTÉS
                            </h2>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-white/80">
                                    <thead className="text-xs uppercase bg-white/10 text-white/60">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 font-medium">
                                                Laharana°
                                            </th>
                                            <th scope="col" className="px-6 py-4 font-medium">
                                                Rijantenin-dalàna
                                            </th>
                                            <th scope="col" className="px-6 py-4 font-medium text-right">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.map((post, index) => (
                                            <tr
                                                key={post.id}
                                                className="border-t border-white/5 hover:bg-white/5 transition-colors"
                                            >
                                                <td className="px-6 py-4 font-mono text-sm text-cyan-400">
                                                    {String(index + 1).padStart(2, "0")}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={post.link || "#"}
                                                        className="hover:text-cyan-400 transition-colors block"
                                                    >
                                                        <div
                                                            className="font-medium text-white"
                                                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                                        />
                                                        {post.excerpt?.rendered && (
                                                            <div
                                                                className="text-white/50 text-xs mt-1 line-clamp-2"
                                                                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                                            />
                                                        )}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 text-right text-white/40 whitespace-nowrap">
                                                    {formatDate(post.date)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {republiques.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Scale size={22} style={{ color: WHITE }} />
                            <h2
                                className="text-2xl font-semibold text-white"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                Textes constitutionnels
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {republiques.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.link || "#"}
                                    className="group border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all hover:border-cyan-400/30"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                            <Scale size={20} style={{ color: CYAN }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3
                                                className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors"
                                                style={{ fontFamily: "'Playfair Display', serif" }}
                                                dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                                            />
                                            <div className="flex items-center gap-3 mt-2 text-white/40 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {formatDate(item.date)}
                                                </span>
                                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                                                    En vigueur
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-white/20 group-hover:text-cyan-400 transition-colors shrink-0 mt-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}