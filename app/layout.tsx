import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import { cookies } from 'next/headers';
import type { Language } from './dictionaries';

export const metadata: Metadata = {
  title: 'My Stay & Apartment',
  description: 'A luxury boutique hotel experience offering 10 premium rooms and apartments for international guests.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as Language;

  return (
    <html lang={locale}>
      <body>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0FSJ5LL6VD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0FSJ5LL6VD');
            gtag('config', 'AW-18103018899');
          `}
        </Script>

        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
