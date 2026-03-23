'use client';

import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathRenderer } from '@/components/lesson/MathRenderer';
import type { QuizQuestion as QuizQuestionType } from '@/types';

interface QuizQuestionProps {
  question: QuizQuestionType;
  /** 문제 번호 (1-based) */
  questionNumber: number;
  /** 답안 선택 콜백 */
  onAnswer: (index: number) => void;
  /** 답변 완료 여부 */
  answered: boolean;
  /** 선택한 답안 인덱스 (null = 미선택) */
  selectedAnswer: number | null;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const;

/** 난이도별 색상 점 */
const DIFFICULTY_CONFIG: Record<string, { color: string; label: string }> = {
  easy: { color: 'bg-green-400', label: '쉬움' },
  medium: { color: 'bg-yellow-400', label: '보통' },
  hard: { color: 'bg-red-400', label: '어려움' },
};

/** 퀴즈 개별 문제 — 게이미피케이션 UI */
export function QuizQuestion({
  question,
  questionNumber,
  onAnswer,
  answered,
  selectedAnswer,
}: QuizQuestionProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;
  const diff = DIFFICULTY_CONFIG[question.difficulty] ?? DIFFICULTY_CONFIG.medium;

  return (
    <div className="animate-question-enter rounded-2xl border border-gray-100 bg-white p-6 shadow-sm relative">
      {/* 포인트 배지 (우측 상단) */}
      <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-bold text-white shadow-md">
        {question.points}
      </div>

      {/* 문제 헤더 */}
      <div className="mb-4 flex items-start gap-3">
        {/* 난이도 점 + 문제 번호 */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={cn('inline-block h-2.5 w-2.5 rounded-full', diff.color)}
            title={diff.label}
            aria-label={`난이도: ${diff.label}`}
          />
          <span className="text-lg font-bold text-primary-600">
            Q{questionNumber}
          </span>
        </div>
        <h3 className="text-base font-semibold text-gray-900 leading-relaxed pt-0.5">
          {question.question}
        </h3>
      </div>

      {/* 수식 표시 */}
      {question.math && (
        <div className="mb-5 rounded-lg bg-gray-50 px-4 py-3">
          <MathRenderer math={question.math} display />
        </div>
      )}

      {/* 선택지 — 풀 카드 스타일 */}
      <div className="space-y-3" role="radiogroup" aria-label={`${questionNumber}번 문제 선택지`}>
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrectOption = idx === question.correctAnswer;

          /* 상태별 스타일 결정 */
          let cardStyle = '';
          let labelStyle = '';
          let animClass = '';

          if (answered) {
            if (isCorrectOption) {
              cardStyle = 'border-green-400 bg-green-50 shadow-sm';
              labelStyle = 'bg-green-500 text-white';
              animClass = 'animate-quiz-bounce';
            } else if (isSelected && !isCorrectOption) {
              cardStyle = 'border-red-400 bg-red-50 shadow-sm';
              labelStyle = 'bg-red-500 text-white';
              animClass = 'animate-quiz-shake';
            } else {
              cardStyle = 'border-gray-100 bg-gray-50 opacity-50';
              labelStyle = 'bg-gray-200 text-gray-400';
            }
          } else if (isSelected) {
            cardStyle = 'border-primary-500 bg-primary-600 shadow-md';
            labelStyle = 'bg-white text-primary-600';
          } else {
            cardStyle = 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm hover:scale-[1.01]';
            labelStyle = 'bg-gray-100 text-gray-500';
          }

          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={answered}
              onClick={() => onAnswer(idx)}
              className={cn(
                'flex w-full items-center gap-4 rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200',
                cardStyle,
                animClass,
                !answered && 'cursor-pointer',
                answered && 'cursor-default',
              )}
            >
              {/* 글자 레이블 원형 */}
              <span
                className={cn(
                  'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-200',
                  labelStyle,
                )}
              >
                {answered && isCorrectOption ? (
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                ) : answered && isSelected && !isCorrectOption ? (
                  <XCircle className="h-5 w-5" aria-hidden="true" />
                ) : (
                  OPTION_LABELS[idx]
                )}
              </span>

              {/* 선택지 텍스트 */}
              <span
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  answered && isSelected && !isCorrectOption
                    ? 'text-red-700'
                    : answered && isCorrectOption
                      ? 'text-green-700'
                      : isSelected
                        ? 'text-white'
                        : 'text-gray-700',
                )}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* 해설 — 슬라이드 다운 패널 */}
      {answered && (
        <div
          className={cn(
            'animate-explanation rounded-xl p-4 text-sm',
            isCorrect
              ? 'border border-green-200 bg-green-50/80'
              : 'border border-red-200 bg-red-50/80',
          )}
          role="status"
        >
          <p
            className={cn(
              'mb-1.5 flex items-center gap-2 font-bold text-base',
              isCorrect ? 'text-green-700' : 'text-red-700',
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                정답입니다!
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5" aria-hidden="true" />
                오답입니다
              </>
            )}
          </p>
          <p className="text-gray-600 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
