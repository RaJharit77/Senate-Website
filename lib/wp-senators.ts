import { MAX_PAGES, PER_PAGES, REVALIDATE, WP_INTRO_POST_ID } from "@/constants/constants";
import { API_BASE } from "./wordpress";
import type {
    Senateur,
    Commission,
    Province,
    SenatorsApiPayload,
} from "@/types/senatorsType";

/* ------------------------------------------------------------------ */
/* Utilitaires                                                         */
/* ------------------------------------------------------------------ */

function decodeEntities(s: string): string {
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

function stripHtml(s: string): string {
    return s
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n")
        .replace(/<\/div>/gi, "\n")
        .replace(/<[^>]*>/g, " ")
        .replace(/\u00a0/g, " ")
        // Collapse horizontal whitespace UNIQUEMENT (pas les \n)
        .replace(/[^\S\n]+/g, " ")
        // Éviter les lignes vides consécutives
        .replace(/\n[ \t]*\n+/g, "\n")
        // Trim autour des \n
        .replace(/[ \t]*\n[ \t]*/g, "\n")
        .trim();
}

function cleanText(s: string): string {
    return decodeEntities(s.replace(/<[^>]*>/g, " "))
        .replace(/\s+/g, " ")
        .trim();
}

function cleanTitle(title: string): string {
    return cleanText(title)
        .replace(/\s*[-–—|]\s*(Antenimierandoholona|Sénat.*|Senat.*)$/i, "")
        .replace(/\s+/g, " ")
        .trim();
}

/* ------------------------------------------------------------------ */
/* Types WP                                                            */
/* ------------------------------------------------------------------ */

interface WPPage {
    id: number;
    slug: string;
    link: string;
    modified?: string;
    date?: string;
    title: { rendered: string };
    content: { rendered: string };
    categories?: number[];
}

/* ------------------------------------------------------------------ */
/* Fetch WordPress                                                     */
/* ------------------------------------------------------------------ */

async function fetchAllPages(): Promise<WPPage[]> {
    const pages: WPPage[] = [];
    let page = 1;

    while (page <= MAX_PAGES) {
        const url =
            `${API_BASE}/pages?per_page=${PER_PAGES}&page=${page}` +
            `&_fields=id,slug,link,modified,date,title,content,categories`;

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

            const data = (await res.json()) as WPPage[];
            if (!Array.isArray(data) || data.length === 0) break;
            pages.push(...data);
            if (data.length < PER_PAGES) break;
            page++;
        } catch (err) {
            console.error(`[wp-senators] Erreur page ${page}:`, err);
            break;
        }
    }

    return pages;
}

async function fetchIntroHtml(): Promise<string> {
    try {
        const res = await fetch(
            `${API_BASE}/posts/${WP_INTRO_POST_ID}?_fields=content`,
            {
                next: { revalidate: REVALIDATE },
                headers: {
                    Accept: "application/json",
                    "User-Agent":
                        "Mozilla/5.0 (compatible; SenatWebsiteBot/1.0; +https://senat.mg)",
                },
            }
        );
        if (!res.ok) return "";
        const data = (await res.json()) as { content?: { rendered?: string } };
        return data?.content?.rendered ?? "";
    } catch {
        return "";
    }
}

/* ------------------------------------------------------------------ */
/* Détection des fiches sénateur                                       */
/* ------------------------------------------------------------------ */

/** Un sénateur = page avec Nom, Prénoms, Age, Province */
function isSenatorPage(page: WPPage): boolean {
    const text = stripHtml(page.content?.rendered ?? "");
    if (!text || text.length < 40) return false;
    return (
        /Nom\s*[:：]/i.test(text) &&
        /Pr[ée]?noms\s*[:：]/i.test(text) &&
        /Age\s*[:：]\s*\d+/i.test(text) &&
        /Province\s*[:：]/i.test(text)
    );
}

/**
 * Un sénateur est "en fonction" s'il présente AU MOINS UN marqueur
 * d'activité parlementaire en cours (commission, déclaration, rôle
 * institutionnel). Les anciens sénateurs comme RAVALOMANANA Richard
 * ou RAKOTONDRAZAFY Lalatiana n'en ont aucun.
 */
