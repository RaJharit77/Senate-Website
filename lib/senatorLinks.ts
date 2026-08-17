/**
 * Utilitaires pour transformer le HTML WordPress des cartes sénateur
 * (contenu injecté via dangerouslySetInnerHTML dans HistoryTabs) :
 * générer un slug de profil, nettoyer les espaces, et poser un lien
 * interne cohérent vers /historical/[slug] sur chaque carte.
 */

/** Sélecteur CSS d'une "carte sénateur" : une colonne WP contenant un avatar rond. */
const SENATOR_CARD_SELECTOR = '[class*="col-"]:has(.rounded-circle)';

/** Classe appliquée à chaque lien de nom de sénateur, qu'il soit généré ou déjà présent. */
const SENATOR_LINK_CLASSNAME = "hover:text-cyan-300 transition-colors cursor-pointer";

/**
 * Génère un slug URL-safe à partir d'un nom (minuscules, sans accents, tirets).
 * Doit rester cohérent avec le slug résolu par getSenatorBySlug côté API.
 */
export function generateSlug(name: string): string {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();
}

/**
 * Normalise les espaces d'un texte issu de WordPress : les \u00A0 (espaces
 * insécables, &nbsp;) comptent comme des espaces classiques pour \s en JS,
 * donc ceci évite les slugs ou textes bizarres causés par ces caractères.
 */
export function cleanWhitespace(text: string): string {
    return text.replace(/\s+/g, " ").trim();
}

/**
 * Pose (ou met à jour) le lien interne d'une carte sénateur, en s'assurant
 * qu'il pointe vers /historical/[slug] plutôt que vers une éventuelle URL
 * externe héritée du contenu WordPress d'origine.
 */
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

/**
 * Parcourt le HTML WordPress d'un onglet République et pose un lien interne
 * vers /historical/[slug] sur chaque carte sénateur trouvée.
 *
 * Ne fait volontairement AUCUNE déduplication : le contenu WordPress répète
 * certains sénateurs à travers la chronologie (le Bureau Permanent est
 * réaffiché après chaque changement de composition), et supprimer les
 * "doublons" supprime en réalité des sénateurs bien réels.
 */
export function addSenatorLinks(html: string): string {
    if (!html || typeof document === "undefined") return html;

    const container = document.createElement("div");
    container.innerHTML = html;
    container.querySelectorAll(SENATOR_CARD_SELECTOR).forEach(linkifySenatorCard);

    return container.innerHTML;
}