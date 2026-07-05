import { useState } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function useChatbot(initialMessages: Message[] = []) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;
        const userMessage: Message = { role: 'user', content };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: content }),
            });
            const data = await res.json();
            const assistantMessage: Message = { role: 'assistant', content: data.reply };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Erreur de connexion.' }]);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, sendMessage, isLoading };
}