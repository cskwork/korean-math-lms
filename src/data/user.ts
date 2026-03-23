// 사용자 목 데이터 정의
import type { User, ActivityItem, DashboardStats } from '@/types';

export const mockUser: User = {
  id: 'user-001',
  name: '김수학',
  grade: 1,
  avatar: '🎓',
  level: 7,
  xp: 2450,
  xpToNext: 300,
  streak: 12,
  badges: [
    /* --- 획득한 배지 (5개) --- */
    {
      id: 'badge-first-lesson',
      name: '첫 걸음',
      description: '첫 번째 수업을 완료했습니다',
      icon: '🏃',
      earnedAt: '2026-03-01',
    },
    {
      id: 'badge-quiz-master',
      name: '퀴즈 마스터',
      description: '퀴즈에서 100점을 받았습니다',
      icon: '🏆',
      earnedAt: '2026-03-05',
    },
    {
      id: 'badge-streak-7',
      name: '7일 연속 학습',
      description: '7일 연속으로 학습했습니다',
      icon: '🔥',
      earnedAt: '2026-03-12',
    },
    {
      id: 'badge-integer-clear',
      name: '정수 마스터',
      description: '정수와 연산 코스를 완료했습니다',
      icon: '🔢',
      earnedAt: '2026-03-10',
    },
    {
      id: 'badge-equation-clear',
      name: '방정식 마스터',
      description: '일차방정식 코스를 완료했습니다',
      icon: '⚖️',
      earnedAt: '2026-03-18',
    },
    /* --- 잠긴 배지 (3개) --- */
    {
      id: 'badge-streak-30',
      name: '30일 연속 학습',
      description: '30일 연속으로 학습하면 획득',
      icon: '💎',
    },
    {
      id: 'badge-all-courses',
      name: '전 코스 마스터',
      description: '모든 코스를 완료하면 획득',
      icon: '👑',
    },
    {
      id: 'badge-perfect-score',
      name: '만점왕',
      description: '모든 퀴즈에서 100점을 받으면 획득',
      icon: '💯',
    },
  ],
  completedLessons: [
    'integers-intro',
    'integers-add-sub',
    'integers-mul-div',
    'equations-intro',
    'equations-solving',
    'equations-word',
    'coordinates-intro',
    'functions-linear',
    'geometry-points',
    'stats-central',
    'word-speed',
    'word-age',
  ],
  completedQuizzes: ['quiz-integers', 'quiz-equations'],
  courseProgress: {
    integers: 100,
    equations: 100,
    coordinates: 67,
    geometry: 33,
    statistics: 33,
    applications: 29,
  },
};

export const recentActivity: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'lesson_complete',
    title: '수업 완료: 나이와 수 문제',
    description: '실생활 문제와 도전 - 나이와 수 문제 수업을 완료했습니다.',
    timestamp: '2026-03-23T09:30:00',
    xpEarned: 75,
  },
  {
    id: 'act-2',
    type: 'streak',
    title: '12일 연속 학습 달성!',
    description: '꾸준한 학습 습관이 실력을 만듭니다. 대단해요!',
    timestamp: '2026-03-22T18:00:00',
  },
  {
    id: 'act-3',
    type: 'quiz_complete',
    title: '퀴즈 완료: 일차방정식',
    description: '일차방정식 퀴즈에서 85점을 받았습니다.',
    timestamp: '2026-03-21T14:20:00',
    xpEarned: 100,
  },
  {
    id: 'act-4',
    type: 'badge_earned',
    title: '배지 획득: 방정식 마스터',
    description: '일차방정식 코스를 모두 완료하여 배지를 획득했습니다.',
    timestamp: '2026-03-18T16:45:00',
    xpEarned: 50,
  },
  {
    id: 'act-5',
    type: 'lesson_complete',
    title: '수업 완료: 속력과 거리 문제',
    description: '실생활 문제와 도전 - 속력과 거리 문제 수업을 완료했습니다.',
    timestamp: '2026-03-17T10:15:00',
    xpEarned: 100,
  },
];

export const dashboardStats: DashboardStats = {
  totalLessons: 22,
  completedLessons: 12,
  totalQuizzes: 6,
  completedQuizzes: 2,
  averageScore: 85,
  currentStreak: 12,
  totalXp: 2450,
  weeklyXp: [180, 120, 200, 150, 250, 90, 60],
};
