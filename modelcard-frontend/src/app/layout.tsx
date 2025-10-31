import type { Metadata } from 'next';
import { Inter, Noto_Sans_KR } from 'next/font/google';
import React from 'react';

import StyledComponentsRegistry from '@/lib/registry';
import ReactQueryProvider from '@/utils/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'AI Studio Models',
  description: 'SURROMIND AI 모델 관리 및 활용을 혁신하는 플랫폼',
  openGraph: {
    images: {
      url: '/openGraphImage.png',
      type: 'website',
      width: '800',
      height: '400',
    },
  },
};

const inter = Inter({
  subsets: ['latin'],
  display: 'block',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--inter',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'block',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--notoSansKr',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.className} ${inter.className}`}>
      <StyledComponentsRegistry>
        <body className={`${notoSansKr.variable} ${inter.variable}`}>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
