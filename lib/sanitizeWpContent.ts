/** Résultat de splitTransitionBlock : contenu principal et bloc "transition" séparés. */
export interface SplitResult {
    before: string;
    transition: string;
}

/**
 * Isole le bloc WordPress correspondant à une période de transition (repéré
 * par un titre h2/h3 contenant "transition"/"transitoire") et le sépare du
 * reste du contenu.
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

/** Extrait, dédupliquées, toutes les URLs d'images `<img>` d'un contenu HTML. */
export function extractAllImages(html: string | undefined | null): string[] {
    if (!html) return [];
    const matches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
    const urls = matches.map((m) => m[1]).filter(Boolean);
    return Array.from(new Set(urls));
}

/** Retire le premier `<h2>` d'un contenu WordPress (avec ses commentaires de bloc Gutenberg). */
export function stripLeadingH2(html: string): string {
    if (!html) return "";

    return html
        .replace(
            /^(?:\s*<!--\s*\/?wp:[\w-]+(?:\s*\{[^}]*\})?\s*-->\s*)*\s*<h2\b[^>]*>[\s\S]*?<\/h2>\s*(?:<!--\s*\/wp:[\w-]+\s*-->\s*)*/i,
            ""
        )
        .trim();
}

/** Retire la propriété CSS `color` de chaque attribut `style` inline. */
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