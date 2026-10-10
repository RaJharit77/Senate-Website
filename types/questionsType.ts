export interface QuestionItem {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    link: string;
}

export interface QuestionsEcritesClientProps {
    content: string;
    title: string;
    questions: QuestionItem[];
}