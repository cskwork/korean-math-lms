'use client';

import { useEffect, useState } from 'react';
import {
  Trophy,
  RotateCcw,
  ArrowRight,
  Star,
  CheckCircle2,
  XCircle,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface QuestionResult {
  /** 1-based 문제 번호 */
  number: number;
  /** 정답 여부 */
  correct: boolean;
}

interface QuizResultProps {
  /** 맞힌 문제 수 */
  score: number;
  /** 전체 문제 수 */
  total: number;
  /** 합격 기준 점수 (%) */
  passingScore: number;
  /** 획득 XP */
  xpEarned: number;
  /** 다시 풀기 콜백 */
  onRetry: () => void;
  /** 문제별 정답/오답 결과 (선택적) */
  questionResults?: QuestionResult[];
}

/* SVG 도넛 차트 상수 */
const DONUT_RADIUS = 45;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS; // ~282.74

/** 퀴즈 완료 결과 화면 — 게이미피케이션 UI */
export function QuizResult({
  score,
  total,
  passingScore,
  xpEarned,
  onRetry,
  questionResults,
}: QuizResultProps) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= passingScore;

  /* 숫자 카운트업 애니메이션 */
  const [displayScore, setDisplayScore] = useState(0);
  const [countDone, setCountDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.ceil(percentage / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= percentage) {
        current = percentage;
        clearInterval(timer);
        setCountDone(true);
      }
      setDisplayScore(current);
    }, 25);
    return () => clearInterval(timer);
  }, [percentage]);

  /* 도넛 차트의 dashoffset 계산 */
  const strokeDash = (percentage / 100) * DONUT_CIRCUMFERENCE;

  return (
    <div className="relative mx-auto max-w-lg text-center">
      {/* 합격 시 CSS 컨페티 파티클 */}
      {passed && <ConfettiParticles />}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
        {/* 헤더 배경 */}
        <div
          className={cn(
            'px-6 pb-4 pt-8',
            passed
              ? 'bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400'
              : 'bg-gradient-to-br from-gray-200 to-gray-300',
          )}
        >
          <div
            className={cn(
              'mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full',
              passed
                ? 'bg-white/30 backdrop-blur-sm'
                : 'bg-white/40 backdrop-blur-sm',
            )}
          >
            <Trophy
              className={cn(
                'h-8 w-8',
                passed ? 'text-white' : 'text-gray-500',
              )}
              aria-hidden="true"
            />
          </div>
          <h2
            className={cn(
              'text-xl font-bold',
              passed ? 'text-white' : 'text-gray-600',
            )}
          >
            {passed ? '축하합니다!' : '아쉽네요...'}
          </h2>
          <p
            className={cn(
              'mt-1 text-sm',
              passed ? 'text-white/80' : 'text-gray-400',
            )}
          >
            {passed
              ? '퀴즈를 멋지게 통과했습니다!'
              : '다시 도전해보세요!'}
          </p>
        </div>

        <div className="px-6 pb-8 pt-6">
          {/* SVG 도넛 차트 + 카운트업 점수 */}
          <div className="relative mx-auto mb-6 h-40 w-40">
            <svg
              className="h-full w-full -rotate-90"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              {/* 배경 원 */}
              <circle
                cx="50"
                cy="50"
                r={DONUT_RADIUS}
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="8"
              />
              {/* 진행 원 */}
              <circle
                cx="50"
                cy="50"
                r={DONUT_RADIUS}
                fill="none"
                stroke={passed ? '#22c55e' : '#ef4444'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${strokeDash} ${DONUT_CIRCUMFERENCE}`}
                className="animate-donut-chart"
                style={
                  {
                    '--donut-dash': `${strokeDash}`,
                  } as React.CSSProperties
                }
              />
            </svg>
            {/* 중앙 점수 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={cn(
                  'text-4xl font-extrabold tabular-nums',
                  countDone && 'animate-score-pop',
                  passed ? 'text-green-600' : 'text-red-500',
                )}
                role="status"
                aria-label={`점수 ${percentage}%`}
              >
                {displayScore}
                <span className="text-lg font-bold">%</span>
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                {passed ? '합격' : '불합격'}
              </span>
            </div>
          </div>

          {/* 불합격 시 격려 메시지 */}
          {!passed && (
            <div className="mx-auto mb-5 flex max-w-xs items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-3 text-left">
              <Lightbulb className="h-5 w-5 flex-shrink-0 text-amber-500 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-amber-700">
                  다시 도전해보세요!
                </p>
                <p className="mt-0.5 text-xs text-amber-600">
                  틀린 문제의 해설을 다시 읽고 개념을 복습한 후 도전하면 더 좋은 결과를 얻을 수 있어요.
                </p>
              </div>
            </div>
          )}

          {/* 상세 통계 미니 카드 */}
          <div className="mb-5 grid grid-cols-3 gap-3">
            <StatCard
              label="정답"
              value={`${score}/${total}`}
              icon={<CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
              bgColor="bg-blue-50"
              textColor="text-blue-700"
              iconColor="text-blue-500"
            />
            <StatCard
              label="정답률"
              value={`${percentage}%`}
              icon={
                <span className="text-sm font-bold" aria-hidden="true">%</span>
              }
              bgColor="bg-purple-50"
              textColor="text-purple-700"
              iconColor="text-purple-500"
            />
            <StatCard
              label="획득 XP"
              value={`+${xpEarned}`}
              icon={<Star className="h-4 w-4" aria-hidden="true" />}
              bgColor="bg-amber-50"
              textColor="text-amber-700"
              iconColor="text-amber-500"
            />
          </div>

          {/* 문제별 정답/오답 분포 (번호 원형) */}
          {questionResults && questionResults.length > 0 && (
            <div className="mb-6">
              <p className="mb-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                문제별 결과
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {questionResults.map((qr) => (
                  <div
                    key={qr.number}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-transform hover:scale-110',
                      qr.correct
                        ? 'bg-green-100 text-green-700 ring-2 ring-green-300'
                        : 'bg-red-100 text-red-700 ring-2 ring-red-300',
                    )}
                    title={`${qr.number}번 ${qr.correct ? '정답' : '오답'}`}
                    aria-label={`${qr.number}번 문제 ${qr.correct ? '정답' : '오답'}`}
                  >
                    {qr.correct ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Button
              variant="secondary"
              size="lg"
              onClick={onRetry}
              className="flex-1 gap-2 rounded-xl"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              다시 풀기
            </Button>
            <Button
              variant="primary"
              size="lg"
              className={cn(
                'flex-1 gap-2 rounded-xl',
                passed && 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
              )}
            >
              다음 수업
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------
   통계 미니 카드 서브 컴포넌트
   ---------------------------------------- */
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  iconColor: string;
}

function StatCard({ label, value, icon, bgColor, textColor, iconColor }: StatCardProps) {
  return (
    <div className={cn('rounded-xl p-3 text-center', bgColor)}>
      <div className={cn('mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/60', iconColor)}>
        {icon}
      </div>
      <p className={cn('text-lg font-bold', textColor)}>{value}</p>
      <p className="text-[10px] font-medium text-gray-400">{label}</p>
    </div>
  );
}

/* ----------------------------------------
   CSS 전용 컨페티 파티클 (색상 div)
   ---------------------------------------- */
const CONFETTI_COLORS = [
  '#3b82f6', '#ef4444', '#22c55e', '#f59e0b',
  '#8b5cf6', '#ec4899', '#06b6d4', '#f97316',
];

function ConfettiParticles() {
  /* 클라이언트 측에서 위치를 고정하기 위해 seed 기반 값 사용 */
  const particles = Array.from({ length: 30 }, (_, i) => {
    const seed = (i * 137.5) % 360;
    return {
      id: i,
      left: `${(seed / 360) * 100}%`,
      delay: `${(i * 0.08)}s`,
      duration: `${2 + (i % 5) * 0.4}s`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: `${6 + (i % 4) * 2}px`,
      rotate: `${360 + (i % 3) * 360}deg`,
      radius: i % 3 === 0 ? '50%' : '2px',
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={
            {
              left: p.left,
              top: '-10px',
              '--confetti-delay': p.delay,
              '--confetti-dur': p.duration,
              '--confetti-color': p.color,
              '--confetti-size': p.size,
              '--confetti-rot': p.rotate,
              '--confetti-radius': p.radius,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
