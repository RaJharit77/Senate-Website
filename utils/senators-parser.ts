import { cleanText } from "@/utils/utility";
import { Commission, Province, Senateur } from "@/types/senatorsType";

/* Extraction depuis une page sénateur individuelle */

export interface SenatorListItem {
    id: string;
    name: string;
    slug: string | null;
    image: string;
    role: string;
}

export interface SenatorDetail {
    nom: string;
    prenoms: string;
    age: string;
    eluDesigne: string;
    province: string;
    parti: string;
    commissions: string[];
    auTitreDe: string;
    image: string | null;
}

export function extractSenatorsFromHtml(html: string): SenatorListItem[] {
    if (typeof window === "undefined" || !html) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const images = doc.querySelectorAll<HTMLImageElement>("img.rounded-circle");
    const map = new Map<string, SenatorListItem>();

    images.forEach((img, index) => {
        const container = img.closest<HTMLElement>("div[class*='col-']");
        if (!container) return;
        const heading = container.querySelector<HTMLElement>("h3, h4");
        if (!heading) return;
        const name = cleanText(heading.textContent || "").replace(/\s+/g, " ").trim();
        if (!name) return;

        let slug: string | null = null;
        container.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
            const href = a.getAttribute("href") || "";
            const m = href.match(/senat\.mg\/([^/?#]+)\/?$/);
            if (m && !href.includes("wp-content")) slug = m[1];
        });

        const role = cleanText(container.querySelector("p")?.textContent || "")
            .replace(/\s+/g, " ")
            .trim();

        const key = slug || `name:${name}`;
        map.set(key, {
            id: slug || `senator-${index}`,
            name,
            slug,
            image: img.getAttribute("src") || "",
            role,
        });
    });

    return Array.from(map.values()).sort((a, b) =>
        a.name.localeCompare(b.name, "fr", { sensitivity: "base" })
    );
}

export function extractSenatorDetail(
    html: string,
    fallbackImage: string | null = null
): SenatorDetail {
    if (typeof window === "undefined" || !html) return emptyDetail(fallbackImage);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const img = doc.querySelector<HTMLImageElement>("img");
    const image = img?.getAttribute("src") || fallbackImage;
    const text = (doc.body.textContent || "").replace(/\s+/g, " ");

    const pick = (label: string): string => {
        const regex = new RegExp(
            `${label}\\s*:\\s*(.+?)(?=(?:[A-ZÉÈÀÂÎÔÛÇ][A-Za-zÀ-ÿ' \\-]+\\s*:)|$)`,
            "i"
        );
        const m = text.match(regex);
        return m?.[1]?.trim() || "";
    };

    const commissions: string[] = [];
    const commissionRegex = /(?:Membre|Président|Vice-Président)\s+de\s+la\s+Commission\s+[IVX]+[^.]*?(?=(?:Membre|Président|Vice-Président|Déclaration|$))/gi;
    let cm: RegExpExecArray | null;
    while ((cm = commissionRegex.exec(text)) !== null) {
        const value = cm[0].trim();
        if (value && !commissions.includes(value)) commissions.push(value);
    }

    return {
        nom: pick("Nom"),
        prenoms: pick("Prénoms"),
        age: pick("Age"),
        eluDesigne: pick("Élu/Désigné") || pick("Elu/Désigné"),
        province: pick("Province"),
        parti: pick("Au titre du Parti") || pick("Parti"),
        auTitreDe: pick("Au titre du Président") || "",
        commissions,
        image,
    };
}

function emptyDetail(image: string | null): SenatorDetail {
    return {
        nom: "", prenoms: "", age: "", eluDesigne: "",
        province: "", parti: "", auTitreDe: "",
        commissions: [], image,
    };
}

/* Parseurs du contenu agrégé "Vos Sénateurs" */
/** Parse une carte de sénateur (div.card avec id commençant par "sen"). */
export function parseCard(card: Element): Senateur | null {
    const id = card.id;
    const img = card.querySelector("img.card-img-top") as HTMLImageElement | null;
    const titleEl = card.querySelector("h4.card-title") as HTMLElement | null;
    const textEl = card.querySelector("p.card-text") as HTMLElement | null;

    if (!titleEl) return null;

    const name = cleanText(titleEl.textContent || "").trim();
    if (!name) return null;

    const image = img?.src || null;
    const description = textEl ? cleanText(textEl.innerHTML || "").trim() : "";

    let fonction = "";
    let province = "";
    let age = "";
    let eluDesigne = "";
    let parti = "";
    const commissions: string[] = [];

    const parts = description
        .replace(/<br\s*\/?>/gi, "\n")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

    parts.forEach((part) => {
        if (/^Age\s*:/i.test(part)) {
            age = part.replace(/^Age\s*:\s*/i, "");
        } else if (/^(Élu|Elu)\/Désigné\s*:/i.test(part)) {
            eluDesigne = part.replace(/^(Élu|Elu)\/Désigné\s*:\s*/i, "");
        } else if (/^Province\s*:/i.test(part)) {
            province = part.replace(/^Province\s*:\s*/i, "");
        } else if (/^Au titre du Parti\s*:/i.test(part)) {
            parti = part.replace(/^Au titre du Parti\s*:\s*/i, "");
        } else if (/^(Membre|Président|Vice-Président|Rapporteur|Questeur)/i.test(part)) {
            commissions.push(part);
        } else if (!fonction && part.length < 100 && !/^(Age|Élu|Elu|Province|Au titre)/i.test(part)) {
            fonction = part;
        }
    });

    return { id, name, image, fonction, province, age, eluDesigne, parti, commissions };
}

/** Parse toutes les cartes de sénateurs du HTML. */
export function parseSenateurs(html: string): Senateur[] {
    if (!html || typeof window === "undefined") return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const cards = doc.querySelectorAll('[id^="sen"]');
    const senateurs: Senateur[] = [];
    const seen = new Set<string>();

    cards.forEach((card) => {
        if (!(card instanceof HTMLElement)) return;
        if (seen.has(card.id)) return;
        const parsed = parseCard(card);
        if (parsed) {
            seen.add(card.id);
            senateurs.push(parsed);
        }
    });

    return senateurs.sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
}

/** Parse les commissions depuis l'accordéon. */
export function parseCommissions(html: string): Commission[] {
    if (!html || typeof window === "undefined") return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const commissions: Commission[] = [];

    doc.querySelectorAll(".accordion .card").forEach((card) => {
        const headerBtn = card.querySelector(".card-header button");
        const title = headerBtn?.textContent?.trim() || "";
        if (!title) return;

        const members: { name: string; role: string }[] = [];
        card.querySelectorAll(".card-body ul li").forEach((li) => {
            const strong = li.querySelector("b");
            const role = strong?.textContent?.replace(/:\s*$/, "").trim() || "";
            const fullText = li.textContent?.trim() || "";
            const name = fullText.replace(/^.*?:\s*/, "").trim();
            if (name) members.push({ name, role });
        });

        commissions.push({ title, members });
    });

    return commissions;
}

/** Parse les provinces depuis les modales. */
export function parseProvinces(html: string): Province[] {
    if (!html || typeof window === "undefined") return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const provinces: Province[] = [];

    doc.querySelectorAll(".modal").forEach((modal) => {
        const header = modal.querySelector(".modal-header p");
        const title = header?.textContent?.trim() || "";
        if (!title) return;

        const senators: { name: string; image: string | null }[] = [];
        modal.querySelectorAll(".media").forEach((media) => {
            const img = media.querySelector("img") as HTMLImageElement | null;
            const nameEl = media.querySelector("h5 a, h5");
            const name = nameEl?.textContent?.trim() || "";
            if (name) senators.push({ name, image: img?.src || null });
        });

        if (senators.length > 0) provinces.push({ name: title, senators });
    });

    return provinces;
}