import { NextResponse } from 'next/server';
import { Language } from '@/types/chatbotType';
import { 
    extractSearchKeywords, 
    formatContentContext, 
    getOrigin, 
    randomDelay, 
    sanitizeHistory, 
    searchSiteContent 
} from '@/utils/utilities';
import { GROQ_API_KEY, MODEL } from '@/constants/chatbotVersions';
import { buildSystemPrompt } from '@/utils/chatbotRole';

export async function POST(req: Request) {
    if (!GROQ_API_KEY) {
        console.error('GROQ_API_KEY_SENAT_DE_MADAGASCAR is not set');
        return NextResponse.json({ error: 'Configuration serveur manquante' }, { status: 500 });
    }

    try {
        const body = await req.json();
        const { message, language, history } = body ?? {};

        if (!message || typeof message !== 'string' || !message.trim()) {
            return NextResponse.json({ error: 'Message requis' }, { status: 400 });
        }

        const trimmedMessage = message.slice(0, 1500);
        const lang: Language = language === 'mg' ? 'mg' : 'fr';
        const conversationHistory = sanitizeHistory(history);

        // Mots-clés extraits, pas la phrase brute (voir extractSearchKeywords).
        const origin = getOrigin(req);
        const keywords = extractSearchKeywords(trimmedMessage);
        const snippets = keywords ? await searchSiteContent(keywords, origin) : [];
        const contentContext = formatContentContext(snippets);

        const messages = [
            { role: 'system' as const, content: buildSystemPrompt(lang, contentContext) },
            ...conversationHistory,
            { role: 'user' as const, content: trimmedMessage },
        ];

        const [response] = await Promise.all([
            fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages,
                    max_tokens: 500,
                    temperature: 0.3,
                    top_p: 0.9,
                }),
            }),
            randomDelay(600, 1200),
        ]);

        if (!response.ok) {
            const err = await response.text();
            console.error('Groq API error', response.status, err);
            const fallback = lang === 'mg'
                ? 'Miala tsiny, tsy afaka namaly aho amin\'izao fotoana izao.'
                : "Désolé, je n'ai pas pu répondre pour le moment.";
            return NextResponse.json({ reply: fallback }, { status: 200 });
        }

        const data = await response.json();
        const fallbackReply = lang === 'mg'
            ? 'Miala tsiny, tsy azoko tsara ny fanontanianao. Andramo hafazana.'
            : "Désolé, je n'ai pas compris votre question. Pouvez-vous reformuler ?";

        const reply: string = data.choices?.[0]?.message?.content?.trim() || fallbackReply;

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
    }
}