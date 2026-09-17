import { WP_INTRO_POST_ID } from "@/constants/constants";
import { API_BASE } from "./wordpress";
import type {
    Senateur,
    Commission,
    Province,
    SenatorsApiPayload,
} from "@/types/senatorsType";

/* ------------------------------------------------------------------ */
/* Configuration                                                       */
/* ------------------------------------------------------------------ */

const PER_PAGE = 100;
const MAX_PAGES = 5; // 62 pages max → 1 page suffit, garde-fou à 5
const REVALIDATE = 3600; // 1 h

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface WPPage {
    id: number;
    slug: string;
    link: string;
    title: { rendered: string };
    content: { rendered: string };
}

export interface ParsedSenator {
    id: string;
    name: string;
    image: string | null;
    link: string;
    age: string;
    type: string;
    province: string;
    party: string;
    role: string;
    fonction: string;
    commissions: string[];
}

export interface AggregatedSenators {
    introHtml: string;
    senateurs: ParsedSenator[];
    totalFromWp: number;
}

/* ------------------------------------------------------------------ */
/* Utilitaires                                                         */
/* ------------------------------------------------------------------ */

function stripHtml(s: string): string {
    return s
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n")
        .replace(/<\/div>/gi, "\n")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#8217;|&rsquo;/g, "'")
        .replace(/&#8211;|&ndash;/g, "–")
        .replace(/&hellip;/g, "…")
        .replace(/&quot;/g, '"')
        .replace(/\u00a0/g, " ")
        .replace(/&eacute;/g, "é")
        .replace(/&egrave;/g, "è")
        .replace(/&agrave;/g, "à")
        .replace(/&ccedil;/g, "ç")
        .replace(/&ecirc;/g, "ê")
        .replace(/&ocirc;/g, "ô")
        .replace(/&icirc;/g, "î")
        .replace(/&ucirc;/g, "û")
        .replace(/&ugrave;/g, "ù");
}

function cleanWpTitle(title: string): string {
    return stripHtml(title)
        .replace(/\s*[-–—|]\s*(Antenimierandoholona|Sénat.*|Senat.*)$/i, "")
        .replace(/\s+/g, " ")
        .trim();
}

async function wpFetch<T>(url: string): Promise<T | null> {
    try {
        const res = await fetch(url, {
            next: { revalidate: REVALIDATE },
            headers: {
                Accept: "application/json",
                "User-Agent":
                    "Mozilla/5.0 (compatible; SenatWebsiteBot/1.0; +https://senat.mg)",
            },
        });
        if (!res.ok) return null;
        return (await res.json()) as T;
    } catch {
        return null;
    }
}

/* ------------------------------------------------------------------ */
/* Récupération des pages WordPress                                    */
/* ------------------------------------------------------------------ */

async function fetchAllPages(): Promise<{ pages: WPPage[]; total: number }> {
    const pages: WPPage[] = [];
    let page = 1;
    let total = 0;

    while (page <= MAX_PAGES) {
        const url =
            `${API_BASE}/pages?per_page=${PER_PAGE}&page=${page}` +
            `&_fields=id,slug,link,title,content`;

        try {
            const res = await fetch(url, {
                next: { revalidate: REVALIDATE },
                headers: {
                    Accept: "application/json",
                    "User-Agent":
                        "Mozilla/5.0 (compatible; SenatWebsiteBot/1.0; +https://senat.mg)",
                },
            });

            if (!res.ok) {
                if (page === 1) {
                    console.error(`[wp-senators] /pages HTTP ${res.status}`);
                }
                break;
            }

            if (page === 1) {
                const t = parseInt(res.headers.get("X-WP-Total") || "0", 10);
                if (!Number.isNaN(t)) total = t;
            }

            const data = (await res.json()) as WPPage[];
            if (!Array.isArray(data) || data.length === 0) break;

            pages.push(...data);
            if (data.length < PER_PAGE) break;
            page++;
        } catch (err) {
            console.error(`[wp-senators] Erreur page ${page}:`, err);
            break;
        }
    }

    return { pages, total: total || pages.length };
}

/**
 * Un sénateur = une page avec :
 *   Nom : …, Prénoms : …, Age : NN, Province : …
 */
function isSenatorPage(page: WPPage): boolean {
    const html = page.content?.rendered ?? "";
    if (!html || html.length < 50) return false;
    const text = stripHtml(html);
    return (
        /Nom\s*[:：]/i.test(text) &&
        /Pr[ée]?noms\s*[:：]/i.test(text) &&
        /Age\s*[:：]\s*\d+/i.test(text) &&
        /Province\s*[:：]/i.test(text)
    );
}

/* ------------------------------------------------------------------ */
/* Texte introductif (post 1123)                                       */
/* ------------------------------------------------------------------ */

export async function fetchIntroText(): Promise<string> {
    const data = await wpFetch<{ content: { rendered: string } }>(
        `${API_BASE}/posts/${WP_INTRO_POST_ID}?_fields=content`
    );
    return data?.content?.rendered ?? "";
}

/* ------------------------------------------------------------------ */
/* Parsing d'une fiche sénateur                                        */
/* ------------------------------------------------------------------ */

function pickLine(text: string, labels: string[]): string {
    for (const label of labels) {
        const re = new RegExp(`${label}\\s*[:：]\\s*([^\\n]+)`, "i");
        const m = text.match(re);
        if (m && m[1]) return m[1].replace(/\s+/g, " ").trim();
    }
    return "";
}

function extractMainImage(html: string): string | null {
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let m: RegExpExecArray | null;
    while ((m = imgRegex.exec(html)) !== null) {
        const src = m[1];
        if (!src || src.startsWith("data:")) continue;
        if (/logo|icon|favicon|placeholder|sprite/i.test(src)) continue;
        return src;
    }
    return null;
}

function extractFonction(text: string): string {
    const lines = text.split("\n").map((l) => l.trim());

    const startIdx = lines.findIndex((l) =>
        /^(?:Au titre du Parti|Parti)\s*[:：]/i.test(l)
    );
    if (startIdx === -1) return "";

    const roleLines: string[] = [];
    for (let i = startIdx + 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;
        if (/^(?:Déclaration|Biographie|Nom\s*:|Prénoms\s*:)/i.test(line)) break;
        roleLines.push(line);
    }
    return roleLines.join(" ").trim();
}

function extractCommissions(fonction: string): string[] {
    if (!fonction) return [];
    const commissions: string[] = [];
    const re =
        /(?:Membre|Président|Vice[-\s]?Président|Rapporteur|Questeur)[^.]*?(?:Commission\s+[IVX]+[^.]*?)(?=(?:et\s+(?:membre|Président|Vice|Rapporteur|Questeur))|$)/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(fonction)) !== null) {
        const v = m[0].replace(/\s+/g, " ").trim();
        if (v.length > 8 && !commissions.includes(v)) commissions.push(v);
    }
    return commissions;
}

