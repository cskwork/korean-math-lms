import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Award } from 'lucide-react';
import type { Badge } from '@/types';

interface AchievementBadgesProps {
  badges: Badge[];
}

/** 업적 배지 쇼케이스 -- 프로덕션 수준 */
export function AchievementBadges({ badges }: AchievementBadgesProps) {
  const earnedCount = badges.filter((b) => b.earnedAt != null).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500">
              <Award className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">나의 배지</h3>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
            {earnedCount}/{badges.length} 획득
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {badges.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-400">
            아직 획득한 배지가 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-4">
            {badges.map((badge) => {
              const earned = badge.earnedAt != null;
              return (
                <div
                  key={badge.id}
                  className={cn(
                    'group relative flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-all duration-300',
                    earned
                      ? 'bg-gradient-to-b from-amber-50/80 to-orange-50/40 hover:shadow-md hover:-translate-y-0.5'
                      : 'bg-gray-50/60 opacity-45 grayscale',
                  )}
                  title={badge.description}
                  role="img"
                  aria-label={`${badge.name}: ${badge.description}${earned ? ' (획득)' : ' (미획득)'}`}
                >
                  {/* 획득 배지 글로우 효과 */}
                  {earned && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-amber-200/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  )}

                  <span
                    className={cn(
                      'relative z-10 text-2xl transition-transform duration-300',
                      earned ? 'group-hover:scale-110' : '',
                    )}
                    aria-hidden="true"
                  >
                    {badge.icon}
                  </span>
                  <span className="relative z-10 text-xs font-medium leading-tight text-gray-700">
                    {badge.name}
                  </span>

                  {/* 호버 시 설명 툴팁 */}
                  <div
                    className={cn(
                      'pointer-events-none absolute -top-2 left-1/2 z-20 w-44 -translate-x-1/2 -translate-y-full',
                      'rounded-xl bg-gray-900/95 px-3 py-2.5 text-xs text-white shadow-xl backdrop-blur-sm',
                      'opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-[calc(100%+4px)]',
                    )}
                    role="tooltip"
                  >
                    <p className="font-medium">{badge.name}</p>
                    <p className="mt-0.5 text-gray-300">{badge.description}</p>
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900/95" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
