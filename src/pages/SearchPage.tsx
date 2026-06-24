import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-4">Résultats de recherche</h1>
                <p className="text-gray-300 text-lg">
                    Vous avez recherché : <span className="text-cyan-400 font-semibold">"{query}"</span>
                </p>
                <div className="mt-8 text-gray-400">
                    <p>Aucun résultat pour le moment. Les fonctionnalités de recherche avancée seront bientôt disponibles.</p>
                </div>
            </div>
        </div>
    );
}