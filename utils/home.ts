import { WpPost } from "@/lib/wp-types";
import { RED, SKY_BLUE } from "./colors";

export const PLACEHOLDER_IMAGE =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4K";

export function truncateExcerpt(text: string, maxLength: number = 120): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "…";
}

export function getAcfString(item: WpPost, key: string, fallback: string): string {
    const acf = item.acf as Record<string, unknown> | undefined;
    const value = acf?.[key];
    return typeof value === "string" ? value : fallback;
}

/**
* Détermine le statut d'un article en fonction de sa date par rapport à aujourd'hui.
* Pour les lois, on adapte le libellé : "Terminé" devient "Adopté".
*/
export function getStatusFromDate(dateStr: string, type: "agenda" | "legislation" = "agenda"): { status: string; color: string } {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    let status: string;
    let color: string;

    if (date < today) {
        status = type === "legislation" ? "Adopté" : "Terminé";
        color = RED;
    } else if (date.getTime() === today.getTime()) {
        status = "Aujourd'hui";
        color = SKY_BLUE;
    } else {
        status = "À venir";
        color = SKY_BLUE;
    }

    return { status, color };
}