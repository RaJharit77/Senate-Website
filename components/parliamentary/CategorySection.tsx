import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CategorySectionProps } from "@/types/parliamentaryType";

export function CategorySection({ title, posts, isDeliberation }: CategorySectionProps) {
    if (isDeliberation) {
        return (
            <div className="font-poppins">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="inline-block w-1 h-6 bg-emerald-400 rounded-full" />
                    {title}
                </h2>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors group">
                    <CardContent className="p-6 flex items-center justify-between">
                        <span className="text-white/80">Consulter le tableau des délibérations</span>
                        <Link
                            href="/parliamentary-proceedings/legislative-proceedings/deliberation"
                            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition group-hover:gap-3"
                        >
                            Voir <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="font-poppins">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="inline-block w-1 h-6 bg-cyan-400 rounded-full" />
                    {title}
                </h2>
                <p className="text-white/40 italic">Aucun article dans cette catégorie.</p>
            </div>
        );
    }

    return (
        <div className="font-poppins">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="inline-block w-1 h-6 bg-cyan-400 rounded-full" />
                {title}
            </h2>
            <ul className="space-y-2">
                {posts.map((post) => {
                    const cleanTitle = post.title.rendered
                        .replace(/&rsquo;/g, "'")
                        .replace(/&quot;/g, '"')
                        .replace(/&nbsp;/g, " ")
                        .replace(/&amp;/g, "&")
                        .replace(/&#8211;/g, "–")
                        .replace(/&#8217;/g, "'");

                    return (
                        <li key={post.id} className="group">
                            <Link
                                href={`/parliamentary-proceedings/legislative-proceedings/${post.slug}`}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg"
                            >
                                <span className="text-cyan-300 group-hover:text-cyan-200 transition-colors flex-1">
                                    {cleanTitle}
                                </span>
                                <span className="text-white/40 text-sm flex items-center gap-1 whitespace-nowrap">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(post.date).toLocaleDateString("fr-FR", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}