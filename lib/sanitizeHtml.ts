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
