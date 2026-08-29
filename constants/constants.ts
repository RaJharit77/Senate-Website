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

// Le flux live n'est plus un post WordPress : il vient de variables d'env.
// NB : LIVE_STREAM_URL est conservée telle quelle au cas où du code existant
// s'en servirait encore ailleurs, mais elle n'est plus utilisée par la
// détection TV ci-dessous (voir LIVE_YOUTUBE_CHANNEL_ID / LIVE_FACEBOOK_VIDEO_URL).
// À supprimer une fois confirmé qu'elle n'a plus d'utilisateur dans le code.
export const LIVE_STREAM_URL = process.env.LIVE_STREAM_URL || '';
// URL du flux audio live (radio), indépendante de YouTube/Facebook (hors
// périmètre de la détection TV ci-dessous).
export const LIVE_AUDIO_STREAM_URL = process.env.LIVE_AUDIO_STREAM_URL || '';

// ---- Live TV : détection YouTube (prioritaire) + repli Facebook manuel ----
//
// Le direct TV n'est plus un flux brut : il provient de YouTube quand la
// chaîne est réellement en direct (détection automatique via la YouTube
// Data API v3, cf. checkYoutubeLive() dans lib/api.ts), et se replie sur une
// URL Facebook renseignée à la main quand YouTube ne l'est pas. Facebook n'a
// pas d'équivalent public à la détection automatique de YouTube : passer par
// la Graph API demanderait un token de Page + une revue d'application Meta,
// hors périmètre pour l'instant.

// ID de la chaîne YouTube du Sénat — commence par "UC", CE N'EST PAS le
// "@handle" affiché dans l'URL publique de la chaîne. Récupérable dans
// YouTube Studio > Paramètres > Chaîne > Informations de base > ID de chaîne.
export const LIVE_YOUTUBE_CHANNEL_ID = process.env.LIVE_YOUTUBE_CHANNEL_ID || '';

// Clé API YouTube Data v3 — lecture seule sur données publiques, aucune
// revue d'application requise. À créer sur https://console.cloud.google.com
// (activer "YouTube Data API v3" puis Identifiants > Créer une clé API).
export const LIVE_YOUTUBE_API_KEY = process.env.LIVE_YOUTUBE_API_KEY || '';

// Repli manuel : URL de la vidéo en direct Facebook, au format
// https://www.facebook.com/{page}/videos/{id}/. À coller dans les variables
// d'environnement juste avant chaque diffusion Facebook, puis à vider une
// fois le direct terminé (sinon l'ancien direct resterait affiché comme
// "en direct" alors qu'il s'agit d'une rediffusion). Aucune détection
// automatique n'est faite dessus.
export const LIVE_FACEBOOK_VIDEO_URL = process.env.LIVE_FACEBOOK_VIDEO_URL || '';