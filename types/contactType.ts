// ----- Contact Form 7 -----
// Le endpoint CF7 n'utilise pas fetchAPI() car il ne tape pas vers
// API_BASE (/wp-json/wp/v2) mais vers /wp-json/contact-form-7/v1, et il
// attend du multipart/form-data (pas de JSON en entrée). On le garde donc
// séparé, mais toujours dans ce fichier "api" pour centraliser tous les
// appels réseau côté WordPress.

export interface ContactFormFields {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactFormResult {
    status: "mail_sent" | "validation_failed" | "spam" | "aborted" | "mail_failed" | string;
    message: string;
    invalidFields?: Record<string, string>;
}

export const WP_ROOT = (process.env.WP_API_URL || "https://senat.mg/wp-json/wp/v2").replace(
    /\/wp-json\/wp\/v2\/?$/,
    ""
);

export interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}