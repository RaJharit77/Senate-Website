import { CONTENT_SEARCH_TIMEOUT_MS, CONTENT_SOURCES_EXCLUDED, MAX_EXCERPT_CHARS, MAX_HISTORY_TURNS, MAX_SNIPPETS, MIN_KEYWORD_LENGTH, SEARCH_API_PATH } from "@/constants/constants";
import { footerLinks } from "@/lib/navigations/footerLinks";
import { navItems } from "@/lib/navigations/navigation";
import { ChatMessage, ContentSnippet, SearchApiResult, SiteMapEntry } from "@/types/chatbot";
import { GRAMMATICAL_STOPWORDS, META_REQUEST_WORDS } from "./chatbotMessage";

export function cleanText(text: string): string {
    if (!text) return "";
    return text
        .replace(/&rsquo;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#8211;/g, "–")
        .replace(/&#8217;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#8211;/g, "–")
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&amp;#8211;/g, "–")
        .replace(/&amp;#8217;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#8211;/g, "–")
        .replace(/&#8217;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#8211;/g, "–")
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&amp;#8211;/g, "–")
        .replace(/&amp;#8217;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#8211;/g, "–")
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&amp;#8211;/g, "–")
        .replace(/&amp;#8217;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace("&rsquo;", "'")
        .replace("&quot;", '"')
        .replace("&nbsp;", " ")
        .replace("&amp;", "&")
        .replace("&#8211;", "–")
        .replace("&#8217;", "'")
        .replace("&#8220;", '"')
        .replace("&#8221;", '"')
        .replace("&amp;#8211;", "–")
        .replace("&amp;#8217;", "'");
    //.trim();
}

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export function stripHtml(html: string | undefined): string {
    return html ? html.replace(/<[^>]+>/g, "").trim() : "";
}

export const getYouTubeThumbnail = (html: string): string | null => {
    if (!html) return null;
    const match = html.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
    if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    const match2 = html.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (match2) return `https://img.youtube.com/vi/${match2[1]}/hqdefault.jpg`;
    const match3 = html.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (match3) return `https://img.youtube.com/vi/${match3[1]}/hqdefault.jpg`;
    return null;
};

export function cleanTexts(s: string): string {
    return decodeEntities(s.replace(/<[^>]*>/g, " "))
        .replace(/\s+/g, " ")
        .trim();
}

export function cleanTitle(title: string): string {
    return cleanTexts(title)
        .replace(/\s*[-–—|]\s*(Antenimierandoholona|Sénat.*|Senat.*)$/i, "")
        .replace(/\s+/g, " ")
        .trim();
}

export function decodeEntities(s: string): string {
    return s
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#8217;|&rsquo;/g, "'")
        .replace(/&#8211;|&ndash;/g, "–")
        .replace(/&hellip;/g, "…")
        .replace(/&quot;/g, '"')
        .replace(/&eacute;/g, "é")
        .replace(/&egrave;/g, "è")
        .replace(/&agrave;/g, "à")
        .replace(/&ccedil;/g, "ç")
        .replace(/&ecirc;/g, "ê")
        .replace(/&ocirc;/g, "ô")
        .replace(/&icirc;/g, "î")
        .replace(/&ucirc;/g, "û")
        .replace(/&ugrave;/g, "ù")
        .replace(/\u00a0/g, " ");
}

export function stripHtmls(s: string): string {
    return s
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n")
        .replace(/<\/div>/gi, "\n")
        .replace(/<[^>]*>/g, " ")
        .replace(/\u00a0/g, " ")
        .replace(/[^\S\n]+/g, " ")
        .replace(/\n[ \t]*\n+/g, "\n")
        .replace(/[ \t]*\n[ \t]*/g, "\n")
        .trim();
}

// Chat utils
export function randomDelay(minMs: number, maxMs: number) {
    const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function sanitizeHistory(history: unknown): ChatMessage[] {
    if (!Array.isArray(history)) return [];

    const cleaned = history
        .filter(
            (m): m is ChatMessage =>
                m &&
                typeof m === 'object' &&
                (m.role === 'user' || m.role === 'assistant') &&
                typeof m.content === 'string' &&
                m.content.trim().length > 0
        )
        .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));

    return cleaned.slice(-MAX_HISTORY_TURNS * 2);
}

/** Aplatit navItems en liste plate. Prioritaire sur footerLinks. */
export function flattenNavItems(items: typeof navItems): SiteMapEntry[] {
    const entries: SiteMapEntry[] = [];
    for (const item of items) {
        entries.push({ label: item.label, path: item.path, level: 0 });
        if ('children' in item && item.children) {
            for (const child of item.children) {
                entries.push({ label: child.label, path: child.path, level: 1 });
            }
        }
    }
    return entries;
}

/** Ajoute les pages du footer absentes du menu, sans doublon de libellé/chemin. */
export function mergeFooterEntries(base: SiteMapEntry[], sections: typeof footerLinks): SiteMapEntry[] {
    const labelsSeen = new Set(base.map((e) => e.label.trim().toLowerCase()));
    const pathsSeen = new Set(base.map((e) => e.path));
    const extra: SiteMapEntry[] = [];

    for (const section of sections) {
        for (const link of section.links) {
            const normalizedLabel = link.label.trim().toLowerCase();
            if (labelsSeen.has(normalizedLabel) || pathsSeen.has(link.path)) {
                continue;
            }
            extra.push({ label: link.label, path: link.path, level: 0 });
            labelsSeen.add(normalizedLabel);
            pathsSeen.add(link.path);
        }
    }
    return extra;
}

export function formatSiteMap(entries: SiteMapEntry[]): string {
    return entries.map((e) => `${'    '.repeat(e.level)}- ${e.label} : ${e.path}`).join('\n');
}

export function toContentSnippet(r: SearchApiResult): ContentSnippet {
    return {
        title: r.title,
        path: r.path,
        excerpt: r.excerpt.slice(0, MAX_EXCERPT_CHARS),
        date: r.date,
        source: r.source,
    };
}

export function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .normalize('NFC')
        .replace(/[?!.,;:"“”«»()[\]]/g, ' ')
        // Scinde aussi sur "-" : gère "peux-tu", "sait-il" sans les lister.
        .replace(/-/g, ' ')
        .split(/\s+/)
        // Élisions : "l'État" -> "état".
        .map((tok) => tok.replace(/^(l|d|qu|n|j|c|m|t|s)['’]/i, ''))
        .filter(Boolean);
}

/** Réduit un message à ses mots-clés de contenu. '' si rien de significatif. */
export function extractSearchKeywords(message: string): string {
    const keywords = tokenize(message).filter(
        (tok) =>
            tok.length >= MIN_KEYWORD_LENGTH &&
            !GRAMMATICAL_STOPWORDS.has(tok) &&
            !META_REQUEST_WORDS.has(tok)
    );
    return keywords.join(' ');
}

/** Reconstruit l'origine absolue de la requête (Route Handlers = pas d'origine implicite). */
export function getOrigin(req: Request): string {
    const host = req.headers.get('host');
    if (!host) {
        return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    }
    const proto = req.headers.get('x-forwarded-proto') ?? (host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https');
    return `${proto}://${host}`;
}

/** Interroge /api/search pour du contenu réel (actualités, lois, historique...). */
export async function searchSiteContent(query: string, origin: string): Promise<ContentSnippet[]> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONTENT_SEARCH_TIMEOUT_MS);

    try {
        const res = await fetch(`${origin}${SEARCH_API_PATH}?q=${encodeURIComponent(query)}`, {
            signal: controller.signal,
            headers: { Accept: 'application/json' },
        });
        if (!res.ok) {
            console.error(`[searchSiteContent] ${SEARCH_API_PATH} a répondu ${res.status}`);
            return [];
        }
        const data: unknown = await res.json();
        if (!Array.isArray(data)) {
            console.error('[searchSiteContent] réponse inattendue de /api/search (tableau attendu)');
            return [];
        }
        const results = data as SearchApiResult[];
        return results
            .filter((r) => !CONTENT_SOURCES_EXCLUDED.has(r.source))
            .slice(0, MAX_SNIPPETS)
            .map(toContentSnippet);
    } catch (err) {
        // Ne bloque jamais la conversation en cas d'échec réseau/timeout.
        console.error('[searchSiteContent] Erreur:', err);
        return [];
    } finally {
        clearTimeout(timeout);
    }
}

export function formatContentContext(snippets: ContentSnippet[]): string {
    if (snippets.length === 0) return '';
    return snippets
        .map((s, i) => {
            const dateLabel = s.date ? ` — ${new Date(s.date).toLocaleDateString('fr-FR')}` : '';
            const excerptLine = s.excerpt ? `\n${s.excerpt}` : '';
            return `[${i + 1}] ${s.title} (${s.source}${dateLabel}) — ${s.path}${excerptLine}`;
        })
        .join('\n\n');
}