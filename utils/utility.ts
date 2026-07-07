export function cleanText(text: string): string {
    if (!text) return "";
    return text
        .replace(/&rsquo;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#8211;/g, "–")
        .replace(/&#8217;/g, "'");
}

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}
