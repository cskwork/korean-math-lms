// 학습 관리 시스템 타입 정의

export interface User {
  id: string;
  name: string;
  grade: number;
  avatar: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  badges: Badge[];
  completedLessons: string[];
  completedQuizzes: string[];
  courseProgress: Record<string, number>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessonCount: number;
  lessonIds: string[];
  quizIds: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  xpReward: number;
  content: LessonSection[];
  keyPoints: string[];
  prerequisites: string[];
}

export interface LessonSection {
  type: 'text' | 'math' | 'example' | 'tip' | 'practice' | 'visual' | 'interactive';
  title?: string;
  content: string;
  math?: string;
  hint?: string;
  answer?: string;
  imageDescription?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  xpReward: number;
  timeLimit?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  math?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface ActivityItem {
  id: string;
  type: 'lesson_complete' | 'quiz_complete' | 'badge_earned' | 'streak';
  title: string;
  description: string;
  timestamp: string;
  xpEarned?: number;
}

export interface DashboardStats {
  totalLessons: number;
  completedLessons: number;
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
  currentStreak: number;
  totalXp: number;
  weeklyXp: number[];
}
