import { getMediaBySlug, getMontages } from '@/lib/api';
import { extractMediaItem } from '@/lib/media-mapper';
import VideoPlayer from '@/components/media/VideoPlayer';
import MediaList from '@/components/media/MediaList';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBackIos } from 'react-icons/md';
import { Metadata } from 'next';
import { EMERALD, RED, WHITE } from '@/utils/colors';
import { cleanText } from '@/utils/utility';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getMediaBySlug(slug, 'montage');
    if (!post) return { title: 'Montage introuvable - Sénat de Madagascar' };

    const title = cleanText(post.title.rendered);
    return {
        title: `${title} - Chaîne TV / Radio - Sénat de Madagascar`,
        description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || undefined,
    };
}

export default async function MontageDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getMediaBySlug(slug, 'montage');
    if (!post) {
        notFound();
        return null;
    }

    const montage = extractMediaItem(post, 'montage');
    const cleanTitle = cleanText(montage.title);

    const otherMontages = await getMontages({ per_page: 12 }).catch(() => []);
    const suggestions = otherMontages
        .map((p) => extractMediaItem(p, 'montage'))
        .filter((item) => item.slug !== slug)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6);

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm min-h-screen">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/channel-tv-and-radio"
                    className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 mb-6 transition"
                >
                    <MdArrowBackIos className="w-3 h-3" />
                    Retour à la Chaîne TV / Radio
                </Link>

                <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                    <div className="w-8 rounded-full" style={{ backgroundColor: WHITE }} />
                    <div className="w-8 rounded-full" style={{ backgroundColor: RED }} />
                    <div className="w-8 rounded-full" style={{ backgroundColor: EMERALD }} />
                </div>

                <h1 className="text-white text-3xl font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {cleanTitle}
                </h1>

                <VideoPlayer video={montage} className="w-full" />

                {suggestions.length > 0 && (
                    <section className="mt-12">
                        <MediaList items={suggestions} type="video" title="Autres mises en boîte" />
                    </section>
                )}
            </div>
        </div>
    );
}