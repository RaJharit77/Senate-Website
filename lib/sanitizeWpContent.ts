/**
 * Utilitaires de traitement du HTML retourné par les custom post types
 * "republiquei" à "republiqueiv" (content.rendered de l'API REST
 * WordPress de senat.mg).
 *
 * Vérifié sur le contenu réel de l'API : ces CPT contiennent déjà tout le
 * détail nécessaire (législatures, présidents, photos, bureaux permanents)
 * en pur Gutenberg (wp-block-*), sans classes Bootstrap — contrairement à
 * la page "historique-2" qui, elle, est un template PHP du thème et n'est
 * volontairement PAS utilisée ici : ce site va être remplacé par le nôtre,
 * donc aucune dépendance ne doit reposer sur son HTML rendu, seulement sur
 * l'API REST WordPress qui restera disponible.
 *
 * Particularité importante : le CPT de la Première République ("home")
 * contient en plus, à la suite du texte sur les législatures, un bloc
 * "PÉRIODE TRANSITOIRE" (1972-1991) ; et celui de la Troisième République
 * contient un bloc "RÉGIME TRANSITOIRE : LE CST" (2009-2014). On isole ces
 * deux blocs pour les regrouper dans un onglet "Période Transitoire" dédié,
 * plutôt que de les laisser dispersés dans des onglets de République.
 */

export interface SplitResult {
    /** Contenu de la République, bloc transitoire retiré. */
    before: string;
    /** Bloc transitoire isolé (chaîne vide si aucun trouvé). */
    transition: string;
}

/**
 * Isole le sous-bloc "période/régime transitoire" d'un contenu de
 * République : tout ce qui se trouve entre un <h2>/<h3> dont le texte
 * contient "transitoire" ou "transition", et le prochain heading de
 * niveau égal ou supérieur (ou la fin du contenu si aucun ne suit).
 */
export function splitTransitionBlock(html: string): SplitResult {
    if (!html) return { before: "", transition: "" };

    const headingRe = /<h([23])\b[^>]*>(.*?)<\/h\1>/gi;
    const matches: { index: number; text: string; level: number }[] = [];
    let match: RegExpExecArray | null;
    while ((match = headingRe.exec(html)) !== null) {
        matches.push({
            index: match.index,
            text: match[2].replace(/<[^>]+>/g, ""),
            level: Number(match[1]),
        });
    }

    const transitionIdx = matches.findIndex((m) => /transitoire|transition/i.test(m.text));
    if (transitionIdx === -1) {
        return { before: html, transition: "" };
    }

    const startMatch = matches[transitionIdx];
    let endIndex = html.length;
    for (let i = transitionIdx + 1; i < matches.length; i++) {
        if (matches[i].level <= startMatch.level) {
            endIndex = matches[i].index;
            break;
        }
    }

    const transition = html.slice(startMatch.index, endIndex).trim();
    const before = (html.slice(0, startMatch.index) + html.slice(endIndex)).trim();
    return { before, transition };
}

/**
 * Extrait toutes les URLs d'images <img src="..."> trouvées dans un bloc
 * HTML, dans l'ordre d'apparition, en filtrant les doublons.
 */
export function extractAllImages(html: string | undefined | null): string[] {
    if (!html) return [];
    const matches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
    const urls = matches.map((m) => m[1]).filter(Boolean);
    return Array.from(new Set(urls));
}

/**
 * Retire le tout premier <h2> d'un bloc (le titre "LA PREMIÈRE RÉPUBLIQUE"
 * etc., déjà affiché par l'UI elle-même comme titre d'onglet) pour éviter
 * un doublon visuel quand on affiche le contenu sous notre propre <h3>.
 */
export function stripLeadingH2(html: string): string {
    if (!html) return "";
    // Tolère les commentaires Gutenberg (<!-- wp:heading -->, <!-- /wp:heading -->)
    // et les espaces qui précèdent/suivent le <h2>, sinon celui-ci n'est jamais
    // retiré quand WordPress les inclut et le titre apparaît en double.
    return html
        .replace(
            /^(?:\s*<!--\s*\/?wp:[\w-]+(?:\s*\{[^}]*\})?\s*-->\s*)*\s*<h2\b[^>]*>[\s\S]*?<\/h2>\s*(?:<!--\s*\/wp:[\w-]+\s*-->\s*)*/i,
            ""
        )
        .trim();
}

/**
 * Retire uniquement les déclarations `color:` posées en inline par
 * WordPress (ex: <p style="color:#999999">, <span style="color:#999999">)
 * qui empêchent nos règles CSS globales (.prose p, .prose li, etc. dans
 * globals.css) de s'appliquer.
 *
 * Pourquoi c'est nécessaire : en cascade CSS, un style inline gagne
 * toujours face à un sélecteur de classe à importance égale (même avec
 * !important des deux côtés, l'inline l'emporte sur la spécificité). Si
 * l'éditeur WordPress a enregistré une couleur de texte manuellement
 * (courant avec l'éditeur classique ou un collage depuis Word), aucune
 * règle dans globals.css ne peut la surclasser — il faut la retirer à la
 * source, avant l'injection dans le DOM.
 *
 * On ne touche jamais à `background-color`, aux polices, aux marges, etc.
 * pour ne pas casser une mise en forme volontaire faite dans l'éditeur.
 */
export function stripInlineTextColor(html: string): string {
    if (!html) return html;

    return html.replace(/style="([^"]*)"/gi, (_match, styleContent: string) => {
        const cleaned = styleContent
            .split(";")
            .map((declaration) => declaration.trim())
            .filter((declaration) => {
                if (!declaration) return false;
                const property = declaration.split(":")[0]?.trim().toLowerCase();
                return property !== "color";
            })
            .join("; ");

        return cleaned ? `style="${cleaned}"` : "";
    });
}