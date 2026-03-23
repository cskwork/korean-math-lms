'use client';

import { useState } from 'react';
import {
  Lightbulb,
  Pencil,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathRenderer } from '@/components/lesson/MathRenderer';
import { MathVisual, detectVisualType } from '@/components/lesson/MathVisual';
import type { Lesson, LessonSection } from '@/types';

interface LessonContentProps {
  lesson: Lesson;
}

/** 수업 콘텐츠 전체 렌더러 */
export function LessonContent({ lesson }: LessonContentProps) {
  return (
    <article className="mx-auto max-w-3xl">
      {/* 수업 헤더 */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
        <p className="mt-2 text-gray-500">{lesson.description}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
          <span>예상 소요 시간: {lesson.estimatedMinutes}분</span>
          <span>보상: +{lesson.xpReward} XP</span>
        </div>
      </header>

      {/* 콘텐츠 섹션 */}
      <div className="space-y-6">
        {lesson.content.map((section, idx) => (
          <SectionRenderer key={idx} section={section} />
        ))}
      </div>

      {/* 핵심 포인트 */}
      {lesson.keyPoints.length > 0 && (
        <section className="mt-10 rounded-xl border border-primary-100 bg-primary-50/50 p-6">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-primary-800">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            핵심 정리
          </h2>
          <ul className="space-y-2">
            {lesson.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-primary-700">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

/** 개별 섹션 렌더러 */
function SectionRenderer({ section }: { section: LessonSection }) {
  switch (section.type) {
    case 'text':
      return <TextSection section={section} />;
    case 'math':
      return <MathSection section={section} />;
    case 'example':
      return <ExampleSection section={section} />;
    case 'tip':
      return <TipSection section={section} />;
    case 'practice':
      return <PracticeSection section={section} />;
    case 'visual':
      return <VisualSection section={section} />;
    case 'interactive':
      return <InteractiveSection section={section} />;
    default:
      return null;
  }
}

function TextSection({ section }: { section: LessonSection }) {
  return (
    <div className="text-sm leading-relaxed text-gray-700">
      {section.title && (
        <h3 className="mb-2 text-base font-semibold text-gray-900">
          {section.title}
        </h3>
      )}
      <p>{section.content}</p>
    </div>
  );
}

function MathSection({ section }: { section: LessonSection }) {
  return (
    <div className="my-4">
      {section.title && (
        <h3 className="mb-2 text-sm font-medium text-gray-500">
          {section.title}
        </h3>
      )}
      {section.math ? (
        <MathRenderer math={section.math} display />
      ) : (
        <div
          className="flex justify-center rounded-lg bg-gray-50 py-4"
          dangerouslySetInnerHTML={{ __html: section.content }}
          role="math"
        />
      )}
    </div>
  );
}

function ExampleSection({ section }: { section: LessonSection }) {
  return (
    <div className="rounded-xl border-l-4 border-primary-400 bg-primary-50/40 p-5">
      <h3 className="mb-2 text-sm font-semibold text-primary-700">
        {section.title ?? '예제'}
      </h3>
      <div className="text-sm text-gray-700">{section.content}</div>
      {section.math && <MathRenderer math={section.math} display />}
    </div>
  );
}

function TipSection({ section }: { section: LessonSection }) {
  return (
    <div className="rounded-xl border-l-4 border-yellow-400 bg-yellow-50/50 p-5">
      <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-yellow-700">
        <Lightbulb className="h-4 w-4" aria-hidden="true" />
        {section.title ?? '팁'}
      </h3>
      <div className="text-sm text-gray-700">{section.content}</div>
    </div>
  );
}

function PracticeSection({ section }: { section: LessonSection }) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="rounded-xl border-l-4 border-green-400 bg-green-50/40 p-5">
      <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-green-700">
        <Pencil className="h-4 w-4" aria-hidden="true" />
        {section.title ?? '연습문제'}
      </h3>
      <div className="text-sm text-gray-700">{section.content}</div>
      {section.math && <MathRenderer math={section.math} display />}

      <div className="mt-3 flex flex-wrap gap-2">
        {section.hint && (
          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-green-600 shadow-sm transition-colors hover:bg-green-50"
            aria-expanded={showHint}
          >
            {showHint ? (
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            힌트
          </button>
        )}
        {section.answer && (
          <button
            type="button"
            onClick={() => setShowAnswer((prev) => !prev)}
            className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-green-600 shadow-sm transition-colors hover:bg-green-50"
            aria-expanded={showAnswer}
          >
            {showAnswer ? (
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            정답
          </button>
        )}
      </div>

      {showHint && section.hint && (
        <div className="mt-2 rounded-lg bg-white/80 px-4 py-2 text-sm text-gray-600">
          {section.hint}
        </div>
      )}
      {showAnswer && section.answer && (
        <div className="mt-2 rounded-lg bg-white/80 px-4 py-2 text-sm font-medium text-green-700">
          {section.answer}
        </div>
      )}
    </div>
  );
}

function VisualSection({ section }: { section: LessonSection }) {
  const visualType = detectVisualType(
    section.title ?? '',
    `${section.content} ${section.imageDescription ?? ''}`,
  );

  if (visualType) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {section.title && (
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            {section.title}
          </h3>
        )}
        <MathVisual visualType={visualType} />
        {section.imageDescription && (
          <p className="mt-2 text-center text-xs text-gray-400">
            {section.imageDescription}
          </p>
        )}
      </div>
    );
  }

  // 매칭되지 않는 경우: 수학 기호와 그라데이션 배경의 스타일 플레이스홀더
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 via-primary-100/50 to-primary-50 p-6">
      {/* 장식용 수학 기호 */}
      <div className="pointer-events-none absolute inset-0 select-none opacity-[0.07]" aria-hidden="true">
        <span className="absolute left-[8%] top-[12%] text-5xl font-bold text-primary-900">+</span>
        <span className="absolute right-[12%] top-[8%] text-4xl font-bold text-primary-800">{'\u03C0'}</span>
        <span className="absolute bottom-[14%] left-[16%] text-4xl font-bold text-primary-700">{'\u221A'}</span>
        <span className="absolute bottom-[10%] right-[18%] text-5xl font-bold text-primary-900">{'\u00D7'}</span>
        <span className="absolute left-[45%] top-[50%] text-6xl font-bold text-primary-800">{'\u03A3'}</span>
      </div>

      <div className="relative text-center">
        <h3 className="text-sm font-semibold text-gray-700">
          {section.title ?? '시각 자료'}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-gray-500">
          {section.imageDescription ?? section.content}
        </p>
      </div>
    </div>
  );
}

function InteractiveSection({ section }: { section: LessonSection }) {
  return (
    <div className="rounded-xl border border-primary-200 bg-primary-50/40 p-5">
      <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-primary-700">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        {section.title ?? '인터랙티브 콘텐츠'}
      </h3>
      <div className="text-sm text-gray-700">{section.content}</div>
    </div>
  );
}
