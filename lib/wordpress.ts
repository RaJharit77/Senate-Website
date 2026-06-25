const BASE_URL = 'https://senat.mg/wp-json/wp/v2';

// Récupérer les articles (actualités)
export async function getPosts(perPage = 10) {
    const res = await fetch(`${BASE_URL}/posts?per_page=${perPage}&_embed`);
    if (!res.ok) throw new Error('Erreur lors du chargement des articles');
    return res.json();
}

// Récupérer une page par slug
export async function getPageBySlug(slug: string) {
    const res = await fetch(`${BASE_URL}/pages?slug=${slug}&_embed`);
    if (!res.ok) throw new Error(`Page ${slug} non trouvée`);
    const pages = await res.json();
    return pages.length > 0 ? pages[0] : null;
}

// Récupérer les slides (on suppose un tag ou une catégorie spécifique)
export async function getHeroSlides() {
    // Exemple : on utilise la catégorie "une" (id à vérifier)
    const res = await fetch(`${BASE_URL}/posts?categories=3&_embed&per_page=5`);
    if (!res.ok) throw new Error('Erreur slides');
    return res.json();
}

// Récupérer les travaux législatifs (post type custom éventuel)
// Ici, on suppose un endpoint /travaux
export async function getTravaux() {
    const res = await fetch(`${BASE_URL}/travaux?per_page=10`);
    // ou /posts?categories=...
    return res.json();
}