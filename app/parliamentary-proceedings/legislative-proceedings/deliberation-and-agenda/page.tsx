import { getPostsByCategory } from "@/lib/api";
import { redirect } from "next/navigation";

const CAT_ORDRE_JOUR = 11;
const CAT_DELIBERATION = 53;

export default async function DeliberationPage() {
    const [ordreJourPosts, deliberationPosts] = await Promise.all([
        getPostsByCategory(CAT_ORDRE_JOUR, {
            per_page: 100,
            _embed: true,
        }).catch(() => []),
        getPostsByCategory(CAT_DELIBERATION, {
            per_page: 1,
            _embed: true,
        }).catch(() => []),
    ]);

    const allPosts = [...ordreJourPosts];
    const deliberationSlug = "deliberation";
    const hasDeliberation = allPosts.some((p) => p.slug === deliberationSlug);
    if (deliberationPosts.length > 0 && !hasDeliberation) {
        allPosts.push(deliberationPosts[0]);
    }

    allPosts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const postsWithTable = allPosts.filter((post) =>
        post.content.rendered.includes("<table")
    );

    if (postsWithTable.length === 0) {
        // Si aucun tableau, on peut afficher un message ou rediriger vers la page des travaux législatifs
        redirect("/parliamentary-proceedings/legislative-proceedings");
    }

    // Rediriger vers le premier article (le plus ancien)
    const firstPost = postsWithTable[0];
    redirect(`/parliamentary-proceedings/legislative-proceedings/deliberation-and-agenda/${firstPost.slug}`);
}