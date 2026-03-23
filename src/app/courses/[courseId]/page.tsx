import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Star,
  FileQuestion,
} from 'lucide-react';
import { courses, getCourseById } from '@/data/courses';
import { getLessonsByCourse } from '@/data/lessons';
import { getQuizzesByCourse } from '@/data/quizzes';
import { mockUser } from '@/data/user';
import { DifficultyBadge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getGradeLabel } from '@/lib/utils';

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

/** 정적 경로 생성 */
export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

/** 코스 상세 페이지 (서버 컴포넌트) */
export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { courseId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

  const courseLessons = getLessonsByCourse(courseId);
  const courseQuizzes = getQuizzesByCourse(courseId);
  const progress = mockUser.courseProgress[courseId] ?? 0;

  return (
    <div className="space-y-8">
      {/* 브레드크럼 */}
      <nav className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/courses" className="hover:text-primary-600">
          강좌 목록
        </Link>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <span className="text-gray-700">{course.title}</span>
      </nav>

      {/* 코스 헤더 */}
      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div
          className="px-6 py-8 text-white"
          style={{ backgroundColor: course.color }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="text-5xl">{course.icon}</span>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold sm:text-3xl">
                  {course.title}
                </h1>
                <DifficultyBadge variant={course.difficulty}>
                  {getGradeLabel(course.difficulty)}
                </DifficultyBadge>
              </div>
              <p className="max-w-2xl text-sm text-white/80">
                {course.description}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-500">학습 진행률</span>
            <span className="font-bold text-primary-600">{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>
      </section>

      {/* 수업 목록 */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
          <BookOpen className="h-5 w-5 text-primary-500" aria-hidden="true" />
          수업 목록
        </h2>

        <ol className="space-y-3">
          {courseLessons.map((lesson, index) => {
            const isCompleted = mockUser.completedLessons.includes(lesson.id);

            return (
              <li key={lesson.id}>
                <Link
                  href={`/courses/${courseId}/lessons/${lesson.id}`}
                  className="card-hover flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* 순서 번호 / 완료 체크 */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    {isCompleted ? (
                      <CheckCircle2
                        className="h-7 w-7 text-green-500"
                        aria-label="완료됨"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* 수업 정보 */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-medium ${
                        isCompleted ? 'text-gray-400' : 'text-gray-900'
                      }`}
                    >
                      {lesson.title}
                    </p>
                    <p className="truncate text-sm text-gray-400">
                      {lesson.description}
                    </p>
                  </div>

                  {/* 메타 정보 */}
                  <div className="hidden shrink-0 items-center gap-4 text-xs text-gray-400 sm:flex">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {lesson.estimatedMinutes}분
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" aria-hidden="true" />
                      {lesson.xpReward} XP
                    </span>
                  </div>

                  <ChevronRight
                    className="h-5 w-5 shrink-0 text-gray-300"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* 퀴즈 섹션 */}
      {courseQuizzes.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <FileQuestion className="h-5 w-5 text-green-500" aria-hidden="true" />
            퀴즈
          </h2>

          <div className="space-y-3">
            {courseQuizzes.map((quiz) => {
              const isCompleted = mockUser.completedQuizzes.includes(quiz.id);

              return (
                <Link
                  key={quiz.id}
                  href={`/quiz/${quiz.id}`}
                  className="card-hover flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-lg">
                    {isCompleted ? (
                      <CheckCircle2
                        className="h-6 w-6 text-green-500"
                        aria-label="완료됨"
                      />
                    ) : (
                      <FileQuestion
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900">{quiz.title}</p>
                    <p className="text-sm text-gray-400">
                      {quiz.questions.length}문제 | 합격 기준 {quiz.passingScore}
                      점 | {quiz.xpReward} XP
                    </p>
                  </div>

                  <ChevronRight
                    className="h-5 w-5 shrink-0 text-gray-300"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
