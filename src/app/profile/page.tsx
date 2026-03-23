import {
  Award,
  BookOpen,
  Flame,
  Star,
  Target,
  TrendingUp,
  Lock,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockUser, recentActivity, dashboardStats } from '@/data/user';
import { calculateProgress, formatXp } from '@/lib/utils';

/** 통계 아이템 정의 */
const statsItems = [
  {
    label: '레벨',
    value: `Lv.${mockUser.level}`,
    icon: TrendingUp,
    bgColor: 'bg-primary-50',
    iconColor: 'text-primary-500',
    valueColor: 'text-primary-700',
    ringColor: 'ring-primary-200',
  },
  {
    label: '총 경험치',
    value: formatXp(mockUser.xp),
    icon: Star,
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-500',
    valueColor: 'text-amber-700',
    ringColor: 'ring-amber-200',
  },
  {
    label: '연속 학습',
    value: `${mockUser.streak}일`,
    icon: Flame,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
    valueColor: 'text-orange-700',
    ringColor: 'ring-orange-200',
  },
  {
    label: '완료 수업',
    value: `${mockUser.completedLessons.length}개`,
    icon: BookOpen,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    valueColor: 'text-green-700',
    ringColor: 'ring-green-200',
  },
  {
    label: '퀴즈 평균',
    value: `${dashboardStats.averageScore}점`,
    icon: Target,
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-500',
    valueColor: 'text-rose-700',
    ringColor: 'ring-rose-200',
  },
  {
    label: '획득 배지',
    value: `${mockUser.badges.filter((b) => b.earnedAt).length}개`,
    icon: Award,
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-500',
    valueColor: 'text-pink-700',
    ringColor: 'ring-pink-200',
  },
] as const;

/** 활동 유형별 스타일 매핑 */
function getActivityStyle(type: string): { icon: string; dotColor: string } {
  switch (type) {
    case 'lesson_complete':
      return { icon: '\u2713', dotColor: 'bg-primary-400' };
    case 'quiz_complete':
      return { icon: '\u2605', dotColor: 'bg-green-400' };
    case 'badge_earned':
      return { icon: '\u25C6', dotColor: 'bg-amber-400' };
    case 'streak':
      return { icon: '\u2736', dotColor: 'bg-orange-400' };
    default:
      return { icon: '\u2022', dotColor: 'bg-gray-400' };
  }
}

