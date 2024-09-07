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
  title: '市民互助',
  description:
    '市民互助是台北程式通通微服務的一部分，這是一個開源的項目，旨在幫助市民藉助社區的力量互相幫助，即時解決問題。',
  keywords: [
    '臺北秋季程式設計節',
    '黑客松',
    '城市通',
    '臺北市政府資訊局',
    '市政服務',
    '台北通',
    '競賽',
    '開源',
    '資料開放',
    '數據驅動生活',
    '使用體驗',
    '介面設計',
    '市府服務',
    '市民互助',
  ],
  metadataBase: new URL('https://townpass-microservice.vercel.app'),
  openGraph: {
    title: '市民互助',
    description:
      '市民互助是台北程式通通微服務的一部分，這是一個開源的項目，旨在幫助市民藉助社區的力量互相幫助，即時解決問題。',
    type: 'website',
    url: 'https://townpass-microservice.vercel.app',
    siteName: '市民互助',
    images: [
      {
        url: 'https://townpass-microservice.vercel.app/icon512_rounded.png',
        width: 1200,
        height: 630,
        alt: '市民互助',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  applicationName: '市民互助',
  appleWebApp: true,
};

// TODO: Add global providers over here
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en' suppressHydrationWarning>
    <Head>
      <meta content='yes' name='mobile-web-app-capable' />
      <meta content='yes' name='apple-touch-fullscreen' />
      <meta content='TownPass' name='apple-mobile-web-app-title' />
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