export function parseSenatorPost(post: WPPage): ParsedSenator | null {
    const html = post.content?.rendered ?? "";
    if (!html) return null;

    const name = cleanWpTitle(post.title.rendered);
    if (!name) return null;

    const image = extractMainImage(html);

    const text = stripHtml(html)
        .split("\n")
        .map((l) => l.replace(/[ \t]+/g, " ").trim())
        .filter(Boolean)
        .join("\n");

    const age = pickLine(text, ["Age", "Âge", "Ages"]);
    const type = pickLine(text, [
        "Élu/Désigné",
        "Elu/Désigné",
        "Élu\\s*/\\s*Désigné",
        "Elu\\s*/\\s*Désigné",
    ]);
    const province = pickLine(text, ["Province"]);
    const party = pickLine(text, ["Au titre du Parti", "Parti"]);

    const fonction = extractFonction(text);
    const commissions = extractCommissions(fonction);

    return {
        id: post.slug,
        name,
        image,
        link: post.link,
        age,
        type,
        province,
        party,
        role: fonction,
        fonction,
        commissions,
    };
}

/* ------------------------------------------------------------------ */
/* Agrégation brute                                                    */
/* ------------------------------------------------------------------ */

export async function fetchAndAggregate(): Promise<AggregatedSenators> {
    const [introHtml, pagesResult] = await Promise.all([
        fetchIntroText(),
        fetchAllPages(),
    ]);

    const totalFromWp = pagesResult.total;

    const senateurs = pagesResult.pages
        .filter(isSenatorPage)
        .map(parseSenatorPost)
        .filter((s): s is ParsedSenator => s !== null && !!s.name)
        .sort((a, b) =>
            a.name.localeCompare(b.name, "fr", { sensitivity: "base" })
        );

    return { introHtml, senateurs, totalFromWp };
}

/* ------------------------------------------------------------------ */
/* Builders (payload final)                                            */
/* ------------------------------------------------------------------ */

