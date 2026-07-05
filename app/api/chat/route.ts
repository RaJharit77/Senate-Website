import { NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY_SENAT_DE_MADAGASCAR;
const MODEL = 'llama-3.1-8b-instant';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        if (!message) {
            return NextResponse.json({ error: 'Message requis' }, { status: 400 });
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: 'system',
                        content:
                            'Tu es un assistant utile et concis pour le site du Sénat de Madagascar. Réponds en français et guide les utilisateurs sur les fonctionnalités du site, les procédures législatives et les informations sur le Sénat. Si tu ne connais pas la réponse, indique-le poliment.',
                    },
                    { role: 'user', content: message },
                ],
                max_tokens: 200,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            console.error('Groq API error', response.status, err);
            return NextResponse.json({ reply: "Désolé, je n'ai pas pu répondre." }, { status: 500 });
        }

        const data = await response.json();
        const reply = data.choices[0]?.message?.content || "Désolé, je n'ai pas compris.";

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
    }
}