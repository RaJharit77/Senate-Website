import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import '../styles/globals.css';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Antenimierandoholona - Site web du Sénat de Madagasar',
  description: 'Site officiel du Sénat de Madagascar',
  icons: {
    icon: '/ico/favicon.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${poppins.className} ${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}