import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  /** 진행률 (0~100) */
  value: number;
  /** 바 색상 (Tailwind bg 클래스) -- 그래디언트 사용 시 무시 */
  color?: string;
  /** 높이 클래스 */
  height?: string;
  /** 퍼센트 텍스트 표시 여부 */
  showLabel?: boolean;
  /** 추가 클래스 */
  className?: string;
}

/** 그래디언트 + 쉬머 애니메이션이 적용된 프로그레스 바 */
export function ProgressBar({
  value,
  color,
  height = 'h-3',
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="mb-1.5 flex justify-between text-xs text-gray-500">
          <span>진행률</span>
          <span className="font-semibold text-gray-700">{clamped}%</span>
        </div>
      )}
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-gray-100/80',
          height,
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`진행률 ${clamped}%`}
      >
        {/* 그래디언트 채움 바 */}
        <div
          className={cn(
            'relative rounded-full transition-all duration-700 ease-out',
            height,
            color ?? 'bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600',
          )}
          style={{ width: `${clamped}%` }}
        >
          {/* 쉬머 오버레이 */}
          <div className="progress-shimmer absolute inset-0 rounded-full" />
        </div>

        {/* 플로팅 퍼센트 라벨 (값이 15% 이상일 때 표시) */}
        {clamped >= 15 && (
          <span
            className="absolute top-1/2 -translate-y-1/2 text-[10px] font-bold text-white drop-shadow-sm"
            style={{ left: `calc(${clamped}% - 28px)` }}
          >
            {clamped}%
          </span>
        )}
      </div>
    </div>
  );
}
