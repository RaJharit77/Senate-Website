import PressClient from "@/components/press-area/PressClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Espace de Presse – Actualités du Sénat",
    description: "Retrouvez tous les communiqués et actualités officielles du Sénat de Madagascar.",
    path: "/press-area",
});

export default function PressPage() {
    return <PressClient />;
}