import { useState } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

type Language = 'fr' | 'mg';

export function useChatbot(initialMessages: Message[] = []) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (content: string, language: Language) => {
        if (!content.trim()) return;
        const userMessage: Message = { role: 'user', content };

        // On capture l'historique AVANT d'ajouter le nouveau message,
        // pour l'envoyer tel quel au backend (qui y ajoutera lui-même
        // le nouveau message utilisateur dans le bon ordre).
        const historyToSend = messages;

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: content,
                    language,
                    history: historyToSend,
                }),
            });

            if (!res.ok && res.status !== 200) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.reply || (language === 'mg'
                    ? 'Miala tsiny, nisy olana.'
                    : 'Désolé, une erreur est survenue.'),
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorText = language === 'mg'
                ? 'Nisy olana tamin’ny fifandraisana.'
                : 'Erreur de connexion.';
            setMessages(prev => [...prev, { role: 'assistant', content: errorText }]);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetConversation = (newMessages: Message[] = []) => {
        setMessages(newMessages);
    };

    return { messages, sendMessage, isLoading, resetConversation };
}