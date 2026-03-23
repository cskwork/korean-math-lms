import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// 난이도별 색상 매핑 배지
const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        beginner: 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20',
        intermediate: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
        advanced: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20',
        easy: 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20',
        medium: 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20',
        hard: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20',
        default: 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface DifficultyBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/** 난이도 / 태그 표시용 배지 (Badge 타입과 이름 충돌 방지) */
export function DifficultyBadge({ className, variant, ...props }: DifficultyBadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
