import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '수학의 달인 - 중학교 수학 학습 플랫폼',
  description:
    '중학교 1학년 수학을 체계적으로 학습할 수 있는 온라인 학습 관리 시스템입니다. 정수, 방정식, 좌표, 도형, 통계 등 교과과정에 맞춘 강좌를 제공합니다.',
  keywords: ['중학교 수학', '수학 학습', 'LMS', '온라인 수학', '수학의 달인'],
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header
          userName="김수학"
          userLevel={7}
          userXp={2450}
          userAvatar="🎓"
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