function isCurrentSenator(page: WPPage): boolean {
    const text = stripHtml(page.content?.rendered ?? "");

    const markers: RegExp[] = [
        // Commission numérotée (I, II, III, IV...) → mandat législatif actif
        /Commission\s+[IVX]+\b/i,

        // Déclaration de patrimoine → obligation en cours
        /Déclaration\s+de\s+Patrimoine/i,

        // Rôles du Bureau Permanent NON ambigus
        /Président\s+du\s+Sénat\s+par\s+intérim/i,
        /Vice[-\s]?Président\s+du\s+Sénat/i,
        /(?:^|\s)Questeur(?:\s|$|,)/i,
        /Rapporteur\s+Général/i,

        // Présidence de commission ou de groupe parlementaire
        /Président\s+de\s+la\s+Commission\s+[IVX]+/i,
        /Président\s+du\s+Groupe\s+Parlementaire/i,
        /Président\s+du\s+Groupe\s+d['’]Amitié/i,
    ];

    return markers.some((re) => re.test(text));
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
        /^(?:Au titre du Parti|Parti|Au titre du Président)/i.test(l)
    );
    if (startIdx === -1) return "";

    const roleLines: string[] = [];
    for (let i = startIdx + 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;
        if (
            /^(?:Déclaration|Biographie|Nom\s*:|Prénoms\s*:)/i.test(line)
        )
            break;
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

function parseSenatorPage(page: WPPage): Senateur | null {
    const html = page.content?.rendered ?? "";
    if (!html) return null;

    const name = cleanTitle(page.title.rendered);
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
    const party =
        pickLine(text, ["Au titre du Parti", "Parti"]) ||
        pickLine(text, ["Au titre du Président"]);

    const fonction = extractFonction(text);
    const commissions = extractCommissions(fonction);

    return {
        id: page.slug,
        name,
        image,
        fonction,
        province,
        age,
        eluDesigne: type,
        parti: party,
        commissions,
    };
}

/* ------------------------------------------------------------------ */
/* Tri : Président → Vice-Présidents → Questeur → Rapporteur → autres  */
/* ------------------------------------------------------------------ */

function senatorRank(s: Senateur): number {
    const f = s.fonction || "";
    if (/Président\s+du\s+Sénat(?:\s+par\s+intérim)?/i.test(f)) return 0;
    if (/Vice[-\s]?Président\s+du\s+Sénat/i.test(f)) return 1;
    if (/(?:^|\s)Questeur(?:\s|$|,)/i.test(f)) return 2;
    if (/Rapporteur\s+Général/i.test(f)) return 3;
    return 100;
}

function compareSenateurs(a: Senateur, b: Senateur): number {
    const ra = senatorRank(a);
    const rb = senatorRank(b);
    if (ra !== rb) return ra - rb;
    return a.name.localeCompare(b.name, "fr", { sensitivity: "base" });
}

/* ------------------------------------------------------------------ */
/* Builders                                                            */
/* ------------------------------------------------------------------ */

function buildBureau(senateurs: Senateur[]): Senateur[] {
    const BUREAU_ROLES: RegExp[] = [
        /Président\s+du\s+Sénat(?:\s+par\s+intérim)?/i,
        /Vice[-\s]?Président\s+du\s+Sénat/i,
        /(?:^|\s)Questeur(?:\s|$|,)/i,
        /Rapporteur\s+Général/i,
    ];
    return senateurs.filter((s) =>
        BUREAU_ROLES.some((re) => re.test(s.fonction))
    );
}

function buildCommissions(senateurs: Senateur[]): Commission[] {
    const map = new Map<string, Commission>();

    for (const s of senateurs) {
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

            if (!map.has(title)) {
                map.set(title, { title, members: [] });
            }
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

function buildProvinces(senateurs: Senateur[]): Province[] {
    const map = new Map<string, Province>();

    for (const s of senateurs) {
        const key = s.province.trim();
        if (!key) continue;
        if (!map.has(key)) {
            map.set(key, { name: key, senators: [] });
        }
        map.get(key)!.senators.push({ name: s.name, image: s.image });
    }

    return Array.from(map.values())
        .map((p) => ({
            ...p,
            senators: p.senators.sort((a, b) =>
                a.name.localeCompare(b.name, "fr", { sensitivity: "base" })
            ),
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

/* ------------------------------------------------------------------ */
/* Point d'entrée public                                               */
/* ------------------------------------------------------------------ */
export async function getSenatorsPayload(): Promise<SenatorsApiPayload> {
    const [allPages, introHtml] = await Promise.all([
        fetchAllPages(),
        fetchIntroHtml(),
    ]);

    // 1) Filtre structurel : pages qui ressemblent à une fiche sénateur
    const senatorPages = allPages.filter(isSenatorPage);

    // 2) Filtre période : on exclut les anciens sénateurs sans mandat
    const currentPages = senatorPages.filter(isCurrentSenator);

    const excluded = senatorPages
        .filter((p) => !isCurrentSenator(p))
        .map((p) => p.slug);

    if (excluded.length > 0) {
        console.log(
            `[wp-senators] Exclus (hors mandat) : ${excluded.join(", ")}`
        );
    }

    // 3) Parsing + tri + GARDE-FOU
    const senateurs: Senateur[] = currentPages
        .map(parseSenatorPage)
        .filter((s): s is Senateur => s !== null && !!s.name)
        // 🛡️ Garde-fou final : on exclut tout sénateur qui n'a
        //    NI fonction NI commission. Ces fiches correspondent à
        //    d'anciens sénateurs (RAVALOMANANA Richard, RAKOTONDRAZAFY
        //    Lalatiana, etc.) dont la page WP existe encore mais qui
        //    ne siègent plus.
        .filter(
            (s) =>
                s.fonction.trim().length > 0 ||
                s.commissions.length > 0
        )
        .sort(compareSenateurs);

    // 4) Agrégation
    const bureau = buildBureau(senateurs);
    const commissions = buildCommissions(senateurs);
    const provinces = buildProvinces(senateurs);

    console.log(
        `[wp-senators] ${senateurs.length} sénateurs en fonction, ` +
        `${bureau.length} membres du Bureau, ` +
        `${commissions.length} commissions, ` +
        `${provinces.length} provinces ` +
        `(sur ${senatorPages.length} fiches détectées)`
    );
    if (senateurs.length > 0) {
        console.log(
            `[wp-senators] Ordre : ${senateurs
                .slice(0, 5)
                .map((s) => s.name)
                .join(" > ")} …`
        );
    }

    return { introHtml, senateurs, bureau, commissions, provinces };
}

/* ------------------------------------------------------------------ */
/* Détail d'un sénateur (page /your-senators/[slug])                   */
/* ------------------------------------------------------------------ */

export interface SenatorDetailData {
    senator: Senateur;
    bioText: string;
    rawHtml: string;
}

export async function getSenatorDetail(
    slug: string
): Promise<SenatorDetailData | null> {
    const url =
        `${API_BASE}/pages?slug=${encodeURIComponent(slug)}` +
        `&_fields=id,slug,link,modified,date,title,content&per_page=1`;

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
        const pages = (await res.json()) as WPPage[];
        if (!Array.isArray(pages) || pages.length === 0) return null;
        const page = pages[0];

        if (!isSenatorPage(page)) return null;

        const senator = parseSenatorPage(page);
        if (!senator) return null;

        const bioText = extractBioText(page.content?.rendered ?? "");

        return { senator, bioText, rawHtml: page.content?.rendered ?? "" };
    } catch (err) {
        console.error("[wp-senators] getSenatorDetail error:", err);
        return null;
    }
}

function extractBioText(html: string): string {
    const plain = stripHtml(html).replace(/\s+/g, " ").trim();
    const match = plain.match(/Biographie\s*:?\s*([\s\S]*)$/i);
    if (!match) return "";
    return match[1].replace(/\s+/g, " ").trim();
}

export function isPresident(s: Senateur): boolean {
    return /Président\s+du\s+Sénat(?:\s+par\s+intérim)?/i.test(s.fonction);
}

/*export function isVicePresident(s: Senateur): boolean {
    return /Vice[-\s]?Président\s+du\s+Sénat/i.test(s.fonction);
}

export function isQuesteur(s: Senateur): boolean {
    return /(?:^|\s)Questeur(?:\s|$|,)/i.test(s.fonction);
}

export function isRapporteurGeneral(s: Senateur): boolean {
    return /Rapporteur\s+Général/i.test(s.fonction);
}*/