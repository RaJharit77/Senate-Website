import { getStructureAdministrative } from "@/lib/api";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { EMERALD, RED, WHITE } from "@/utils/colors";
import { cleanText } from "@/utils/utility";
import NotFoundPage from "@/app/not-found";
import JsonLd from "@/components/JsonLd";
import StructuresClient from "@/components/structures/StructuresClient";
import { Building2, Users, Briefcase } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
    title: "Structures administratives – Sénat de Madagascar",
    description:
        "Organisation administrative du Sénat de Madagascar : Cabinet du Président, Secrétariat Général, Directions rattachées et attributions.",
    path: "/about/structures",
});

// Points clés affichés dans le bandeau de synthèse (statiques, mais purement
// descriptifs : ils ne remplacent pas le contenu WordPress, ils le résument).
const HIGHLIGHTS = [
    {
        icon: Building2,
        label: "Cabinet du Président",
        desc: "Coordination politique, protocole, sécurité, intendance.",
    },
    {
        icon: Users,
        label: "Secrétariat Général",
        desc: "Direction et supervision des services du Sénat.",
    },
    {
        icon: Briefcase,
        label: "6 Directions rattachées",
        desc: "Communication, législation, décentralisation, RH, finances, logistique.",
    },
];

export default async function StructuresPage() {
    const post = await getStructureAdministrative();

    if (!post) return <NotFoundPage />;

    const cleanTitle = cleanText(post.title.rendered);

    const updatedAt = new Date(
        post.modified ?? post.date
    ).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "À propos du Sénat", url: `${SITE_URL}/about` },
        { name: "Structures", url: `${SITE_URL}/about/structures` },
    ]);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: cleanTitle,
        description:
            post.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ||
            "Organisation administrative du Sénat de Madagascar.",
        url: `${SITE_URL}/about/structures`,
        datePublished: post.date,
        dateModified: post.modified ?? post.date,
        author: {
            "@type": "Organization",
            name: "Sénat de Madagascar",
        },
        inLanguage: "fr-FR",
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={articleJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
                <div className="max-w-5xl mx-auto">
                    {/* ---------- EN-TÊTE ---------- */}
                    <header className="mb-10">
                        <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <h1 className="font-poppins text-white text-4xl md:text-5xl font-bold leading-tight">
                            Structures administratives
                        </h1>
                        <p className="font-poppins text-white/60 text-lg mt-4 max-w-3xl leading-relaxed">
                            Découvrez l&apos;organisation interne du Sénat de
                            Madagascar : le Cabinet du Président, le Secrétariat
                            Général et les six Directions qui lui sont rattachées.
                        </p>
                    </header>

                    {/* ---------- BANDEAU DE SYNTHÈSE ---------- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {HIGHLIGHTS.map(({ icon: Icon, label, desc }) => (
                            <div
                                key={label}
                                className="
                                    group rounded-2xl border border-white/10 bg-white/5
                                    backdrop-blur-sm p-5 transition-all duration-300
                                    hover:border-cyan-400/40 hover:bg-white/10 hover:-translate-y-0.5
                                "
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span
                                        className="
                                            flex items-center justify-center w-10 h-10 rounded-full
                                            bg-cyan-400/15 text-cyan-300
                                            transition-colors group-hover:bg-cyan-400/25
                                        "
                                    >
                                        <Icon size={18} />
                                    </span>
                                    <h3 className="font-poppins text-white text-base font-bold leading-tight">
                                        {label}
                                    </h3>
                                </div>
                                <p className="font-poppins text-white/60 text-sm leading-relaxed">
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ---------- CONTENU WORDPRESS ---------- */}
                    <StructuresClient
                        content={post.content.rendered}
                        title={cleanTitle}
                        updatedAt={updatedAt}
                    />
                </div>
            </div>
        </>
    );
}