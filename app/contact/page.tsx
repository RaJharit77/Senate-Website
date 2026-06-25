import { Mail, MapPin, Phone, Clock } from "lucide-react";

const GREEN = "#5CE65C";
const RED = "#FF2C2C";
const CYAN = "#5bc8de";
const GREENDARK = "#008000";

export default function ContactPage() {
    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: "#ffffff" }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: GREENDARK }} />
                    </div>
                    <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Contact
                    </h1>
                    <p className="text-white/50 text-lg mt-2 max-w-2xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
                        N&apos;hésitez pas à nous contacter pour toute question ou demande d&apos;information.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Envoyez-nous un message
                        </h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-white/80 text-sm font-semibold mb-1">Votre nom</label>
                                <input type="text" className="w-full rounded-lg border border-white/20 px-4 py-3 bg-white/20 text-white placeholder:text-white/50" placeholder="Nom complet" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white/80 text-sm font-semibold mb-1">Votre e-mail</label>
                                <input type="email" className="w-full rounded-lg border border-white/20 px-4 py-3 bg-white/20 text-white placeholder:text-white/50" placeholder="email@exemple.com" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white/80 text-sm font-semibold mb-1">Objet</label>
                                <input type="text" className="w-full rounded-lg border border-white/20 px-4 py-3 bg-white/20 text-white placeholder:text-white/50" placeholder="Sujet de votre message" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-white/80 text-sm font-semibold mb-1">Votre message</label>
                                <textarea className="w-full rounded-lg border border-white/20 px-4 py-3 bg-white/20 text-white placeholder:text-white/50 min-h-[120px]" placeholder="Écrivez votre message ici..." />
                            </div>
                            <button type="submit" className="w-full py-3 rounded-lg bg-[#008000] text-white font-semibold transition-all hover:opacity-80 hover:scale-105">
                                Envoyer
                            </button>
                        </form>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Coordonnées
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${GREEN}22` }}>
                                    <MapPin size={22} style={{ color: GREEN }} />
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
                                    <a href="mailto:contact@senat.mg" className="text-red-500">contact@senat.mg</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${CYAN}22` }}>
                                    <Phone size={22} style={{ color: CYAN }} />
                                </div>
                                <div>
                                    <p className="text-white/80 font-semibold text-sm">Téléphone</p>
                                    <p className="text-white/60 text-sm">+261 34 12 01 036</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${GREEN}22` }}>
                                    <Clock size={22} style={{ color: GREEN }} />
                                </div>
                                <div>
                                    <p className="text-white/80 font-semibold text-sm">Horaires</p>
                                    <p className="text-white/60 text-sm">Lundi - Vendredi : 8h00 - 17h00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}