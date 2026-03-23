import { BookOpen, Trophy, Award, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { ActivityItem } from '@/types';

interface RecentActivityProps {
  activities: ActivityItem[];
}

const ACTIVITY_CONFIG: Record<
  ActivityItem['type'],
  { icon: typeof BookOpen; color: string; bg: string }
> = {
  lesson_complete: { icon: BookOpen, color: 'text-primary-600', bg: 'bg-primary-50' },
  quiz_complete: { icon: Trophy, color: 'text-success-500', bg: 'bg-success-50' },
  badge_earned: { icon: Award, color: 'text-rose-500', bg: 'bg-rose-50' },
  streak: { icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
};

/** 상대 시간 표시 (예: "2시간 전") */
function formatRelativeTime(timestamp: string): string {
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return '방금 전';
}

/** 최근 활동 피드 */
export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-base font-semibold text-gray-900">최근 활동</h3>
      </CardHeader>
      <CardContent className="p-0">
        {activities.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-gray-400">
            아직 활동 내역이 없습니다.
          </p>
        ) : (
          <ul className="divide-y divide-gray-50" role="list">
            {activities.map((activity) => {
              const config = ACTIVITY_CONFIG[activity.type];
              const Icon = config.icon;

              return (
                <li
                  key={activity.id}
                  className="flex items-start gap-3 px-6 py-3 transition-colors hover:bg-gray-50/50"
                >
                  <div
                    className={cn(
                      'mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg',
                      config.bg,
                    )}
                    aria-hidden="true"
                  >
                    <Icon className={cn('h-4 w-4', config.color)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">{activity.description}</p>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-end gap-0.5">
                    <span className="text-xs text-gray-400">
                      {formatRelativeTime(activity.timestamp)}
                    </span>
                    {activity.xpEarned != null && activity.xpEarned > 0 && (
                      <span className="text-xs font-medium text-accent-500">
                        +{activity.xpEarned} XP
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