/** 프로필 페이지 (서버 컴포넌트) */
export default function ProfilePage() {
  const xpProgress = calculateProgress(mockUser.xp, mockUser.xpToNext);
  const earnedBadges = mockUser.badges.filter((b) => b.earnedAt);
  const unearnedBadges = mockUser.badges.filter((b) => !b.earnedAt);
  const totalBadges = mockUser.badges.length;

  return (
    <div className="space-y-8">
      {/* ====== 프로필 카드 ====== */}
      <section className="overflow-hidden rounded-2xl bg-white shadow-md">
        {/* 그래디언트 배경 헤더 */}
        <div className="relative bg-gradient-to-r from-primary-500 to-primary-700 px-6 pb-20 pt-8">
          <div className="dot-pattern absolute inset-0" />
          <h1 className="relative text-xl font-bold text-white sm:text-2xl">
            내 프로필
          </h1>
        </div>

        <div className="-mt-14 px-6 pb-6">
          <div className="flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
            {/* 아바타 — 회전 그래디언트 링 */}
            <div className="relative flex-shrink-0">
              {/* 회전하는 그래디언트 보더 */}
              <div
                className="animate-gradient-ring absolute inset-0 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, #059669, #34d399, #6ee7b7, #f59e0b, #059669)',
                  padding: '4px',
                  width: '108px',
                  height: '108px',
                  top: '-4px',
                  left: '-4px',
                  WebkitMask:
                    'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
                  mask:
                    'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
                }}
                aria-hidden="true"
              />
              <div className="relative flex h-[100px] w-[100px] items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary-50 to-primary-100/50 text-5xl shadow-lg">
                {mockUser.avatar}
              </div>
            </div>

            <div className="mt-3 text-center sm:mt-0 sm:pb-1 sm:text-left">
              <h2 className="text-xl font-bold text-gray-900">
                {mockUser.name}
              </h2>
              <p className="text-sm text-gray-500">
                중학교 {mockUser.grade}학년
              </p>
              {/* 레벨 배지 */}
              <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-3 py-1 text-xs font-bold text-white shadow-sm">
                <Star className="h-3 w-3" aria-hidden="true" />
                레벨 {mockUser.level}
              </span>
            </div>
          </div>

          {/* XP 프로그레스 바 */}
          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <div className="mb-2.5 flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-700">
                경험치 진행도
              </span>
              <span className="text-xs font-medium text-gray-400">
                {formatXp(mockUser.xp)} / {formatXp(mockUser.xpToNext)} XP
              </span>
            </div>
            <div className="relative h-4 overflow-hidden rounded-full bg-gray-200">
              <div
                className="animate-progress h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-700"
                style={
                  { '--progress-width': `${xpProgress}%` } as React.CSSProperties
                }
              />
              <div
                className="progress-shimmer absolute inset-0 h-full rounded-full"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <p className="mt-1.5 text-right text-xs text-gray-400">
              다음 레벨까지{' '}
              <span className="font-semibold text-primary-600">
                {formatXp(mockUser.xpToNext - mockUser.xp)} XP
              </span>{' '}
              필요
            </p>
          </div>
        </div>
      </section>

      {/* ====== 학습 통계 ====== */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary-600" aria-hidden="true" />
          <h2 className="text-lg font-bold text-gray-900">학습 통계</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {statsItems.map((item) => (
            <div
              key={item.label}
              className={cn(
                'card-hover rounded-xl p-4 text-center ring-1',
                item.bgColor,
                item.ringColor,
              )}
            >
              <div
                className={cn(
                  'mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white/70',
                  item.iconColor,
                )}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className={cn('text-xl font-extrabold', item.valueColor)}>
                {item.value}
              </p>
              <p className="mt-0.5 text-xs text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====== 배지 컬렉션 ====== */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" aria-hidden="true" />
            <h2 className="text-lg font-bold text-gray-900">배지 컬렉션</h2>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 ring-1 ring-amber-200">
            {earnedBadges.length}/{totalBadges} 배지 획득
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {/* 획득한 배지 */}
          {earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="group relative animate-badge-glow card-hover flex flex-col items-center rounded-xl bg-white p-5 shadow-sm ring-1 ring-amber-200"
            >
              <span className="mb-2 text-4xl">{badge.icon}</span>
              <p className="text-sm font-bold text-gray-900">{badge.name}</p>
              <p className="mt-1 text-center text-xs text-gray-400 leading-relaxed">
                {badge.description}
              </p>
              {badge.earnedAt && (
                <p className="mt-2 text-[10px] text-gray-300">
                  {badge.earnedAt} 획득
                </p>
              )}
              {/* 호버 툴팁 */}
              <div
                className={cn(
                  'pointer-events-none absolute -top-2 left-1/2 z-10 w-44 -translate-x-1/2 -translate-y-full',
                  'rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg',
                  'opacity-0 transition-opacity group-hover:opacity-100',
                )}
                role="tooltip"
              >
                <p className="font-semibold">{badge.name}</p>
                <p className="mt-0.5 text-gray-300">{badge.description}</p>
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>
          ))}

          {/* 잠긴 배지 */}
          {unearnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="group relative flex flex-col items-center rounded-xl bg-gray-50 p-5 ring-1 ring-gray-200 opacity-60"
            >
              {/* 잠금 아이콘 오버레이 */}
              <div className="relative mb-2">
                <span className="text-4xl grayscale blur-[1px]" aria-hidden="true">
                  {badge.icon}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
              <p className="text-sm font-bold text-gray-400">???</p>
              <p className="mt-1 text-center text-xs text-gray-300 leading-relaxed">
                {badge.description}
              </p>
              {/* 호버 툴팁 */}
              <div
                className={cn(
                  'pointer-events-none absolute -top-2 left-1/2 z-10 w-44 -translate-x-1/2 -translate-y-full',
                  'rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg',
                  'opacity-0 transition-opacity group-hover:opacity-100',
                )}
                role="tooltip"
              >
                <p className="font-semibold text-gray-300">미획득 배지</p>
                <p className="mt-0.5 text-gray-400">{badge.description}</p>
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== 최근 학습 기록 (타임라인 스타일) ====== */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary-600" aria-hidden="true" />
          <h2 className="text-lg font-bold text-gray-900">최근 학습 기록</h2>
        </div>
        <div className="relative">
          {/* 타임라인 수직 라인 */}
          <div
            className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-primary-200 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-1">
            {recentActivity.map((activity, idx) => {
              const style = getActivityStyle(activity.type);
              return (
                <div
                  key={activity.id}
                  className="relative flex items-start gap-4 pl-10 py-3"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* 타임라인 도트 */}
                  <div
                    className={cn(
                      'absolute left-3.5 top-4 h-3 w-3 rounded-full ring-2 ring-white',
                      style.dotColor,
                      idx === 0 && 'animate-timeline-dot',
                    )}
                    aria-hidden="true"
                  />

                  {/* 활동 카드 */}
                  <div className="flex-1 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md hover:ring-gray-200">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-xl flex-shrink-0">
                        {style.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900">
                          {activity.title}
                        </p>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {activity.description}
                        </p>
                        <p className="mt-1.5 text-xs text-gray-300">
                          {new Date(activity.timestamp).toLocaleDateString(
                            'ko-KR',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            },
                          )}
                        </p>
                      </div>
                      {activity.xpEarned != null && activity.xpEarned > 0 && (
                        <span className="flex-shrink-0 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600 ring-1 ring-amber-200">
                          <Star className="h-3 w-3" aria-hidden="true" />
                          +{activity.xpEarned} XP
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
