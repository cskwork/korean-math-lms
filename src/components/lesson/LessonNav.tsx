'use client';

import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface LessonNavProps {
  /** 현재 수업 인덱스 (0-based) */
  currentIndex: number;
  /** 전체 수업 수 */
  totalLessons: number;
  /** 수업 완료 콜백 */
  onComplete: () => void;
  /** 완료 시 획득 XP */
  xpReward: number;
  /** 현재 수업 ID */
  lessonId: string;
  /** 현재 코스 ID */
  courseId: string;
}

/** 수업 네비게이션 (이전/다음 + 완료 버튼) */
export function LessonNav({
  currentIndex,
  totalLessons,
  onComplete,
  xpReward,
  lessonId,
  courseId,
}: LessonNavProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalLessons - 1;

  return (
    <nav
      className="mt-10 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between"
      aria-label="수업 네비게이션"
    >
      {/* 이전 버튼 */}
      <div>
        {!isFirst ? (
          <Link href={`/courses/${courseId}/lessons/${currentIndex - 1}`}>
            <Button variant="ghost" size="md">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              이전 수업
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* 중앙: 위치 표시 + 완료 */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-gray-400">
          {currentIndex + 1} / {totalLessons}
        </span>
        <Button
          variant="success"
          size="lg"
          onClick={onComplete}
          className="gap-2"
        >
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          수업 완료
          <span className="flex items-center gap-0.5 rounded-full bg-white/20 px-2 py-0.5 text-xs">
            <Star className="h-3 w-3" aria-hidden="true" />
            +{xpReward} XP
          </span>
        </Button>
      </div>

      {/* 다음 버튼 */}
      <div>
        {!isLast ? (
          <Link href={`/courses/${courseId}/lessons/${currentIndex + 1}`}>
            <Button variant="ghost" size="md">
              다음 수업
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
