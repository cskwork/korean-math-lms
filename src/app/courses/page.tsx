import { CourseList } from '@/components/course/CourseList';
import { courses } from '@/data/courses';
import { mockUser } from '@/data/user';
import { calculateProgress } from '@/lib/utils';

/** 강좌 목록 페이지 (서버 컴포넌트) */
export default function CoursesPage() {
  const completedCourses = Object.values(mockUser.courseProgress).filter(
    (p) => p === 100,
  ).length;
  const overallProgress = calculateProgress(completedCourses, courses.length);

  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <section>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          강좌 목록
        </h1>
        <p className="mt-1 text-gray-500">
          중학교 1학년 수학 교과과정에 맞춘 강좌를 살펴보세요.
        </p>
      </section>

      {/* 전체 진행률 */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">전체 학습 진행률</span>
          <span className="font-bold text-blue-600">{overallProgress}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className="animate-progress h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
            style={
              { '--progress-width': `${overallProgress}%` } as React.CSSProperties
            }
          />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          {completedCourses}개 강좌 완료 / 총 {courses.length}개
        </p>
      </div>

      {/* 강좌 리스트 */}
      <CourseList courses={courses} userProgress={mockUser.courseProgress} />
    </div>
  );
}
