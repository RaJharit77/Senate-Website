import type { Metadata } from 'next';
import { Poppins, Inter, Geist } from 'next/font/google';
import '../styles/globals.css';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { FloatingSocialBar } from '@/components/navigation/common/FloatingSocialBar';
import Chatbot from '@/components/chatbot/Chatbot';
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next"
import JsonLd from '@/components/JsonLd';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

const inter = Inter({ subsets: ['latin'] });

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const siteName = 'Antenimierandoholona - Site web du Sénat de Madagascar';
const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://senat-de-madagascar.vercel.app';
const defaultDescription = 'Site officiel du Sénat de Madagascar. Retrouvez les actualités, les travaux parlementaires, l\'histoire et les institutions de la République.';

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  description: defaultDescription,
  icons: {
    icon: '/ico/favicon.jpeg',
    shortcut: '/ico/favicon.jpeg',
    apple: '/ico/favicon.jpeg',
  },
  openGraph: {
    title: siteName,
    description: defaultDescription,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription,
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={cn("h-full", "antialiased", poppins.className, inter.className, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Analytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Chatbot />
        <FloatingSocialBar />
        <Footer />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'GovernmentOrganization',
            name: 'Sénat de Madagascar',
            url: 'https://senat-de-madagascar.vercel.app',
            logo: 'https://senat.mg/wp-content/themes/senat13/images/logo-senat.png',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+261 34 12 01 036',
              email: 'contact@senat.mg',
              contactType: 'Service client',
              availableLanguage: ['French', 'Malagasy'],
            },
            sameAs: [
              'https://www.facebook.com/senat.mg',
              'https://www.youtube.com/@antenimierandoholona',
              'https://wa.me/261341201036'
            ],
          }}
        />
      </body>
    </html>
  );
}
