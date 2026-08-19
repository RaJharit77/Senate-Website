"use client";

import { useState, type SyntheticEvent } from "react";
import { submitContactForm } from "@/lib/api";
import { ContactFormResult, FormState } from "@/types/contactType";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

    async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
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
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80 text-sm font-semibold">
                    Votre nom
                </Label>
                <Input
                    data-testid="contact-name"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/50 text-base py-3 px-4 h-auto"
                    placeholder="Nom complet"
                />
                {fieldError("your-name") && (
                    <p className="text-red-400 text-xs mt-1">{fieldError("your-name")}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80 text-sm font-semibold">
                    Votre e-mail
                </Label>
                <Input
                    data-testid="contact-email"
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/50 text-base py-3 px-4 h-auto"
                    placeholder="email@exemple.com"
                />
                {fieldError("your-email") && (
                    <p className="text-red-400 text-xs mt-1">{fieldError("your-email")}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="subject" className="text-white/80 text-sm font-semibold">
                    Objet
                </Label>
                <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/50 text-base py-3 px-4 h-auto"
                    placeholder="Sujet de votre message"
                />
                {fieldError("your-subject") && (
                    <p className="text-red-400 text-xs mt-1">{fieldError("your-subject")}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="message" className="text-white/80 text-sm font-semibold">
                    Votre message
                </Label>
                <Textarea
                    data-testid="contact-message"
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/50 text-base py-3 px-4 min-h-[150px]"
                    placeholder="Écrivez votre message ici..."
                />
                {fieldError("your-message") && (
                    <p className="text-red-400 text-xs mt-1">{fieldError("your-message")}</p>
                )}
            </div>

            {result && (
                <p
                    className={`text-sm ${result.status === "mail_sent" ? "text-green-400" : "text-red-400"
                        }`}
                    role="status"
                >
                    {result.message}
                </p>
            )}

            <Button
                data-testid="contact-submit"
                type="submit"
                disabled={submitting}
                className="w-full bg-[#5CE65C] text-black font-semibold hover:bg-[#4bc94b] hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 text-base py-3 h-auto"
                size="lg"
            >
                {submitting ? "Envoi en cours..." : "Envoyer"}
            </Button>
        </form>
    );
}