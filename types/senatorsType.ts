export interface Senateur {
    id: string;
    name: string;
    image: string | null;
    fonction: string;
    province: string;
    age: string;
    eluDesigne: string;
    parti: string;
    commissions: string[];
}

export interface Commission {
    title: string;
    members: { name: string; role: string }[];
}

export interface Province {
    name: string;
    senators: { name: string; image: string | null }[];
}

/** Payload renvoyé par /api/senateurs */
export interface SenatorsApiPayload {
    introHtml: string;
    senateurs: Senateur[];
    bureau: Senateur[];
    commissions: Commission[];
    provinces: Province[];
}

export interface SenatorsApiResponse {
    success: boolean;
    data?: SenatorsApiPayload;
    error?: string;
    meta?: { count: number; generatedAt: string };
}

// Onglets
export type TabId = "tab1" | "tab2" | "tab3" | "tab5";

export const TABS: { id: TabId; label: string }[] = [
    { id: "tab1", label: "Les 18 Sénateurs" },
    { id: "tab2", label: "Le Bureau Permanent" },
    { id: "tab3", label: "Les Commissions" },
    { id: "tab5", label: "Sénateurs par Province" },
];

// Conservé pour compatibilité avec l'ancien composant SenatorsList
export interface SenatorProfile {
    id: number;
    name: string;
    photoUrl: string;
    link: string;
    age?: number;
    type: 'élu' | 'désigné' | string;
    province: string;
    party: string;
    role?: string;
    commissions: string[];
}