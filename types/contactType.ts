// ----- Contact Form 7 -----
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

/** Racine du site WordPress (sans /wp-json/wp/v2), pour l'endpoint CF7. */
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