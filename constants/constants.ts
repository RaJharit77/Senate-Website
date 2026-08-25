// ---- Others ---
export const CAT_VIDEO = 32;
export const CAT_DIVERS = 33;
export const CAT_AUTRE = 31;
export const CAT_PUBLICATION = 34;
export const CAT_AUDIO = 35;

// ---- Parliamentary proceedings ----
export const CAT_ORDRE_JOUR = 11;
export const CAT_DELIBERATION = 53;
export const PARENT_CATEGORY_ID = 10;

// ---- Travaux parlementaires ----
export const CAT_LOIS = 42;
export const CAT_CALENDRIER = 43;

// ---- Agenda ----
export const ITEMS_PER_PAGE = 6;

// ---- International ----
export const PER_PAGE = 9;
export const PER_PAGE_ACTIVITIES_FEED = 6;

// For all page
export const dynamic = 'force-dynamic';

// Contact API FORM
// Identifiants imposés par le shortcode CF7 généré dans WordPress.
// Ils sont stables pour un formulaire donné et n'ont pas besoin d'être
// dynamiques côté client.
export const CF7_FORM_ID = 263;
export const CF7_VERSION = "5.9.5";
export const CF7_LOCALE = "fr_FR";
export const CF7_UNIT_TAG = "wpcf7-f263-p149-o1";
export const CF7_CONTAINER_POST = 149;

// Others page
export const perPage = 6;

// Texts and laws
// ID de la catégorie "PL adoptes"
export const CAT_LOIS_ADOPTES = 14;
export const ITEMS_PER_PAGES = 5;

// ---- Media : Chaîne TV / Radio ----
// CAT_VIDEO (32) existe déjà côté WP et sert aux vidéos YouTube.
// Les catégories ci-dessous n'existent pas encore côté WordPress : il faudra
// les créer dans wp-admin (Réglages > Catégories) puis reporter les vrais ID
// ici. Tant qu'elles ne sont pas créées, getPostsByCategory renverra un
// tableau vide pour ces types de contenu (comportement sans crash, cf. api.ts).

// Vidéos hébergées (fichier .mp4 uploadé, PAS YouTube) : à créer côté WP.
export const CAT_VIDEO_HOSTED = 0; // TODO: remplacer par l'ID réel une fois la catégorie créée dans WordPress

// Podcasts / émissions audio : à créer côté WP.
export const CAT_AUDIO_PODCAST = 0; // TODO: remplacer par l'ID réel une fois la catégorie créée dans WordPress

// Rediffusions / montages vidéo ("mise en boîte") : à créer côté WP.
export const CAT_MONTAGE = 0; // TODO: remplacer par l'ID réel une fois la catégorie créée dans WordPress

// Le flux live n'est pas un post WordPress : il vient d'une variable d'env.
export const LIVE_STREAM_URL = process.env.LIVE_STREAM_URL || '';
// URL du flux audio live (radio), séparée du flux vidéo live (TV).
export const LIVE_AUDIO_STREAM_URL = process.env.LIVE_AUDIO_STREAM_URL || '';
