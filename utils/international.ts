export function getPaginationItems(current: number, total: number): (number | string)[] {
    const items: (number | string)[] = [];
    if (total <= 7) {
        for (let i = 1; i <= total; i++) items.push(i);
        return items;
    }
    items.push(1);
    let start = Math.max(2, current - 2);
    let end = Math.min(total - 1, current + 2);
    if (end - start < 4) {
        if (start === 2) end = Math.min(total - 1, start + 4);
        else if (end === total - 1) start = Math.max(2, end - 4);
    }
    if (start > 2) items.push("...");
    for (let i = start; i <= end; i++) items.push(i);
    if (end < total - 1) items.push("...");
    if (total > 1) items.push(total);
    return items;
}