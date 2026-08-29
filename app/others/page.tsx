import OthersClient from "@/components/others/OthersClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Autres activités du Sénat",
    description: "Découvrez les vidéos, les actualités diverses, les publications et les autres activités du Sénat de Madagascar.",
    path: "/others",
});

export const dynamic = 'force-dynamic';

export default function OthersPage() {
    return <OthersClient />;
}