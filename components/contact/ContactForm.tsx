"use client";

import { useState, type FormEvent } from "react";
import { submitContactForm } from "@/lib/api";
import { ContactFormResult } from "@/types/contactType";

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const EMPTY_FORM: FormState = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

export default function ContactForm() {
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<ContactFormResult | null>(null);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        setResult(null);

        try {
            const res = await submitContactForm(form);
            setResult(res);
            if (res.status === "mail_sent") {
                setForm(EMPTY_FORM);
            }
        } catch (err) {
            console.error("[ContactForm] submit failed:", err);
            setResult({
                status: "mail_failed",
                message: "Impossible d'envoyer le message pour le moment. Veuillez réessayer plus tard.",
            });
        } finally {
            setSubmitting(false);
        }
    }

    const fieldError = (field: string) => result?.invalidFields?.[field];

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-white/80 text-sm font-semibold mb-1">
                    Votre nom
                </label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/20 px-4 py-3 bg-white/20 text-white placeholder:text-white/50"
                    placeholder="Nom complet"
                />
                {fieldError("your-name") && (
                    <p className="text-red-400 text-xs mt-1">{fieldError("your-name")}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-white/80 text-sm font-semibold mb-1">
                    Votre e-mail
                </label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/20 px-4 py-3 bg-white/20 text-white placeholder:text-white/50"
                    placeholder="email@exemple.com"
                />
                {fieldError("your-email") && (
                    <p className="text-red-400 text-xs mt-1">{fieldError("your-email")}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-white/80 text-sm font-semibold mb-1">
                    Objet
                </label>
                <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 px-4 py-3 bg-white/20 text-white placeholder:text-white/50"
                    placeholder="Sujet de votre message"
                />
                {fieldError("your-subject") && (
                    <p className="text-red-400 text-xs mt-1">{fieldError("your-subject")}</p>
                )}
            </div>
            <div className="mb-6">
                <label className="block text-white/80 text-sm font-semibold mb-1">
                    Votre message
                </label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/20 px-4 py-3 bg-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                    placeholder="Écrivez votre message ici..."
                />
                {fieldError("your-message") && (
                    <p className="text-red-400 text-xs mt-1">{fieldError("your-message")}</p>
                )}
            </div>

            {result && (
                <p
                    className={`text-sm mb-4 ${
                        result.status === "mail_sent" ? "text-green-400" : "text-red-400"
                    }`}
                    role="status"
                >
                    {result.message}
                </p>
            )}

            <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-lg bg-[#5CE65C] text-black font-semibold transition-all hover:opacity-80 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
            >
                {submitting ? "Envoi en cours..." : "Envoyer"}
            </button>
        </form>
    );
}