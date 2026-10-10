import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
    ArrowLeft,
    User,
    MapPin,
    Calendar,
    Vote,
    Flag,
    Briefcase,
    Users,
} from "lucide-react";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import JsonLd from "@/components/JsonLd";
import { getSenatorDetail } from "@/lib/wp-senators";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({
    params,
}: {
    params: PageParams;
}): Promise<Metadata> {
    const { slug } = await params;
    const detail = await getSenatorDetail(slug);
    if (!detail) {
        return buildMetadata({
            title: "Sénateur introuvable – Sénat de Madagascar",
            description: "Ce profil de sénateur n'existe pas ou a été déplacé.",
            path: `/your-senators/${slug}`,
        });
    }
    const { senator } = detail;
    return buildMetadata({
        title: `${senator.name} – Sénateur de Madagascar`,
        description:
            `Profil de ${senator.name}${senator.fonction ? `, ${senator.fonction}` : ""
            }${senator.province ? ` — Province : ${senator.province}` : ""}.`,
        path: `/your-senators/${slug}`,
    });
}

export default async function SenatorDetailPage({
    params,
}: {
    params: PageParams;
}) {
    const { slug } = await params;
    const detail = await getSenatorDetail(slug);

    if (!detail) {
        notFound();
    }

    const { senator, bioText } = detail;

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Vos Sénateurs", url: `${SITE_URL}/your-senators` },
        { name: senator.name, url: `${SITE_URL}/your-senators/${slug}` },
    ]);

    const personJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: senator.name,
        image: senator.image ?? undefined,
        jobTitle: senator.fonction || "Sénateur",
        affiliation: {
            "@type": "GovernmentOrganization",
            name: "Sénat de Madagascar",
        },
        address: senator.province
            ? {
                "@type": "PostalAddress",
                addressRegion: senator.province,
                addressCountry: "MG",
            }
            : undefined,
        url: `${SITE_URL}/your-senators/${slug}`,
    };

    // Fiche info structurée (icône, label, valeur)
    const infoRows = [
        { icon: Calendar, label: "Âge", value: senator.age },
        { icon: Vote, label: "Élu / Désigné", value: senator.eluDesigne },
        { icon: MapPin, label: "Province", value: senator.province },
        { icon: Flag, label: "Parti", value: senator.parti },
    ].filter((r) => r.value);

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={personJsonLd} />

            <div className="min-h-screen bg-linear-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-sm">
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-red-600/20 blur-3xl" />
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl" />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
                        {/* Fil d'ariane */}
                        <Link
                            href="/your-senators"
                            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Retour à la liste des Sénateurs
                        </Link>

                        {/* Carte hero */}
                        <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
                            <div className="grid md:grid-cols-[280px_1fr] gap-6 p-6 md:p-8">
                                {/* Photo */}
                                <div className="flex justify-center md:justify-start">
                                    {senator.image ? (
                                        <div className="relative w-56 h-56 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                                            <Image
                                                src={senator.image}
                                                alt={senator.name}
                                                fill
                                                className="object-cover"
                                                sizes="224px"
                                                priority
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-56 h-56 rounded-2xl bg-white/5 border-4 border-white/10 flex items-center justify-center">
                                            <User className="w-24 h-24 text-white/20" />
                                        </div>
                                    )}
                                </div>

                                {/* Titre + infos principales */}
                                <div className="flex flex-col justify-center">
                                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                                        <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                                        <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                                        <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                                    </div>

                                    <h1 className="font-poppins text-white text-3xl md:text-4xl font-bold leading-tight mb-3">
                                        {senator.name}
                                    </h1>

                                    {senator.fonction && (
                                        <div
                                            className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-sm font-medium mb-4"
                                            style={{
                                                backgroundColor: `${RED}22`,
                                                color: "#fca5a5",
                                                border: `1px solid ${RED}55`,
                                            }}
                                        >
                                            <Briefcase className="w-3.5 h-3.5" />
                                            {senator.fonction}
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                        {senator.province && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                                                <MapPin className="w-3 h-3 text-cyan-400" />
                                                {senator.province}
                                            </span>
                                        )}
                                        {senator.parti && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                                                <Flag className="w-3 h-3 text-emerald-400" />
                                                {senator.parti}
                                            </span>
                                        )}
                                        {senator.eluDesigne && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                                                <Vote className="w-3 h-3 text-amber-400" />
                                                {senator.eluDesigne}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Corps */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="grid md:grid-cols-[320px_1fr] gap-6">
                        {/* Sidebar : infos détaillées */}
                        <aside className="space-y-6">
                            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
                                <h2 className="text-white font-poppins font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <User className="w-4 h-4 text-cyan-400" />
                                    Informations
                                </h2>
                                <dl className="space-y-4">
                                    {infoRows.map(({ icon: Icon, label, value }) => (
                                        <div
                                            key={label}
                                            className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0"
                                        >
                                            <div className="shrink-0 w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                                                <Icon className="w-4 h-4 text-cyan-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <dt className="text-white/40 text-xs uppercase tracking-wider">
                                                    {label}
                                                </dt>
                                                <dd className="text-white text-sm font-medium mt-0.5 wrap-break-word">
                                                    {value}
                                                </dd>
                                            </div>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            {senator.commissions.length > 0 && (
                                <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
                                    <h2 className="text-white font-poppins font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-cyan-400" />
                                        Commissions
                                    </h2>
                                    <ul className="space-y-2">
                                        {senator.commissions.map((c, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-2 text-sm text-white/70"
                                            >
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                                <span>{c}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </aside>

                        {/* Contenu principal */}
                        <main className="space-y-6">
                            {senator.fonction && (
                                <section className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
                                    <h2 className="text-white font-poppins font-semibold text-lg mb-3 flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-red-400" />
                                        Fonction
                                    </h2>
                                    <p className="text-white/80 leading-relaxed">
                                        {senator.fonction}
                                    </p>
                                </section>
                            )}

                            <section className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
                                <h2 className="text-white font-poppins font-semibold text-lg mb-3 flex items-center gap-2">
                                    <User className="w-5 h-5 text-emerald-400" />
                                    Biographie
                                </h2>
                                {bioText ? (
                                    <p className="text-white/80 leading-relaxed whitespace-pre-line">
                                        {bioText}
                                    </p>
                                ) : (
                                    <p className="text-white/40 italic">
                                        Aucune biographie disponible pour le moment.
                                    </p>
                                )}
                            </section>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/your-senators"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm hover:bg-white/10 hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Tous les Sénateurs
                                </Link>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}