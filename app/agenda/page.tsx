import { AgendaClient } from "@/components/agenda/AgendaClient";
import { getPostsByCategory, getPageBySlug } from "@/lib/api";
import type { WpPost } from "@/lib/types";

const CAT_ORDRE_JOUR = 11;

export default async function AgendaPage() {
    const page = await getPageBySlug("ordre-du-jour").catch(() => null);
    const pageTitle = page?.title?.rendered || "Ordre du Jour";

    const agendaItems = (await getPostsByCategory(CAT_ORDRE_JOUR, {
        per_page: 100,
        _embed: true,
    }).catch(() => [])) as WpPost[];

    return <AgendaClient items={agendaItems} pageTitle={pageTitle} />;
}