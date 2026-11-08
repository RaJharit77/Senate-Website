"use client";

import { CHANGE_EVENT, EMPTY_HISTORY, KEY, MAX } from "@/constants/searchHistory";
import { useCallback, useSyncExternalStore } from "react";

let cachedRaw: string | null | undefined;
let cachedHistory: string[] = EMPTY_HISTORY;

function readHistory(): string[] {
    if (typeof window === "undefined") return EMPTY_HISTORY;

    try {
        const raw = localStorage.getItem(KEY);
        if (raw !== cachedRaw) {
            cachedRaw = raw;
            const parsed: unknown = raw ? JSON.parse(raw) : [];
            cachedHistory = Array.isArray(parsed)
                ? parsed.filter((item): item is string => typeof item === "string")
                : EMPTY_HISTORY;
        }
    } catch {
        cachedRaw = null;
        cachedHistory = EMPTY_HISTORY;
    }

    return cachedHistory;
}

function subscribe(onChange: () => void) {
    window.addEventListener("storage", onChange);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(CHANGE_EVENT, onChange);
    };
}

function persist(items: string[]) {
    cachedHistory = items;
    try {
        cachedRaw = JSON.stringify(items);
        localStorage.setItem(KEY, cachedRaw);
    } catch { }
    window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useSearchHistory() {
    const history = useSyncExternalStore(subscribe, readHistory, () => EMPTY_HISTORY);

    const add = useCallback((term: string) => {
        const t = term.trim();
        if (!t) return;
        const next = [t, ...readHistory().filter((h) => h.toLowerCase() !== t.toLowerCase())].slice(0, MAX);
        persist(next);
    }, []);

    const remove = useCallback((term: string) => persist(readHistory().filter((h) => h !== term)), []);
    const clear = useCallback(() => persist([]), []);

    return { history, add, remove, clear };
}