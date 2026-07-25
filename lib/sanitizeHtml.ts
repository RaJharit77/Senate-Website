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
