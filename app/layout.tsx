import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import { business, SITE_URL } from '../data/business';
import { buildJsonLd } from '../data/schema';

const title = `${business.name} | Serviced Apartments in District 1, Ho Chi Minh City`;
const description =
  '10 serviced rooms and apartments with private kitchens at 139/5 Nguyễn Cư Trinh, District 1 (Cầu Ông Lãnh Ward), Saigon. Nightly from 1,500,000 VND, monthly from 13,000,000 VND. Airport pick-up on request. Book direct for 10% off.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${business.name}` },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: business.name,
    title,
    description,
    locale: 'en_US',
    images: [{ url: '/images/apartment_balcony/img_1183.jpg', alt: `${business.name}, apartment with balcony` }],
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c') }}
        />
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
