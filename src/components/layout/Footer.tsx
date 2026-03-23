import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

/** 하단 푸터 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* 브랜드 */}
          <div className="flex items-center gap-2 text-gray-500">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-medium">
              수학의 달인 &mdash; 중학교 수학 학습 플랫폼
            </span>
          </div>

          {/* 링크 */}
          <nav className="flex gap-6 text-sm text-gray-400" aria-label="하단 링크">
            <Link href="/terms" className="hover:text-gray-600 transition-colors">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/support" className="hover:text-gray-600 transition-colors">
              고객센터
            </Link>
          </nav>
        </div>

        <p className="mt-4 text-center text-xs text-gray-300 sm:text-left">
          &copy; {currentYear} 수학의 달인. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
