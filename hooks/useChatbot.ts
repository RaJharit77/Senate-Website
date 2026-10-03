import { useState } from 'react';
import { Language } from '@/types/chatbotType';
import { Message } from '@/types/chatbot';

export function useChatbot(initialMessages: Message[] = []) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (content: string, language: Language) => {
        if (!content.trim()) return;
        const userMessage: Message = { role: 'user', content };

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