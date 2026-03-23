'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Flame,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';

export interface SidebarCourse {
  id: string;
  title: string;
  icon: string;
  progress: number;
}

interface SidebarProps {
  /** 코스 목록 */
  courses?: SidebarCourse[];
  /** 연속 학습일 수 */
  streak?: number;
  /** 현재 활성 코스 ID */
  activeCourseId?: string;
}

/** 좌측 사이드바 (데스크톱 전용) */
export function Sidebar({
  courses = [],
  streak = 0,
  activeCourseId,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'hidden h-[calc(100vh-4rem)] flex-shrink-0 border-r border-gray-100 bg-white transition-all duration-300 lg:block',
        collapsed ? 'w-16' : 'w-64',
      )}
      aria-label="사이드바 네비게이션"
    >
      <div className="flex h-full flex-col">
        {/* 접기/펼치기 토글 */}
        <div className="flex justify-end px-2 py-2">
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* 코스 네비게이션 */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-2" aria-label="강좌 목록">
          {!collapsed && (
            <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              강좌
            </h2>
          )}
          {courses.map((course) => {
            const isActive = course.id === activeCourseId;
            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                )}
                title={collapsed ? course.title : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-base',
                    isActive ? 'bg-primary-100' : 'bg-gray-100 group-hover:bg-gray-200',
                  )}
                  aria-hidden="true"
                >
                  {course.icon}
                </span>
                {!collapsed && (
                  <div className="min-w-0 flex-1">
                    <p className="truncate">{course.title}</p>
                    <ProgressBar
                      value={course.progress}
                      height="h-1"
                      color={isActive ? 'bg-primary-500' : 'bg-gray-300'}
                      className="mt-1"
                    />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 나의 학습 섹션 */}
        <div className="border-t border-gray-100 px-3 py-4">
          {!collapsed ? (
            <div>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                나의 학습
              </h2>
              <div className="flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2">
                <Flame className="h-5 w-5 text-orange-500" aria-hidden="true" />
                <div className="text-sm">
                  <span className="font-bold text-orange-600">{streak}일</span>
                  <span className="text-gray-500"> 연속 학습</span>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col items-center gap-1"
              title={`${streak}일 연속 학습`}
            >
              <Flame className="h-5 w-5 text-orange-500" aria-hidden="true" />
              <span className="text-xs font-bold text-orange-600">{streak}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
