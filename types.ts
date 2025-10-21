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
