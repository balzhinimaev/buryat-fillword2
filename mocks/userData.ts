import type { User, TestHistoryItem } from '../types';

export const mockUser: User = {
  id: '12345',
  firstName: 'Алексей',
  lastName: 'Петров',
  username: 'alexey_p',
  photoUrl: null, // Will show initials
  joinDate: '2024-01-15',
  stats: {
    testsCompleted: 24,
    averageScore: 78,
    currentStreak: 5,
    totalQuestionsAnswered: 156,
    bestScore: 95
  }
};

export const mockTestHistory: TestHistoryItem[] = [
  {
    id: 1,
    date: '2024-10-22T14:30:00Z',
    difficulty: 'Medium',
    score: 6,
    total: 8,
    percentage: 75
  },
  {
    id: 2,
    date: '2024-10-21T11:05:00Z',
    difficulty: 'Hard',
    score: 2,
    total: 4,
    percentage: 50
  },
  {
    id: 3,
    date: '2024-10-20T19:45:00Z',
    difficulty: 'Easy',
    score: 4,
    total: 4,
    percentage: 100
  },
  {
    id: 4,
    date: '2024-10-19T08:15:00Z',
    difficulty: 'Medium',
    score: 3,
    total: 8,
    percentage: 38
  },
];
