'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Clock, Star } from 'lucide-react';
import { LessonContent } from '@/components/lesson/LessonContent';
import { LessonNav } from '@/components/lesson/LessonNav';
import { getCourseById } from '@/data/courses';
import { getLessonById, getLessonsByCourse } from '@/data/lessons';
import { mockUser } from '@/data/user';

interface LessonPageProps {
  params: { courseId: string; lessonId: string };
}

/** 수업 상세 페이지 (클라이언트 컴포넌트) */
export default function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = params;
  const course = getCourseById(courseId);
  const lesson = getLessonById(lessonId);

  const [isCompleted, setIsCompleted] = useState(
    mockUser.completedLessons.includes(lessonId),
  );

  /* 코스 또는 수업을 찾을 수 없는 경우 */
  if (!course || !lesson || lesson.courseId !== courseId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-5xl">📭</p>
        <h1 className="mt-4 text-xl font-bold text-gray-900">
          수업을 찾을 수 없습니다
        </h1>
        <p className="mt-2 text-gray-500">
          요청하신 수업이 존재하지 않거나 삭제되었습니다.
        </p>
        <Link
          href={`/courses/${courseId}`}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          강좌로 돌아가기
        </Link>
      </div>
    );
  }

  const courseLessons = getLessonsByCourse(courseId);
  const currentIndex = courseLessons.findIndex((l) => l.id === lessonId);

  /** 수업 완료 처리 */
  function handleComplete() {
    setIsCompleted(true);
  }

  return (
    <div className="space-y-6">
      {/* 브레드크럼 */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
        <Link href="/courses" className="hover:text-blue-600">
          강좌
        </Link>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <Link
          href={`/courses/${courseId}`}
          className="hover:text-blue-600"
        >
          {course.title}
        </Link>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <span className="text-gray-700">{lesson.title}</span>
      </nav>

      {/* 수업 메타 정보 */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl bg-white px-5 py-3 shadow-sm">
        <span className="text-2xl">{course.icon}</span>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-400">{course.title}</p>
          <h1 className="text-lg font-bold text-gray-900">{lesson.title}</h1>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {lesson.estimatedMinutes}분
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            {lesson.xpReward} XP
          </span>
        </div>

        {isCompleted && (
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            완료됨
          </span>
        )}
      </div>

      {/* 수업 콘텐츠 */}
      <LessonContent lesson={lesson} />

      {/* 네비게이션 (이전/다음 + 완료) */}
      <LessonNav
        currentIndex={currentIndex >= 0 ? currentIndex : 0}
        totalLessons={courseLessons.length}
        onComplete={handleComplete}
        xpReward={lesson.xpReward}
        lessonId={lesson.id}
        courseId={courseId}
      />
    </div>
  );
}
