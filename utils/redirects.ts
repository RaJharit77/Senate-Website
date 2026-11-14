import { SLUG_ROUTES } from "./search";

export type LegacyRedirect = {
    source: string;
    destination: string;
    permanent: boolean;
};

type RouteTable = Record<string, { path: string; source: string }>;

/**
 * Redirections 301 des anciennes pages WordPress (https://senat.mg/<slug>/)
 * vers les routes du nouveau portail, à partir de la table SLUG_ROUTES
 * déjà utilisée par la recherche.
 *
 * - Les slugs dont la route est identique (ex. "international") sont ignorés.
 * - Un slug n'est déclaré qu'une fois.
 * - Le point d'interrogation d'une destination (?tab=...) est conservé.
 */
export function buildLegacyRedirects(routes: RouteTable = SLUG_ROUTES): LegacyRedirect[] {
    const seen = new Set<string>();
    const result: LegacyRedirect[] = [];

    for (const [slug, route] of Object.entries(routes)) {
        const source = `/${slug}`;
        const destinationPath = route.path.split("?")[0];

        if (source === destinationPath) continue;
        if (seen.has(source)) continue;

        seen.add(source);
        result.push({ source, destination: route.path, permanent: true });
    }

    return result;
}
