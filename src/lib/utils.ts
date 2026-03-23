import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatXp(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K`;
  }
  return xp.toString();
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getGradeLabel(difficulty: string): string {
  const labels: Record<string, string> = {
    beginner: '기초',
    intermediate: '보통',
    advanced: '심화',
  };
  return labels[difficulty] || difficulty;
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    easy: 'text-green-600 bg-green-50',
    medium: 'text-yellow-600 bg-yellow-50',
    hard: 'text-red-600 bg-red-50',
    beginner: 'text-green-600 bg-green-50',
    intermediate: 'text-amber-600 bg-amber-50',
    advanced: 'text-rose-600 bg-rose-50',
  };
  return colors[difficulty] || 'text-gray-600 bg-gray-50';
}
