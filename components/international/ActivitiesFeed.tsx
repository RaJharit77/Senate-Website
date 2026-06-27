"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { ActivityCategory } from "@/lib/api";

export interface ActivityItem {
    id: number;
    category: ActivityCategory;
    title: string;
    date: string;
    dateValue: number;
    imageUrl: string;
    link: string;
}

const SECTION_CONFIG: Record<ActivityCategory, { label: string; emptyLabel: string }> = {
    audience: {
        label: "Audiences",
        emptyLabel: "Aucune audience pour le moment.",
    },
    delegation: {
        label: "Accueil des Délégations Parlementaires étrangères",
        emptyLabel: "Aucune délégation accueillie pour le moment.",
    },
    international: {
        label: "Déplacements à l'étranger",
        emptyLabel: "Aucun déplacement à l'étranger pour le moment.",
    },
};

const SECTION_ORDER: ActivityCategory[] = ["audience", "delegation", "international"];

const FILTERS: { id: "all" | ActivityCategory; label: string }[] = [
    { id: "all", label: "Toutes" },
    { id: "audience", label: "Audiences" },
    { id: "delegation", label: "Délégations" },
    { id: "international", label: "Déplacements" },
];

// 6 cards par type et par page. Quand le filtre "Toutes" est actif, la
// page N affiche les 6 éléments correspondants de CHAQUE section (donc
// jusqu'à 18 cards au total), avec une seule pagination commune en bas
// de page qui fait avancer les trois sections en même temps.
const PER_PAGE = 6;

export function ActivityCard({ item }: { item: ActivityItem }) {
    return (
        <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                {item.imageUrl ? (
                    <Image
                        src={item.imageUrl}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 text-gray-400">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h4
                    className="text-sm font-semibold leading-snug text-gray-900 capitalize"
                    style={{ fontFamily: "'Actor', sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                />
                <span className="mt-auto text-xs text-gray-500">{item.date}</span>
            </div>
        </a>
    );
}

function SectionDivider({ label }: { label: string }) {
    return (
        <div className="my-8 flex items-center gap-4">
            <hr className="flex-1 border-t border-gray-300" />
            <h2 className="whitespace-nowrap text-lg font-semibold text-gray-800">{label}</h2>
            <hr className="flex-1 border-t border-gray-300" />
        </div>
    );
}

function Pagination({
    currentPage,
    totalPages,
    onChange,
}: {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
}) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination">
            <button
                onClick={() => onChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Page précédente"
            >
                «
            </button>
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={`min-w-[2.25rem] rounded-lg px-3 py-2 text-sm font-medium transition ${p === currentPage
                        ? "bg-red-600 text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    {p}
                </button>
            ))}
            <button
                onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Page suivante"
            >
                »
            </button>
        </nav>
    );
}

// Affiche une section (titre + grille) à partir d'un sous-ensemble déjà
// découpé par la pagination commune du parent. Ne gère plus son propre
// état de page : purement présentationnel.
function ActivitySection({
    category,
    pageItems,
    isEmpty,
}: {
    category: ActivityCategory;
    pageItems: ActivityItem[];
    isEmpty: boolean;
}) {
    return (
        <div>
            <SectionDivider label={SECTION_CONFIG[category].label} />
            {isEmpty ? (
                <p className="text-sm text-white/50">{SECTION_CONFIG[category].emptyLabel}</p>
            ) : pageItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {pageItems.map((item) => (
                        <ActivityCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-white/50">Aucun élément de cette catégorie sur cette page.</p>
            )}
        </div>
    );
}

// Composant générique réutilisé par "Activités du Président" et
// "Activités des Sénateurs" : les deux pages partagent exactement la même
// structure (Audiences / Délégations / Déplacements), seule la source de
// données (lib/api.ts) diffère selon la page appelante.
export function ActivitiesFeed({ items }: { items: ActivityItem[] }) {
    const [filter, setFilter] = useState<"all" | ActivityCategory>("all");
    const [page, setPage] = useState(1);

    const groupedBySection = useMemo(() => {
        const groups: Record<ActivityCategory, ActivityItem[]> = {
            audience: [],
            delegation: [],
            international: [],
        };
        for (const item of items) {
            groups[item.category].push(item);
        }
        return groups;
    }, [items]);

    // Items à afficher selon le filtre actif (toutes les sections, ou une
    // seule catégorie).
    const relevantItems = useMemo(() => {
        if (filter === "all") return items;
        return groupedBySection[filter];
    }, [filter, items, groupedBySection]);

    // Pagination commune : le nombre total de pages est déterminé par la
    // section la plus longue (vue "Toutes"), ou par la catégorie seule
    // (vue filtrée), de façon à ce qu'une seule barre en bas de page
    // fasse avancer toutes les sections affichées en même temps.
    const totalPages = useMemo(() => {
        if (filter !== "all") {
            return Math.max(1, Math.ceil(relevantItems.length / PER_PAGE));
        }
        const maxLength = Math.max(
            groupedBySection.audience.length,
            groupedBySection.delegation.length,
            groupedBySection.international.length,
            1
        );
        return Math.ceil(maxLength / PER_PAGE);
    }, [filter, relevantItems.length, groupedBySection]);

    function pageSliceFor(categoryItems: ActivityItem[]) {
        const start = (page - 1) * PER_PAGE;
        return categoryItems.slice(start, start + PER_PAGE);
    }

    function handleFilterChange(next: "all" | ActivityCategory) {
        setFilter(next);
        setPage(1);
    }

    const hasAnyItems = items.length > 0;

    return (
        <div>
            {/* Filtres */}
            <div className="mb-2 flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => handleFilterChange(f.id)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${filter === f.id
                            ? "bg-red-600 text-white shadow"
                            : "bg-white/10 text-white/70 hover:bg-white/20"
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {!hasAnyItems && (
                <p className="py-12 text-center text-white/60">Aucune activité disponible pour le moment.</p>
            )}

            {hasAnyItems && filter === "all" ? (
                // Une seule page courante partagée : chaque section affiche
                // sa propre tranche de 6 éléments correspondant à cette page.
                SECTION_ORDER.map((cat) => (
                    <ActivitySection
                        key={cat}
                        category={cat}
                        pageItems={pageSliceFor(groupedBySection[cat])}
                        isEmpty={groupedBySection[cat].length === 0}
                    />
                ))
            ) : hasAnyItems ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {pageSliceFor(relevantItems).map((item) => (
                        <ActivityCard key={item.id} item={item} />
                    ))}
                </div>
            ) : null}

            {/* Pagination unique, commune à toutes les sections affichées */}
            <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
        </div>
    );
}

// Alias conservé pour compatibilité avec la page "Activités du Président"
// existante, qui importe { PresidentActivitiesFeed }. Évite de devoir
// modifier ce fichier d'appel : même composant, juste un autre nom exporté.
export { ActivitiesFeed as PresidentActivitiesFeed };