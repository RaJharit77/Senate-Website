export function toSvgPoints(coords: string): string {
    const nums = coords.split(",").map((n) => n.trim()).filter(Boolean);
    const pairs: string[] = [];
    for (let i = 0; i < nums.length; i += 2) {
        pairs.push(`${nums[i]},${nums[i + 1]}`);
    }
    return pairs.join(" ");
}

export function normalizeProvince(s: string): string {
    return s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

export function nameToSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}