import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getGradeLabel } from '@/lib/utils';
import { DifficultyBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  /** 진행률 (0~100) */
  progress: number;
}

/** 강좌 카드 (목록용) */
export function CourseCard({ course, progress }: CourseCardProps) {
  const started = progress > 0;

  return (
    <Card
      className="group overflow-hidden transition-shadow duration-200 hover:shadow-md"
      style={{ borderLeft: `4px solid ${course.color}` }}
    >
      <CardContent className="flex flex-col gap-4">
        {/* 상단: 아이콘 + 배지 */}
        <div className="flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
            style={{ backgroundColor: course.color + '20' }}
            aria-hidden="true"
          >
            {course.icon}
          </div>
          <DifficultyBadge variant={course.difficulty}>
            {getGradeLabel(course.difficulty)}
          </DifficultyBadge>
        </div>

        {/* 제목 + 설명 */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {course.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {course.description}
          </p>
        </div>

        {/* 진행 바 */}
        <ProgressBar value={progress} showLabel />

        {/* 수업 수 + 버튼 */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {course.lessonCount}개 수업
          </span>
          <Link href={`/courses/${course.id}`}>
            <Button size="sm" variant={started ? 'primary' : 'secondary'}>
              {started ? '계속 학습하기' : '학습 시작하기'}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
