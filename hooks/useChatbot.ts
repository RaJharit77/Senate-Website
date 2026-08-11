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
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: content, language }),
            });
            const data = await res.json();
            const assistantMessage: Message = { role: 'assistant', content: data.reply };
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