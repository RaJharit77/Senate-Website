import { NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY_SENAT_DE_MADAGASCAR;
const MODEL = 'llama-3.1-8b-instant';

type Language = 'fr' | 'mg';

const SITE_MAP = `
- Accueil : /
- À propos du Sénat : /about
    - Missions et attributions : /about/missions-and-responsibilities
    - Structures : /about/structures
    - Textes de référence : /about/reference-texts
- Historique : /historical?tab=first
- Travaux Parlementaires : /parliamentary-proceedings
    - Travaux législatifs : /parliamentary-proceedings/legislative-proceedings
    - Calendrier Parlementaire : /agenda
    - Textes et lois : /texts-and-laws
- International : /international
    - Activités du Président : /international/presidents-activities
    - Activités des Sénateurs : /international/senators-activities
    - Groupe Interparlementaire d'amitié : /international/inter-parliamentary-friendship-group
- Espace Presse : /press-area
- Autres : /others
- Contact : /contact
`.trim();

function buildSystemPrompt(language: Language): string {
    const languageInstruction = language === 'mg'
        ? `LANGUE OBLIGATOIRE : L'utilisateur a choisi le MALAGASY dans le sélecteur de langue de l'interface. Tu dois répondre EXCLUSIVEMENT en malagasy, quelle que soit la langue du message reçu (même s'il est écrit en français). Ne mélange jamais le français et le malagasy dans ta réponse.`
        : `LANGUE OBLIGATOIRE : L'utilisateur a choisi le FRANÇAIS dans le sélecteur de langue de l'interface. Tu dois répondre EXCLUSIVEMENT en français, quelle que soit la langue du message reçu (même s'il est écrit en malagasy). Ne mélange jamais le français et le malagasy dans ta réponse.`;

    return `Tu es l'assistant virtuel officiel du site web du Sénat de Madagascar (Antenimierandoholona).

RÔLE ET LIMITES DE CONNAISSANCES :
- Tu ne connais QUE la structure et les rubriques du site web ci-dessous. Tu n'as accès à AUCUNE base de données, AUCUNE information en temps réel (actualités précises, noms de sénateurs, dates d'agenda, contenus d'articles, etc.).
- Ton rôle est d'ORIENTER l'utilisateur vers la bonne rubrique/page du site, pas de fournir des informations factuelles précises que tu ne peux pas vérifier.
- Si on te demande une information précise (un chiffre, un nom, une date, le contenu d'un texte de loi), ne l'invente JAMAIS. Indique poliment que tu ne peux pas garantir cette information et redirige vers la page correspondante du site où elle peut être consultée.
- Ne réponds jamais à des questions hors sujet (culture générale, actualité internationale, autres pays, code, etc.). Rappelle poliment que tu es dédié au site du Sénat de Madagascar.

PLAN DU SITE (utilise UNIQUEMENT ces pages pour orienter l'utilisateur, avec leur chemin exact) :
${SITE_MAP}

${languageInstruction}
Si le message de l'utilisateur est écrit dans une autre langue que celle choisie, comprends-le quand même, mais rédige ta réponse uniquement dans la langue choisie.

STYLE DE RÉPONSE :
- Sois concis, clair et courtois.
- Quand tu orientes vers une page, mentionne son nom ET son chemin (ex: "Historique" à /historical?tab=first).
- Ne mentionne jamais que tu utilises un modèle d'IA externe ou technique interne.`;
}

function randomDelay(minMs: number, maxMs: number) {
    const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
    try {
        const { message, language } = await req.json();
        if (!message) {
            return NextResponse.json({ error: 'Message requis' }, { status: 400 });
        }

        // Repli sécurisé sur le français si la langue n'est pas fournie ou invalide,
        // pour ne jamais laisser le modèle deviner.
        const lang: Language = language === 'mg' ? 'mg' : 'fr';

        const [response] = await Promise.all([
            fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        { role: 'system', content: buildSystemPrompt(lang) },
                        { role: 'user', content: message },
                    ],
                    max_tokens: 250,
                    temperature: 0.5,
                }),
            }),
            randomDelay(2000, 3000),
        ]);

        if (!response.ok) {
            const err = await response.text();
            console.error('Groq API error', response.status, err);
            const fallback = lang === 'mg' ? "Miala tsiny, tsy afaka namaly aho." : "Désolé, je n'ai pas pu répondre.";
            return NextResponse.json({ reply: fallback }, { status: 500 });
        }

        const data = await response.json();
        const fallbackReply = lang === 'mg' ? 'Miala tsiny, tsy azoko tsara ny fanontanianao.' : "Désolé, je n'ai pas compris.";
        const reply = data.choices[0]?.message?.content || fallbackReply;

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
    }
}