// 코스 목 데이터 정의
import type { Course } from '@/types';

export const courses: Course[] = [
  {
    id: 'integers',
    title: '정수와 연산',
    description:
      '양수, 음수, 0의 개념을 배우고 정수의 사칙연산을 마스터합니다. 수직선 위에서 수의 크기를 비교하고, 실생활에서 정수가 어떻게 쓰이는지 알아봅니다.',
    icon: 'Z+',
    color: '#059669',
    lessonCount: 3,
    lessonIds: ['integers-intro', 'integers-add-sub', 'integers-mul-div'],
    quizIds: ['quiz-integers'],
    difficulty: 'beginner',
    category: '수와 연산',
  },
  {
    id: 'equations',
    title: '일차방정식',
    description:
      '미지수 x가 포함된 등식의 원리를 이해하고, 일차방정식을 세우고 풀어봅니다. 이항과 등식의 성질을 활용해 다양한 문제를 해결합니다.',
    icon: 'x=',
    color: '#22c55e',
    lessonCount: 3,
    lessonIds: ['equations-intro', 'equations-solving', 'equations-word'],
    quizIds: ['quiz-equations'],
    difficulty: 'beginner',
    category: '문자와 식',
  },
  {
    id: 'coordinates',
    title: '좌표와 그래프',
    description:
      '좌표평면 위에서 점의 위치를 나타내고, 일차함수의 그래프를 그려봅니다. 기울기와 절편의 의미를 이해하고 함수의 변화를 시각적으로 분석합니다.',
    icon: 'xy',
    color: '#f59e0b',
    lessonCount: 3,
    lessonIds: ['coordinates-intro', 'functions-linear', 'slope-intercept'],
    quizIds: ['quiz-coordinates'],
    difficulty: 'intermediate',
    category: '함수',
  },
  {
    id: 'geometry',
    title: '기본 도형',
    description:
      '점, 선, 각의 기본 개념부터 삼각형과 원의 성질까지 단계별로 학습합니다. 도형의 합동과 닮음, 넓이와 둘레를 구하는 방법을 익힙니다.',
    icon: '\u25B3',
    color: '#f97316',
    lessonCount: 3,
    lessonIds: ['geometry-points', 'geometry-triangles', 'geometry-circles'],
    quizIds: ['quiz-geometry'],
    difficulty: 'intermediate',
    category: '도형',
  },
  {
    id: 'statistics',
    title: '통계와 확률',
    description:
      '자료를 수집하고 정리하여 평균, 중앙값, 최빈값을 구합니다. 확률의 기본 개념과 다양한 그래프 표현 방법을 배워 데이터를 분석하는 힘을 기릅니다.',
    icon: '\u03BC',
    color: '#14b8a6',
    lessonCount: 3,
    lessonIds: ['stats-central', 'probability-intro', 'stats-representation'],
    quizIds: ['quiz-statistics'],
    difficulty: 'intermediate',
    category: '확률과 통계',
  },
  {
    id: 'applications',
    title: '실생활 문제와 도전',
    description:
      '배운 수학 개념을 실생활 상황에 적용합니다. 속력과 거리, 나이와 수, 비와 비율 문제를 풀고, 종합 복습과 심화 도전으로 실력을 한 단계 끌어올립니다.',
    icon: '\u2605',
    color: '#ef4444',
    lessonCount: 7,
    lessonIds: [
      'word-speed',
      'word-age',
      'word-ratio',
      'review-numbers',
      'review-geometry',
      'challenge-advanced',
      'challenge-competition',
    ],
    quizIds: ['quiz-applications'],
    difficulty: 'advanced',
    category: '종합',
  },
];

/** ID로 코스를 검색한다. */
export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}
