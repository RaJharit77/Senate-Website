import { TabId } from "@/types/tabId";

export type RepublicId = Exclude<TabId, "transition">;
export type ContentMap = Record<TabId, string>;

export interface TabConfig {
    id: string;
    label: string;
    color: string;
    textColor: string;
    period: string;
    intro: string;
}

export interface HistoryTabsProps {
    tabs: TabConfig[];
    contents: Record<string, string>;
    loading?: boolean;
}