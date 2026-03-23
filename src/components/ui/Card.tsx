import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** 기본 카드 컨테이너 -- 프로덕션 수준 스타일 */
export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-100/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(59,130,246,0.04)]',
        'transition-all duration-300 ease-out',
        'hover:shadow-[0_8px_30px_rgba(59,130,246,0.08),0_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-0.5',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** 카드 헤더 영역 */
export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('border-b border-gray-50 px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** 카드 본문 영역 */
export function CardContent({
  className,
  children,
  ...props
}: CardContentProps) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** 카드 하단 영역 */
export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('border-t border-gray-50 px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}
