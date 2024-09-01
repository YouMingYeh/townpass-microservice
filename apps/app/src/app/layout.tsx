import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import 'ui/styles/globals.css';
import React from 'react';
import { Toaster } from 'ui';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import Providers from './providers';
import Pwa from '../components/layouts/Pwa';

const inter = Roboto({ weight: ['400', '700'], subsets: ['latin'] });

// TODO: update the site metadata
export const metadata: Metadata = {
  title: 'TownPass 城市通微服務',
  description:
    '臺北市政府資訊局為持續推動臺北市成為服務型政府，並推廣主辦單位開源及資料開放政策，特以「台北通」為經驗，運用開放原始碼方式，舉辦「2024臺北程式設計節城市通微服務大黑客松」，盼讓數據驅動生活，實踐更好的使用體驗、介面設計，優化市府的服務。',
  keywords: [
    '臺北秋季程式設計節',
    '黑客松',
    '城市通',
    '臺北市政府資訊局',
    '市政服務',
    '台北通',
    '競賽',
  ],
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'TownPass 城市通微服務',
    description:
      'TownPass 城市通微服務是臺北市政府資訊局為持續推動臺北市成為服務型政府，並推廣主辦單位開源及資料開放政策，特以「台北通」為經驗，運用開放原始碼方式，舉辦「2024臺北程式設計節城市通微服務大黑客松」，盼讓數據驅動生活，實踐更好的使用體驗、介面設計，優化市府的服務。',
    type: 'website',
    url: 'https://example.com',
    siteName: 'TownPass 城市通微服務',
    images: [
      {
        url: 'https://example.com/icon512_rounded.png',
        width: 1200,
        height: 630,
        alt: 'TownPass 城市通微服務',
      },
    ],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  applicationName: 'TownPass 城市通微服務',
  appleWebApp: true,
};

// TODO: Add global providers over here
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en' suppressHydrationWarning>
    <Head>
      <link href='/manifest.json' rel='manifest' />
      <meta content='yes' name='mobile-web-app-capable' />
      <meta content='yes' name='apple-touch-fullscreen' />
      <meta content='TownPass' name='apple-mobile-web-app-title' />
      <meta content='yes' name='apple-mobile-web-app-capable' />
      <meta content='default' name='apple-mobile-web-app-status-bar-style' />
    </Head>

    <body className={inter.className}>
      <Providers>{children}</Providers>
      <Toaster />
      <Pwa />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
