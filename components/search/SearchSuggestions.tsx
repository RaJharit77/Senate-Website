"use client";

import { Props } from "@/types/searchTypes";
import { Clock, X } from "lucide-react";
import { RiDeleteBin5Fill } from "react-icons/ri";

export function SearchSuggestions({ query, history, onPick, onRemove, onClear }: Props) {
    const q = query.trim().toLowerCase();
    const items = (q ? history.filter((h) => h.toLowerCase().includes(q) && h.toLowerCase() !== q) : history).slice(0, 6);
    if (items.length === 0) return null;

    return (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 pt-2 pb-1 text-[0.7rem] uppercase tracking-wide text-gray-400">
                <span>Recherches récentes</span>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); onClear(); }} className="hover:text-cyan-600">
                    <RiDeleteBin5Fill size={15} />
                </button>
            </div>
            <ul>
                {items.map((term) => (
                    <li key={term} className="group flex items-center hover:bg-cyan-50">
                        <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); onPick(term); }}
                            className="flex flex-1 items-center gap-3 px-4 py-2 text-left text-sm text-gray-700"
                        >
                            <Clock size={14} className="text-gray-400" />
                            {term}
                        </button>
                        <button
                            type="button"
                            aria-label={`Supprimer ${term}`}
                            onMouseDown={(e) => { e.preventDefault(); onRemove(term); }}
                            className="px-3 text-gray-300 hover:text-red-500"
                        >
                            <X size={15} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}