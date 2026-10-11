/* 
    On capture l'historique AVANT d'ajouter le nouveau message,
    pour l'envoyer tel quel au backend (qui y ajoutera lui-même
    le nouveau message utilisateur dans le bon ordre).
*/
export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface SiteMapEntry {
    label: string;
    path: string;
    level: number;
}

/* ------------------------------------------------------------------------ */
/* CONTENU RÉEL                                                             */
/* ------------------------------------------------------------------------ */

// Forme renvoyée par /api/search (UnifiedSearchResult), excerpt déjà nettoyé.
export interface SearchApiResult {
    id: string;
    title: string;
    excerpt: string;
    date: string | null;
    path: string;
    source: string;
}

export interface ContentSnippet {
    title: string;
    path: string;
    excerpt: string;
    date: string | null;
    source: string;
}