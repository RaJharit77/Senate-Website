import {Language} from '@/types/chatbotType';

export const MARKDOWN_LINK_RE = /\[([^\]]+)\]\((\/[^\s)]+)\)/g;

export const WELCOME_MESSAGES: Record<Language, string> = {
    fr: 'Bonjour ! Je suis l’assistant du Sénat de Madagascar. Comment puis-je vous aider ?',
    mg: 'Manao ahoana ! Ny mpanampy an’ny Antenimieran-doholona no aho. Inona no azoko atao ho anao ?',
};

export const PLACEHOLDER: Record<Language, string> = {
    fr: 'Posez votre question...',
    mg: 'Apetraho eto ny fanontanianao...',
};

/* ------------------------------------------------------------------------ */
/* EXTRACTION DE MOTS-CLÉS                                                  */
/* ------------------------------------------------------------------------ */
// WordPress exige que tous les mots soient présents (mode AND) : on retire
// les mots sans valeur de recherche avant d'interroger /api/search.

// Mots sans valeur de recherche (articles, pronoms, verbes de requête...).
export const GRAMMATICAL_STOPWORDS = new Set([
    'le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'au', 'aux',
    'ce', 'cet', 'cette', 'ces', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes',
    'son', 'sa', 'ses', 'notre', 'nos', 'votre', 'vos', 'leur', 'leurs',
    'je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles', 'moi', 'toi', 'lui', 'eux',
    'est', 'es', 'être', 'suis', 'sommes', 'êtes', 'sont', 'était', 'étaient',
    'ai', 'as', 'a', 'avons', 'avez', 'ont', 'avoir',
    'peux', 'peut', 'pouvez', 'peuvent', 'pouvoir', 'pourrais', 'pourrait', 'pourriez',
    'veux', 'veut', 'voulez', 'veulent', 'vouloir', 'voudrais', 'voudrait', 'voudriez',
    'dois', 'doit', 'devez', 'doivent', 'devoir',
    'sais', 'sait', 'savez', 'savent', 'savoir',
    'fais', 'fait', 'faites', 'font', 'faire',
    'dis', 'dit', 'dites', 'disent', 'dire',
    'donner', 'donne', 'donnez', 'donnes',
    'trouver', 'trouve', 'trouves', 'trouvez', 'trouvent',
    'chercher', 'cherche', 'cherches', 'cherchez', 'cherchent',
    'parler', 'parle', 'parles', 'parlez', 'parlent',
    'montrer', 'montre', 'montres', 'montrez', 'montrent',
    'expliquer', 'explique', 'expliques', 'expliquez', 'expliquent',
    'indiquer', 'indique', 'indiques', 'indiquez', 'indiquent',
    'présenter', 'présente', 'présentes', 'présentez', 'présentent',
    'que', 'qui', 'quoi', 'quel', 'quelle', 'quels', 'quelles',
    'où', 'quand', 'comment', 'pourquoi', 'combien',
    'svp', 'stp', 'merci', 'bonjour', 'salut', 'bonsoir',
    'et', 'ou', 'mais', 'donc', 'car', 'ni', 'si', 'ne', 'pas', 'plus', 'très', 'bien', 'aussi', 'encore',
    'y', 'en', 'dans', 'sur', 'sous', 'avec', 'sans', 'pour', 'par', 'vers', 'chez', 'entre',
    'tout', 'toute', 'tous', 'toutes', 'quelque', 'quelques', 'aujourd', 'hui',
]);

// Décrivent le type de réponse voulu, pas le sujet recherché.
export const META_REQUEST_WORDS = new Set([
    'extrait', 'extraits', 'exemple', 'exemples', 'détail', 'détails',
    'information', 'informations', 'renseignement', 'renseignements',
    'résumé', 'résumés', 'aperçu', 'explication', 'explications',
    'article', 'articles',
]);