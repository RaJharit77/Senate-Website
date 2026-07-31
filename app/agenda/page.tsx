import { AgendaClient } from "@/components/agenda/AgendaClient";
import { CAT_ORDRE_JOUR } from "@/constants/constants";
import { getPostsByCategory, getPageBySlug } from "@/lib/api";
import type { WpPost } from "@/lib/types";
import NotFoundPage from "../not-found";

export default async function AgendaPage() {
    const page = await getPageBySlug("ordre-du-jour").catch(() => null);
    const pageTitle = page?.title?.rendered || "Ordre du Jour";

    if(!page) return <NotFoundPage />;

    const agendaItems = (await getPostsByCategory(CAT_ORDRE_JOUR, {
        per_page: 100,
        _embed: true,
    }).catch(() => [])) as WpPost[];

    return <AgendaClient items={agendaItems} pageTitle={pageTitle} />;
}