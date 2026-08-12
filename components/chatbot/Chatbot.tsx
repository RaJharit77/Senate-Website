'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatbot } from '@/hooks/useChatbot';

type Language = 'fr' | 'mg';

const WELCOME_MESSAGES: Record<Language, string> = {
    fr: 'Bonjour ! Je suis l’assistant du Sénat de Madagascar. Comment puis-je vous aider ?',
    mg: 'Manao ahoana ! Ny mpanampy an’ny Antenimieran-doholona no aho. Inona no azoko atao ho anao ?',
};

const PLACEHOLDER: Record<Language, string> = {
    fr: 'Posez votre question...',
    mg: 'Apetraho eto ny fanontanianao...',
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<Language>('fr');
    const { messages, sendMessage, isLoading, resetConversation } = useChatbot(
        [{ role: 'assistant', content: WELCOME_MESSAGES.fr }]
    );
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleLanguageChange = (lang: Language) => {
        if (lang === language) return;
        setLanguage(lang);
        // On repart sur une conversation propre dans la nouvelle langue,
        // pour éviter tout mélange de contexte entre les deux langues.
        resetConversation([{ role: 'assistant', content: WELCOME_MESSAGES[lang] }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input, language);
        setInput('');
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition flex items-center justify-center"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-20 right-4 left-4 sm:left-auto z-50 w-[calc(100%-2rem)] sm:w-96 max-h-[80vh] sm:max-h-125 bg-dark/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden font-poppins"
                    >
                        <div className="p-4 border-b border-white/10 flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-cyan-400">Assistant du Sénat de Madagascar</h3>
                            <div className="flex rounded-lg border border-white/20 overflow-hidden text-xs shrink-0">
                                <button
                                    type="button"
                                    onClick={() => handleLanguageChange('fr')}
                                    aria-pressed={language === 'fr'}
                                    className={`px-2 py-1 transition ${language === 'fr'
                                        ? 'bg-primary text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    FR
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleLanguageChange('mg')}
                                    aria-pressed={language === 'mg'}
                                    className={`px-2 py-1 transition ${language === 'mg'
                                        ? 'bg-primary text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    MG
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-white/10 text-gray-200'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-xl">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={PLACEHOLDER[language]}
                                className="flex-1 min-w-0 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="shrink-0 p-2 bg-primary rounded-lg text-white hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center"
                            >
                                <Send className="w-5 h-5 shrink-0" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}