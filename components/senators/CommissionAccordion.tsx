"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Commission } from "@/types/senatorsType";

export default function CommissionAccordion({ commissions }: { commissions: Commission[] }) {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <div className="space-y-3">
            {commissions.map((commission, idx) => {
                const isOpen = openIdx === idx;
                return (
                    <div key={idx} className="rounded-lg overflow-hidden bg-white/5 border border-white/10">
                        <button
                            onClick={() => setOpenIdx(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/10 transition-colors"
                        >
                            <span className="text-white font-semibold font-poppins">{commission.title}</span>
                            <ChevronRight
                                className={`w-4 h-4 text-white/50 transition-transform ${isOpen ? "rotate-90" : ""}`}
                            />
                        </button>
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <CardContent className="p-4 pt-0">
                                        <ul className="space-y-2">
                                            {commission.members.map((member, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                                                    <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                                                    <span>
                                                        {member.role && <strong className="text-cyan-300">{member.role} : </strong>}
                                                        {member.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
            {commissions.length === 0 && (
                <p className="text-white/40 italic text-center py-12">Aucune commission trouvée.</p>
            )}
        </div>
    );
}