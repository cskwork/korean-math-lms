import { BookOpen, Trophy, Flame, Star, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatXp } from '@/lib/utils';
import type { DashboardStats } from '@/types';

interface StatsCardsProps {
  stats: DashboardStats;
}

interface StatItem {
  label: string;
  getValue: (s: DashboardStats) => string;
  icon: typeof BookOpen;
  gradientFrom: string;
  gradientTo: string;
  iconBg: string;
  trend: string;
  trendUp: boolean;
}

const STAT_ITEMS: StatItem[] = [
  {
    label: '완료한 수업',
    getValue: (s) => `${s.completedLessons} / ${s.totalLessons}`,
    icon: BookOpen,
    gradientFrom: 'from-primary-500',
    gradientTo: 'to-primary-600',
    iconBg: 'bg-gradient-to-br from-primary-400 to-primary-600',
    trend: '+2 이번 주',
    trendUp: true,
  },
  {
    label: '퀴즈 평균 점수',
    getValue: (s) => `${s.averageScore}점`,
    icon: Trophy,
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-emerald-600',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    trend: '+5점 향상',
    trendUp: true,
  },
  {
    label: '연속 학습일',
    getValue: (s) => `${s.currentStreak}일`,
    icon: Flame,
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-orange-600',
    iconBg: 'bg-gradient-to-br from-orange-400 to-red-500',
    trend: '최고 기록!',
    trendUp: true,
  },
  {
    label: '획득 경험치',
    getValue: (s) => `${formatXp(s.totalXp)} XP`,
    icon: Star,
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-amber-600',
    iconBg: 'bg-gradient-to-br from-amber-400 to-yellow-500',
    trend: '+180 오늘',
    trendUp: true,
  },
];

/** 대시보드 상단 통계 카드 4개 그리드 */
export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STAT_ITEMS.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={cn(
              'group relative overflow-hidden rounded-2xl border border-gray-100/60 bg-white p-5',
              'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(59,130,246,0.04)]',
              'transition-all duration-300 ease-out',
              'hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] hover:-translate-y-1',
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* 배경 장식 원 */}
            <div
              className={cn(
                'absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-[0.06]',
                `bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo}`,
              )}
              aria-hidden="true"
            />

            <div className="relative flex items-center gap-4">
              {/* 그래디언트 아이콘 배경 */}
              <div
                className={cn(
                  'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl shadow-sm',
                  item.iconBg,
                )}
                aria-hidden="true"
              >
                <Icon className="h-6 w-6 text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="mt-0.5 text-2xl font-bold text-gray-900 animate-count-up">
                  {item.getValue(stats)}
                </p>
              </div>
            </div>

            {/* 트렌드 표시 */}
            <div className="relative mt-3 flex items-center gap-1">
              <TrendingUp
                className={cn(
                  'h-3.5 w-3.5',
                  item.trendUp ? 'text-emerald-500' : 'text-red-400',
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  'text-xs font-medium',
                  item.trendUp ? 'text-emerald-600' : 'text-red-500',
                )}
              >
                {item.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
