import Link from 'next/link';
import { ArrowRight, BookOpen, Flame, Target, Zap } from 'lucide-react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { AchievementBadges } from '@/components/dashboard/AchievementBadges';
import { mockUser, recentActivity, dashboardStats } from '@/data/user';
import { courses } from '@/data/courses';
import { getLessonsByCourse } from '@/data/lessons';

/** 다음 학습할 수업 목록을 계산한다. */
function getNextLessons() {
  const nextItems: { courseTitle: string; courseIcon: string; lessonId: string; lessonTitle: string; courseId: string }[] = [];

  for (const course of courses) {
    const courseLessons = getLessonsByCourse(course.id);
    const nextLesson = courseLessons.find(
      (l) => !mockUser.completedLessons.includes(l.id),
    );
    if (nextLesson) {
      nextItems.push({
        courseTitle: course.title,
        courseIcon: course.icon,
        lessonId: nextLesson.id,
        lessonTitle: nextLesson.title,
        courseId: course.id,
      });
    }
  }

  return nextItems.slice(0, 3);
}

/** 대시보드 페이지 (서버 컴포넌트) */
export default function DashboardPage() {
  const nextLessons = getNextLessons();
  /* 일일 XP 목표 계산 */
  const dailyXpTarget = 200;
  const todayXp = dashboardStats.weeklyXp[dashboardStats.weeklyXp.length - 1] ?? 0;
  const dailyProgress = Math.min(100, Math.round((todayXp / dailyXpTarget) * 100));

  return (
    <div className="space-y-8">
      {/* 환영 인사 + 일일 목표 */}
      <section className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* 왼쪽: 사용자 인사 */}
        <div className="flex items-center gap-4">
          {/* 아바타 + 애니메이션 링 */}
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 opacity-75 blur-[2px]" aria-hidden="true" />
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 opacity-80" aria-hidden="true" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
              {mockUser.avatar}
            </span>
            {/* 레벨 배지 */}
            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-[10px] font-bold text-white shadow-md ring-2 ring-white">
              {mockUser.level}
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              안녕하세요, {mockUser.name}님!
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <p className="text-gray-500">
                오늘도 수학의 달인과 함께 즐거운 학습을 시작해볼까요?
              </p>
              {/* 연속 학습 뱃지 */}
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-100 to-red-50 px-2.5 py-0.5 text-xs font-semibold text-orange-600">
                <Flame className="h-3.5 w-3.5 animate-fire" aria-hidden="true" />
                {mockUser.streak}일 연속
              </span>
            </div>
          </div>
        </div>

        {/* 오른쪽: 오늘의 목표 카드 */}
        <div className="w-full flex-shrink-0 rounded-2xl border border-blue-100/60 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 shadow-sm lg:w-72">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <Target className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">오늘의 목표</h3>
          </div>
          <div className="mb-2 flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-blue-600">{todayXp}</span>
              <span className="text-sm text-gray-400">/ {dailyXpTarget} XP</span>
            </div>
            <span className="flex items-center gap-0.5 text-xs font-medium text-blue-500">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              {dailyProgress}%
            </span>
          </div>
          {/* 미니 프로그레스 바 */}
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-blue-100/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-700"
              style={{ width: `${dailyProgress}%` }}
            >
              <div className="progress-shimmer h-full w-full rounded-full" />
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            {dailyProgress >= 100
              ? '목표 달성! 대단해요!'
              : `${dailyXpTarget - todayXp} XP 더 모으면 달성!`}
          </p>
        </div>
      </section>

      {/* 통계 카드 */}
      <StatsCards stats={dashboardStats} />

      {/* 2열: 주간 차트 + 배지 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ProgressChart weeklyXp={dashboardStats.weeklyXp} />
        <AchievementBadges badges={mockUser.badges} />
      </div>

      {/* 최근 활동 */}
      <RecentActivity activities={recentActivity} />

      {/* 빠른 접근: 다음 수업 */}
      {nextLessons.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            이어서 학습하기
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nextLessons.map((item) => (
              <Link
                key={item.lessonId}
                href={`/courses/${item.courseId}/lessons/${item.lessonId}`}
                className="card-hover group flex items-center gap-4 rounded-2xl border border-gray-100/60 bg-white p-5 shadow-sm transition-all"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-2xl shadow-sm transition-transform group-hover:scale-105">
                  {item.courseIcon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-400">{item.courseTitle}</p>
                  <p className="truncate font-semibold text-gray-900">
                    {item.lessonTitle}
                  </p>
                </div>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 transition-colors group-hover:bg-blue-100">
                  <ArrowRight
                    className="h-4 w-4 text-blue-500 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
