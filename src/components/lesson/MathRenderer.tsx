'use client';

import { useMemo } from 'react';
import katex from 'katex';
import { cn } from '@/lib/utils';

interface MathRendererProps {
  /** KaTeX 수식 문자열 */
  math: string;
  /** 블록 표시 모드 (true) vs 인라인 모드 (false) */
  display?: boolean;
  /** 추가 클래스 */
  className?: string;
}

/** KaTeX 수식 렌더링 컴포넌트 */
export function MathRenderer({
  math,
  display = false,
  className,
}: MathRendererProps) {
  const rendered = useMemo(() => {
    try {
      return {
        html: katex.renderToString(math, {
          displayMode: display,
          throwOnError: false,
          strict: false,
        }),
        error: null,
      };
    } catch (err) {
      return {
        html: null,
        error: err instanceof Error ? err.message : '수식 렌더링 오류',
      };
    }
  }, [math, display]);

  if (rendered.error) {
    return (
      <code
        className={cn(
          'rounded bg-red-50 px-1.5 py-0.5 text-sm text-red-600',
          className,
        )}
        title={rendered.error}
      >
        {math}
      </code>
    );
  }

  if (display) {
    return (
      <div
        className={cn('my-4 overflow-x-auto text-center', className)}
        dangerouslySetInnerHTML={{ __html: rendered.html! }}
        role="math"
        aria-label={math}
      />
    );
  }

  return (
    <span
      className={cn('inline-block', className)}
      dangerouslySetInnerHTML={{ __html: rendered.html! }}
      role="math"
      aria-label={math}
    />
  );
}
