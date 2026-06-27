import Link from "next/link";
import { getPostsByCategory } from "@/lib/api";
import { ChevronRight } from "lucide-react";

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";

const CAT_ORDRE_JOUR = 11;

type AgendaItem = {
    id: number;
    slug: string;
    date: string;
    title: { rendered: string };
    excerpt?: { rendered: string } | null;
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function AgendaPage() {
    const agendaItems = (await getPostsByCategory(CAT_ORDRE_JOUR, { per_page: 20 }).catch(() => [])) as AgendaItem[];

    return (
        <div className="py-12 px-4 sm:px-6" style={{ backgroundColor: "#f5f9f5" }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: GREEN }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: CYAN }} />
                    </div>
                    <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#0f1f0e" }}>
                        Calendrier parlementaire
                    </h1>
                    <p className="text-lg mt-2 max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif", color: "#4a6648" }}>
                        Retrouvez l&apos;ordre du jour des réunions parlementaires du Sénat.
                    </p>
                </div>

                <div className="grid gap-4">
                    {agendaItems.length === 0 ? (
                        <p className="text-gray-500">Aucun ordre du jour disponible pour le moment.</p>
                    ) : (
                        agendaItems.map((item: AgendaItem) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 bg-white rounded-xl border p-5 transition-all hover:shadow-md"
                                style={{ borderColor: "rgba(15,31,14,0.08)" }}
                            >
                                <div className="shrink-0 w-1 rounded-full self-stretch" style={{ backgroundColor: CYAN }} />
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 flex-wrap mb-1">
                                        <span
                                            style={{
                                                fontFamily: "'Inter', sans-serif",
                                                fontSize: "0.7rem",
                                                fontWeight: 700,
                                                letterSpacing: "0.08em",
                                                textTransform: "uppercase",
                                                color: CYAN,
                                            }}
                                        >
                                            Ordre du jour
                                        </span>
                                        <span
                                            className="px-2.5 py-0.5 rounded-full"
                                            style={{
                                                fontSize: "0.65rem",
                                                fontFamily: "'Inter', sans-serif",
                                                fontWeight: 600,
                                                color: "#16a34a",
                                                backgroundColor: "#16a34a18",
                                            }}
                                        >
                                            {formatDate(item.date)}
                                        </span>
                                    </div>
                                    <h4
                                        style={{
                                            fontFamily: "'Playfair Display', serif",
                                            fontSize: "1rem",
                                            fontWeight: 600,
                                            color: "#0f1f0e",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {item.title.rendered}
                                    </h4>
                                    {item.excerpt?.rendered && (
                                        <div
                                            className="mt-2 text-sm text-gray-600"
                                            dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
                                        />
                                    )}
                                </div>
                                <Link href={`/agenda/${item.slug}`} className="shrink-0">
                                    <ChevronRight size={16} style={{ color: CYAN, opacity: 0.4 }} />
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}