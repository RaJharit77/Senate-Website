import { WpPost } from "@/lib/types";

export function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function getFeaturedImage(post: WpPost): string | null {
    return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
}

export function getExcerpt(post: WpPost, maxLength = 150): string {
    const text = post.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "…";
}