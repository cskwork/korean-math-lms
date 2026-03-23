'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getGradeLabel } from '@/lib/utils';
import { CourseCard } from '@/components/course/CourseCard';
import type { Course } from '@/types';

interface CourseListProps {
  courses: Course[];
  /** 강좌 ID -> 진행률(0~100) */
  userProgress: Record<string, number>;
}

type DifficultyFilter = 'all' | Course['difficulty'];

const FILTER_TABS: { value: DifficultyFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'beginner', label: '기초' },
  { value: 'intermediate', label: '보통' },
  { value: 'advanced', label: '심화' },
];

/** 강좌 목록 (필터 탭 + 반응형 그리드) */
export function CourseList({ courses, userProgress }: CourseListProps) {
  const [filter, setFilter] = useState<DifficultyFilter>('all');

  const filtered =
    filter === 'all'
      ? courses
      : courses.filter((c) => c.difficulty === filter);

  return (
    <section>
      {/* 난이도 필터 탭 */}
      <div
        className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1"
        role="tablist"
        aria-label="난이도 필터"
      >
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={filter === tab.value}
            onClick={() => setFilter(tab.value)}
            className={cn(
              'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              filter === tab.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 강좌 그리드 */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-400">
          해당 난이도의 강좌가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={userProgress[course.id] ?? 0}
            />
          ))}
        </div>
      )}
    </section>
  );
}
