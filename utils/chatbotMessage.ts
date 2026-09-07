import {Language} from '@/types/chatbotType';

export const MARKDOWN_LINK_RE = /\[([^\]]+)\]\((\/[^\s)]+)\)/g;

export const WELCOME_MESSAGES: Record<Language, string> = {
    fr: 'Bonjour ! Je suis l’assistant du Sénat de Madagascar. Comment puis-je vous aider ?',
    mg: 'Manao ahoana ! Ny mpanampy an’ny Antenimieran-doholona no aho. Inona no azoko atao ho anao ?',
};

export const PLACEHOLDER: Record<Language, string> = {
    fr: 'Posez votre question...',
    mg: 'Apetraho eto ny fanontanianao...',
};