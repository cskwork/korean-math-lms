'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Home,
  LayoutDashboard,
  BookOpen,
  UserCircle,
  Menu,
  X,
  Star,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatXp } from '@/lib/utils';

interface HeaderProps {
  /** 사용자 이름 */
  userName?: string;
  /** 사용자 레벨 */
  userLevel?: number;
  /** 총 경험치 */
  userXp?: number;
  /** 사용자 아바타 이모지 */
  userAvatar?: string;
}

const NAV_LINKS = [
  { href: '/', label: '홈', icon: Home },
  { href: '/dashboard', label: '대시보드', icon: LayoutDashboard },
  { href: '/courses', label: '강좌', icon: BookOpen },
  { href: '/profile', label: '내 프로필', icon: UserCircle },
] as const;

/** 상단 네비게이션 바 -- 프로덕션 수준 */
export function Header({
  userName = '학생',
  userLevel = 1,
  userXp = 0,
  userAvatar = '🎓',
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* 스크롤 감지 -> 글래스모피즘 강화 */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-gray-200/60 bg-white/70 shadow-[0_1px_12px_rgba(0,0,0,0.04)] backdrop-blur-xl'
          : 'border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 로고 */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label="수학의 달인 홈으로 이동"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
            <GraduationCap className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            수학의 달인
          </span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex md:items-center md:gap-1" aria-label="주 메뉴">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-primary-600"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        {/* 사용자 영역 */}
        <div className="hidden items-center gap-3 md:flex">
          {/* XP 표시 - 프로그레스 링 포함 */}
          <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 px-3.5 py-1.5 text-sm font-semibold text-amber-600 shadow-sm">
            <Zap className="h-4 w-4 text-amber-500" aria-hidden="true" />
            <span>{formatXp(userXp)} XP</span>
          </div>

          {/* 레벨 배지 */}
          <div className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
            Lv.{userLevel}
          </div>

          {/* 아바타 */}
          <div className="flex items-center gap-2">
            <div className="relative">
              {/* 아바타 링 배경 */}
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 opacity-75" aria-hidden="true" />
              <span
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg"
                aria-hidden="true"
              >
                {userAvatar}
              </span>
            </div>
            <div className="text-sm leading-tight">
              <p className="font-semibold text-gray-900">{userName}</p>
            </div>
          </div>
        </div>

        {/* 모바일 햄버거 */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-50 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* 모바일 메뉴 - 슬라이드 인 */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 z-50 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        >
          {/* 오버레이 */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        </div>
      )}
      <nav
        id="mobile-nav"
        className={cn(
          'fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 border-l border-gray-100 bg-white/95 backdrop-blur-xl transition-transform duration-300 ease-out md:hidden',
          mobileOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full',
        )}
        aria-label="모바일 메뉴"
      >
        <div className="flex flex-col gap-1 p-4">
          {/* 모바일 사용자 정보 */}
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 opacity-75" aria-hidden="true" />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl">
                {userAvatar}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{userName}</p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  Lv.{userLevel}
                </span>
                <span className="flex items-center gap-0.5 text-xs font-medium text-amber-600">
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  {formatXp(userXp)} XP
                </span>
              </div>
            </div>
          </div>

          {/* 내비게이션 링크 */}
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-primary-600"
              onClick={() => setMobileOpen(false)}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
