import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { BarChart3 } from 'lucide-react';

interface ProgressChartProps {
  /** 월~일 주간 XP 배열 (7개) */
  weeklyXp: number[];
}

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'] as const;

/** 주간 XP 막대 차트 (순수 CSS, 프로덕션 스타일) */
export function ProgressChart({ weeklyXp }: ProgressChartProps) {
  const maxXp = Math.max(...weeklyXp, 1);
  const totalXp = weeklyXp.reduce((sum, xp) => sum + xp, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-600">
              <BarChart3 className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">주간 학습 현황</h3>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1">
            <span className="text-xs font-medium text-primary-600">총 {totalXp} XP</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* 격자선이 있는 차트 영역 */}
        <div className="relative">
          {/* 수평 격자선 + Y축 라벨 */}
          <div className="absolute inset-0 flex flex-col justify-between" style={{ height: 160 }} aria-hidden="true">
            {[100, 75, 50, 25, 0].map((pct) => (
              <div key={pct} className="flex items-center gap-2">
                <span className="w-6 text-right text-[10px] text-gray-300">
                  {Math.round((maxXp * pct) / 100)}
                </span>
                <div className="flex-1 border-b border-dashed border-gray-100" />
              </div>
            ))}
          </div>

          {/* 막대 차트 */}
          <div
            className="relative flex items-end justify-between gap-2 pl-9"
            style={{ height: 160 }}
            role="img"
            aria-label={`주간 XP 차트: ${DAY_LABELS.map((d, i) => `${d} ${weeklyXp[i] ?? 0}XP`).join(', ')}`}
          >
            {DAY_LABELS.map((day, i) => {
              const xp = weeklyXp[i] ?? 0;
              const heightPercent = (xp / maxXp) * 100;
              const isToday = i === new Date().getDay() - 1 || (new Date().getDay() === 0 && i === 6);

              return (
                <div
                  key={day}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  {/* XP 값 라벨 */}
                  <span
                    className={cn(
                      'text-xs font-semibold transition-all',
                      xp > 0 ? 'text-gray-600' : 'text-transparent',
                    )}
                  >
                    {xp}
                  </span>

                  {/* 그래디언트 막대 */}
                  <div
                    className={cn(
                      'relative w-full max-w-[36px] overflow-hidden rounded-t-lg transition-all duration-700 ease-out',
                      xp > 0 ? '' : 'bg-gray-50',
                      isToday && xp > 0 ? 'ring-2 ring-primary-300/40 ring-offset-1' : '',
                    )}
                    style={{
                      height: `${Math.max(heightPercent, 4)}%`,
                      background: xp > 0
                        ? `linear-gradient(to top, #059669, #34d399)`
                        : undefined,
                    }}
                    aria-hidden="true"
                  >
                    {/* 쉬머 오버레이 */}
                    {xp > 0 && (
                      <div className="progress-shimmer absolute inset-0 rounded-t-lg" />
                    )}
                  </div>

                  {/* 요일 라벨 */}
                  <span
                    className={cn(
                      'text-xs font-medium',
                      isToday ? 'font-bold text-primary-600' : 'text-gray-400',
                    )}
                  >
                    {day}
                    {isToday && (
                      <span className="ml-0.5 inline-block h-1 w-1 rounded-full bg-primary-500" />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
