import HistoricalClient from "@/components/history/HistoryClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Histoire du Sénat de Madagascar",
    description: "Découvrez l'histoire du Sénat de Madagascar à travers les républiques : Première, Deuxième, Troisième, Quatrième République et périodes transitoires.",
    path: "/historical",
});

export default function HistoryPage() {
    return <HistoricalClient />;
}