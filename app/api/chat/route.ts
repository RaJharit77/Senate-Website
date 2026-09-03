import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || '',
});

type SearchApiResult = {
    id: string;
    title: string;
    excerpt: string;
    date?: string;
    path: string;
    source: string;
};

const MAX_SNIPPETS = 5;

const BASE_SITE_CONTEXT = `
Tu es l'assistant virtuel officiel et le guide d'utilisation du site web du Sénat de Madagascar (Antenimierandoholona).
Ton rôle est d'agir à la fois comme un utilisateur expérimenté et un assistant intelligent pour aider les visiteurs.

Règles de comportement :
- Sois poli, professionnel, et concis.
- Si l'utilisateur demande une loi, un texte ou une information précise, utilise IMPÉRATIVEMENT les "Résultats de recherche" fournis ci-dessous pour formuler ta réponse.
- Cite la source, la date et le lien (/path) lorsque tu fournis un extrait de loi ou d'actualité.
- Ne génère pas de réponses contenant du code.
`;

function extractSearchKeywords(query: string): string {
    const stopWords = new Set([
        "est", "ce", "que", "qui", "quoi", "dont", "ou", "comment", "pourquoi",
        "tu", "je", "il", "elle", "nous", "vous", "ils", "elles", "on",
        "peux", "peut", "pouvez", "pouvons", "veux", "veut", "voulez", "voulons",
        "donner", "donne", "donnes", "trouver", "trouve", "trouves", "chercher", 
        "cherche", "parler", "parle", "parles", "avoir", "as", "a", "savoir", "sais",
        "un", "une", "des", "le", "la", "les", "de", "du", "au", "aux", "à",
        "et", "ou", "mais", "donc", "or", "ni", "car",
        "pour", "dans", "sur", "avec", "sans", "sous", "par",
        "extrait", "extraits", "résumé", "exemple", "exemples", "texte",
        "bonjour", "salut", "merci", "s'il", "te", "plaît", "plait", "svp"
    ]);

    let cleaned = query.toLowerCase();
    cleaned = cleaned.replace(/\b[ldqsmtnjc]'/g, "");
    cleaned = cleaned.replace(/[-.,?!:;()"']/g, " ");
    
    const words = cleaned.split(/\s+/);
    const keywords = words.filter(word => word.length > 1 && !stopWords.has(word));
    
    return keywords.join(" ");
}

export async function POST(req: Request) {
    try {
        // Vérification préliminaire de la clé API
        if (!process.env.GROQ_API_KEY) {
            console.error("[Chatbot Error] GROQ_API_KEY est manquante dans votre fichier .env.local");
            return NextResponse.json(
                { error: "La clé GROQ_API_KEY n'est pas configurée." },
                { status: 500 }
            );
        }

        const { messages, language } = await req.json();
        const lastUserMessage = messages
            .filter((m: { role?: string; content?: string }) => m.role === 'user')
            .pop()?.content || '';
        
        let searchContext = "";
        const searchKeywords = extractSearchKeywords(lastUserMessage);

        // 1. Exécution sécurisée de la recherche interne
        if (searchKeywords) {
            try {
                const host = req.headers.get('host') || 'localhost:3000';
                const protocol = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
                const baseUrl = `${protocol}://${host}`;

                // Fetch sécurisé avec Timeout de 4 secondes pour éviter tout blocage
                const searchResponse = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent(searchKeywords)}`, {
                    headers: { 'Accept': 'application/json' },
                    signal: AbortSignal.timeout(4000)
                });
                
                if (searchResponse.ok) {
                    const searchData: SearchApiResult[] = await searchResponse.json();

                    if (Array.isArray(searchData)) {
                        const snippets = searchData
                            .filter((item) => item.source !== "Navigation du site") 
                            .slice(0, MAX_SNIPPETS)
                            .map((item) => {
                                const dateStr = item.date ? ` — ${item.date}` : '';
                                return `${item.title} (${item.source}${dateStr}) — ${item.path}\nExtrait: ${item.excerpt}`;
                            });

                        if (snippets.length > 0) {
                            searchContext = `\n\n--- RÉSULTATS DE RECHERCHE SUR LE SITE ---\nVoici le contenu réel du site pertinent pour la demande :\n\n${snippets.join('\n\n')}\n------------------------------------------\nUtilise ces informations exactes pour répondre à l'utilisateur.`;
                        }
                    }
                } else {
                    console.warn(`[Chatbot Search] /api/search a répondu avec le statut ${searchResponse.status}`);
                }
            } catch (searchError) {
                // En cas d'erreur lors du fetch de recherche, l'assistant continue de répondre au lieu de tout faire planter !
                console.error("[Chatbot Search non bloquant]", searchError);
            }
        }

        // 2. Instructions de langue
        const languageInstruction = language === 'mg' 
            ? "L'utilisateur a choisi de communiquer en Malgache. Réponds impérativement en Malgache." 
            : "L'utilisateur a choisi de communiquer en Français. Réponds impérativement en Français.";

        // 3. Assemblage du System Prompt
        const systemMessage = {
            role: 'system',
            content: `${BASE_SITE_CONTEXT}\n\n${languageInstruction}${searchContext}`,
        };

        // 4. Appel de l'API Groq
        const chatCompletion = await groq.chat.completions.create({
            messages: [systemMessage, ...messages],
            model: 'llama-3.1-8b-instant',
            temperature: 0.3,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
        });

        const reply = chatCompletion.choices[0]?.message?.content || "Erreur de génération.";

        return NextResponse.json({ reply });

    } catch (error: unknown) {
        console.error('Erreur globale API Chatbot:', error);
        return NextResponse.json(
            {
                error: error instanceof Error
                    ? error.message
                    : 'Erreur lors du traitement de votre demande.',
            },
            { status: 500 }
        );
    }
}