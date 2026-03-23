'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { QuizResult } from '@/components/quiz/QuizResult';
import { getQuizById } from '@/data/quizzes';
import { getCourseById } from '@/data/courses';

interface QuizPageProps {
  params: { quizId: string };
}

/** 퀴즈 페이지 (클라이언트 컴포넌트) */
export default function QuizPage({ params }: QuizPageProps) {
  const { quizId } = params;
  const quiz = getQuizById(quizId);
  const course = quiz ? getCourseById(quiz.courseId) : undefined;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Map<string, number>>(new Map());
  const [showResult, setShowResult] = useState(false);
  /* 문제 전환 시 애니메이션 키 */
  const [slideKey, setSlideKey] = useState(0);

  /** 답안 선택 핸들러 */
  const handleAnswer = useCallback(
    (index: number) => {
      if (!quiz) return;
      const question = quiz.questions[currentQuestion];
      if (!question || answers.has(question.id)) return;

      const next = new Map(answers);
      next.set(question.id, index);
      setAnswers(next);

      /* 마지막 문제가 아니면 잠시 후 다음 문제로 이동 */
      if (currentQuestion < quiz.questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
          setSlideKey((k) => k + 1);
        }, 1200);
      }
    },
    [quiz, answers, currentQuestion],
  );

  /** 문제 네비게이션 클릭 */
  const handleNavigate = useCallback((idx: number) => {
    setCurrentQuestion(idx);
    setSlideKey((k) => k + 1);
  }, []);

  /** 점수 계산 */
  const calculateScore = useCallback((): number => {
    if (!quiz) return 0;
    let correct = 0;
    for (const q of quiz.questions) {
      if (answers.get(q.id) === q.correctAnswer) {
        correct++;
      }
    }
    return correct;
  }, [quiz, answers]);

  /** 결과 보기 */
  const handleShowResult = useCallback(() => {
    setShowResult(true);
  }, []);

  /** 다시 풀기 */
  const handleRetry = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers(new Map());
    setShowResult(false);
    setSlideKey(0);
  }, []);

  /* 퀴즈를 찾을 수 없는 경우 */
  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-5xl">🔍</p>
        <h1 className="mt-4 text-xl font-bold text-gray-900">
          퀴즈를 찾을 수 없습니다
        </h1>
        <p className="mt-2 text-gray-500">
          요청하신 퀴즈가 존재하지 않거나 삭제되었습니다.
        </p>
        <Link
          href="/courses"
          className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          강좌 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const totalQuestions = quiz.questions.length;
  const question = quiz.questions[currentQuestion];
  const isAnswered = question ? answers.has(question.id) : false;
  const selectedAnswer = question ? (answers.get(question.id) ?? null) : null;
  const answeredCount = answers.size;
  const allAnswered = answeredCount === totalQuestions;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  /** 브레드크럼 */
  const breadcrumb = (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
      <Link href="/courses" className="hover:text-blue-600 transition-colors">
        강좌
      </Link>
      {course && (
        <>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <Link
            href={`/courses/${course.id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {course.title}
          </Link>
        </>
      )}
      <ChevronRight className="h-4 w-4" aria-hidden="true" />
      <span className="text-gray-700">{quiz.title}</span>
    </nav>
  );

  /* 결과 화면 */
  if (showResult) {
    const finalScore = calculateScore();

    /* 문제별 결과 배열 생성 */
    const questionResults = quiz.questions.map((q, i) => ({
      number: i + 1,
      correct: answers.get(q.id) === q.correctAnswer,
    }));

    return (
      <div className="space-y-6">
        {breadcrumb}
        <QuizResult
          score={finalScore}
          total={totalQuestions}
          passingScore={quiz.passingScore}
          xpEarned={quiz.xpReward}
          onRetry={handleRetry}
          questionResults={questionResults}
        />
      </div>
    );
  }

  /* 퀴즈 풀이 화면 */
  return (
    <div className="space-y-6">
      {breadcrumb}

      {/* 퀴즈 헤더 + 진행 표시 */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
        <p className="mt-1 text-sm text-gray-500">{quiz.description}</p>

        {/* 그래디언트 프로그레스 바 */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">
              <span className="text-primary-600 font-bold">{currentQuestion + 1}</span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-gray-400">{totalQuestions}</span>
              <span className="ml-1 text-gray-500">문제</span>
            </span>
            <span className="text-xs text-gray-400">
              {answeredCount}개 답변 완료
            </span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
            {/* 쉬머 오버레이 */}
            <div
              className="progress-shimmer absolute inset-0 h-full rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 문제 카드 (슬라이드 애니메이션 키) */}
      {question && (
        <div key={slideKey}>
          <QuizQuestion
            question={question}
            questionNumber={currentQuestion + 1}
            onAnswer={handleAnswer}
            answered={isAnswered}
            selectedAnswer={selectedAnswer}
          />
        </div>
      )}

      {/* 문제 네비게이션 */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* 문제 번호 버튼 (부드러운 상태 전환) */}
        <div className="flex flex-wrap gap-2">
          {quiz.questions.map((q, i) => {
            const isActive = i === currentQuestion;
            const isDone = answers.has(q.id);
            const isQuestionCorrect = answers.get(q.id) === q.correctAnswer;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => handleNavigate(i)}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md scale-110'
                    : isDone
                      ? isQuestionCorrect
                        ? 'bg-green-100 text-green-700 ring-1 ring-green-300 hover:ring-2'
                        : 'bg-red-100 text-red-700 ring-1 ring-red-300 hover:ring-2'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600',
                )}
                aria-label={`${i + 1}번 문제${isDone ? (isQuestionCorrect ? ' (정답)' : ' (오답)') : ''}`}
              >
                {isDone ? (
                  isQuestionCorrect ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )
                ) : (
                  i + 1
                )}
              </button>
            );
          })}
        </div>

        {/* 결과 보기 버튼 */}
        {allAnswered && (
          <button
            type="button"
            onClick={handleShowResult}
            className="animate-scale-in animate-pulse-glow rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
          >
            결과 확인하기
          </button>
        )}
      </div>
    </div>
  );
}
