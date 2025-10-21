export interface AnswerOption {
  text: {
    en: string;
    ru: string;
  };
  isCorrect: boolean;
}

export interface Question {
  id: number;
  sentenceTemplate: string;
  blankWord: string;
  options: AnswerOption[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export type Language = 'ru' | 'en';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Screen = 'difficulty' | 'quiz' | 'history';

export interface UserStats {
  testsCompleted: number;
  averageScore: number;
  currentStreak: number;
  totalQuestionsAnswered: number;
  bestScore: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  photoUrl: string | null;
  joinDate: string;
  stats: UserStats;
}

export interface TestHistoryItem {
  id: number;
  date: string;
  difficulty: Difficulty;
  score: number;
  total: number;
  percentage: number;
}