function toSenateur(s: ParsedSenator): Senateur {
    return {
        id: s.id,
        name: s.name,
        image: s.image,
        fonction: s.fonction,
        province: s.province,
        age: s.age,
        eluDesigne: s.type,
        parti: s.party,
        commissions: s.commissions,
    };
}

function buildBureau(senateurs: Senateur[]): Senateur[] {
    return senateurs.filter((s) =>
        /(président|vice[-\s]?président|questeur|rapporteur)/i.test(s.fonction)
    );
}

function buildCommissions(
    senators: Array<{ name: string; commissions: string[] }>
): Commission[] {
    const map = new Map<string, Commission>();
    for (const s of senators) {
        for (const raw of s.commissions) {
            const titleMatch = raw.match(
                /Commission\s+[IVX]+[^:]*?(?::\s*)?([A-Za-zÀ-ÿ][^,]*)?/i
            );
            const title = (titleMatch?.[0] ?? raw)
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 200);
            if (!title) continue;

            const roleMatch = raw.match(
                /^(Membre|Président|Vice[-\s]?Président|Rapporteur|Questeur)/i
            );
            const role = roleMatch?.[1] ?? "";

            if (!map.has(title)) map.set(title, { title, members: [] });
            const bucket = map.get(title)!;
            if (!bucket.members.some((m) => m.name === s.name)) {
                bucket.members.push({ name: s.name, role });
            }
        }
    }
    return Array.from(map.values()).sort((a, b) =>
        a.title.localeCompare(b.title, "fr")
    );
}

function buildProvinces(
    senators: Array<{ name: string; province: string; image: string | null }>
): Province[] {
    const map = new Map<string, Province>();
    for (const s of senators) {
        const key = s.province.trim();
        if (!key) continue;
        if (!map.has(key)) map.set(key, { name: key, senators: [] });
        map.get(key)!.senators.push({ name: s.name, image: s.image });
    }
    return Array.from(map.values()).sort((a, b) =>
        a.name.localeCompare(b.name, "fr")
    );
}

/* ------------------------------------------------------------------ */
/* Point d'entrée public                                               */
/* ------------------------------------------------------------------ */

export async function getSenatorsPayload(): Promise<SenatorsApiPayload> {
    const { introHtml, senateurs: parsed, totalFromWp } =
        await fetchAndAggregate();

    const senateurs: Senateur[] = parsed.map(toSenateur);

    console.log(
        `[wp-senators] ${senateurs.length} sénateurs sur ${totalFromWp} pages WP`
    );

    return {
        introHtml,
        senateurs,
        bureau: buildBureau(senateurs),
        commissions: buildCommissions(parsed),
        provinces: buildProvinces(parsed),
    };
}

/* ------------------------------------------------------------------ */
/* Récupération d'un sénateur par slug                                 */
/* ------------------------------------------------------------------ */

export interface SenatorDetailData {
    senator: Senateur;      // ✅ type UI (eluDesigne, parti, ...)
    bioText: string;
    rawHtml: string;
}

/**
 * Récupère une fiche sénateur complète par son slug.
 * Renvoie le sénateur au format Senateur (prêt pour l'UI),
 * + la biographie extraite + le HTML brut (debug).
 */
export async function getSenatorDetail(
    slug: string
): Promise<SenatorDetailData | null> {
    const url =
        `${API_BASE}/pages?slug=${encodeURIComponent(slug)}` +
        `&_fields=id,slug,link,title,content&per_page=1`;

    const pages = await wpFetch<WPPage[]>(url);
    if (!pages || pages.length === 0) return null;

    const page = pages[0];
    if (!isSenatorPage(page)) return null;

    const parsed = parseSenatorPost(page);
    if (!parsed) return null;

    const rawHtml = page.content?.rendered ?? "";
    const bioText = extractBioText(rawHtml);

    // ✅ Conversion ParsedSenator → Senateur (même que dans getSenatorsPayload)
    const senator: Senateur = {
        id: parsed.id,
        name: parsed.name,
        image: parsed.image,
        fonction: parsed.fonction,
        province: parsed.province,
        age: parsed.age,
        eluDesigne: parsed.type,
        parti: parsed.party,
        commissions: parsed.commissions,
    };

    return { senator, bioText, rawHtml };
}

/**
 * Extrait le texte après "Biographie :" dans le contenu WP.
 * Renvoie "" si absent.
 */
function extractBioText(html: string): string {
    const plain = stripHtml(html);
    const match = plain.match(/Biographie\s*:?\s*([\s\S]*)$/i);
    if (!match) return "";
    return match[1].replace(/\s+/g, " ").trim();
}