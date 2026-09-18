import { CYAN, EMERALD, RED, WHITE } from "@/utils/colors";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = buildMetadata({
    title: "Contact – Sénat de Madagascar",
    description: "Contacter le Sénat de Madagascar : formulaire de contact, adresse, e-mail, téléphone et horaires d'ouverture.",
    path: "/contact",
});

export const dynamic = 'force-dynamic';

export default function ContactPage() {
    const breadcrumb = buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: "Contact", url: `${SITE_URL}/contact` },
    ]);

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact – Sénat de Madagascar",
        description: "Formulaire de contact et coordonnées du Sénat de Madagascar.",
        url: `${SITE_URL}/contact`,
        inLanguage: "fr-FR",
        mainEntity: {
            "@type": "Organization",
            name: "Sénat de Madagascar",
            address: {
                "@type": "PostalAddress",
                streetAddress: "BP 806 Anosikely",
                addressLocality: "Antananarivo",
                postalCode: "101",
                addressCountry: "Madagascar",
            },
            telephone: "+261 34 12 01 036",
            email: "contact@senat.mg",
        },
    };

    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={webPageJsonLd} />
            <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                            <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                            <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                        </div>
                        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Contact
                        </h1>
                        <p className="text-white/50 text-lg mt-2 max-w-2xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            N&apos;hésitez pas à nous contacter pour toute question ou demande d&apos;information.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <Card className="bg-white/10 backdrop-blur-sm border-white/10 rounded-2xl shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Envoyez-nous un message
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ContactForm />
                            </CardContent>
                        </Card>

                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Coordonnées
                            </h2>
                            <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl shadow-xl">
                                <CardContent className="space-y-6 p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${EMERALD}22` }}>
                                            <MapPin size={22} style={{ color: EMERALD }} />
                                        </div>
                                        <div>
                                            <p className="text-white/80 font-semibold text-sm">Adresse</p>
                                            <p className="text-white/60 text-sm">BP 806 Anosikely, Antananarivo 101, Madagascar</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${RED}22` }}>
                                            <Mail size={22} style={{ color: RED }} />
                                        </div>
                                        <div>
                                            <p className="text-white/80 font-semibold text-sm">E-mail</p>
                                            <a href="mailto:contact@senat.mg" className="text-red-500 hover:underline">contact@senat.mg</a>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex items-start gap-4 -mx-3 px-3 py-2 rounded-xl transition-colors duration-200 hover:bg-white/[0.04]">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${CYAN}22`, border: `1px solid ${CYAN}33` }}>
                                            <Phone size={22} style={{ color: CYAN }} />
                                        </div>
                                        <div>
                                            <p className="text-white/80 font-semibold text-sm">Téléphone</p>
                                            <p className="text-white/60 text-sm tracking-wide">+261 34...</p>
                                        </div>
                                    </div>
                                    <div className="flex md:hidden items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${CYAN}22` }}>
                                            <Phone size={22} style={{ color: CYAN }} />
                                        </div>
                                        <div>
                                            <p className="text-white/80 font-semibold text-sm">Téléphone</p>
                                            <p className="text-white/60 text-sm">+261 34...</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${EMERALD}22` }}>
                                            <Clock size={22} style={{ color: EMERALD }} />
                                        </div>
                                        <div>
                                            <p className="text-white/80 font-semibold text-sm">Horaires</p>
                                            <p className="text-white/60 text-sm">Lundi - Vendredi : 8h00 - 17h00</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}