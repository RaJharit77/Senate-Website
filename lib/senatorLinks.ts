/** Sélecteur d'une carte sénateur : colonne WP contenant un avatar rond. */
const SENATOR_CARD_SELECTOR = '[class*="col-"]:has(.rounded-circle)';

/** Classe appliquée au lien de nom de sénateur. */
const SENATOR_LINK_CLASSNAME = "hover:text-cyan-300 transition-colors cursor-pointer";

/** Génère un slug URL-safe à partir d'un nom (accents et espaces retirés). */
export function generateSlug(name: string): string {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();
}

/** Normalise les espaces d'un texte (dont les espaces insécables \u00A0). */
export function cleanWhitespace(text: string): string {
    return text.replace(/\s+/g, " ").trim();
}

/** Pose le lien interne /historical/[slug] sur une carte sénateur donnée. */
function linkifySenatorCard(card: Element): void {
    const titleEl = card.querySelector("h3, h4") as HTMLElement | null;
    if (!titleEl) return;

    const existingLink = titleEl.querySelector("a");
    const rawName = existingLink?.textContent || titleEl.textContent || "";
    const fullName = cleanWhitespace(rawName);
    if (!fullName) return;

    const href = `/historical/${generateSlug(fullName)}`;

    if (existingLink) {
        existingLink.setAttribute("href", href);
        existingLink.removeAttribute("target");
        existingLink.className = SENATOR_LINK_CLASSNAME;
        existingLink.setAttribute("title", fullName);
        existingLink.textContent = fullName;
        return;
    }

    const link = document.createElement("a");
    link.setAttribute("href", href);
    link.setAttribute("title", fullName);
    link.className = SENATOR_LINK_CLASSNAME;
    link.textContent = fullName;
    titleEl.innerHTML = "";
    titleEl.appendChild(link);
}

/** Ajoute un lien interne vers /historical/[slug] sur chaque carte sénateur trouvée. */
export function addSenatorLinks(html: string): string {
    if (!html || typeof document === "undefined") return html;

    const container = document.createElement("div");
    container.innerHTML = html;
    container.querySelectorAll(SENATOR_CARD_SELECTOR).forEach(linkifySenatorCard);

    return container.innerHTML;
}