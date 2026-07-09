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
        .replace(/&#8217;/g, "'");
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