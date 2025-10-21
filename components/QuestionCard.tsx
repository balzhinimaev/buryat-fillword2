
import React from 'react';
import type { Question } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface QuestionCardProps {
  question: Question;
  onAnswerSelect: (optionIndex: number) => void;
  selectedAnswerIndex: number | null;
  isAnswered: boolean;
  isCorrect: boolean | null;
  showHint: boolean;
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswerSelect, selectedAnswerIndex, isAnswered, isCorrect, showHint }) => {
  const { language, t } = useTranslation();

  const displayedSentence = isAnswered && isCorrect
    ? question.sentenceTemplate.replace('___', ` ${question.blankWord} `)
    : question.sentenceTemplate.replace('___', ' _____ ');

  const getOptionClasses = (index: number) => {
    if (!isAnswered) {
      return "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-700";
    }
    const isSelected = selectedAnswerIndex === index;
    const isThisCorrect = question.options[index].isCorrect;

    if (isThisCorrect) {
      return "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold";
    }
    if (isSelected && !isThisCorrect) {
      return "bg-rose-50 border-rose-500 text-rose-900 font-semibold";
    }
    return "bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed";
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-slate-100 p-6 rounded-2xl text-center">
        <p className="text-2xl md:text-3xl font-medium text-slate-700">
          {displayedSentence}
        </p>
      </div>

      {showHint && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-center text-lg">
          {t('hintText')}: <strong className="font-semibold text-amber-900">"{question.blankWord.charAt(0)}"</strong>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={isAnswered}
            className={`flex items-center justify-between p-4 rounded-xl border-2 text-lg font-medium transition-all duration-200 disabled:transform-none disabled:opacity-100 ${getOptionClasses(index)}`}
            aria-label={`Answer: ${option.text[language]}`}
          >
            <span>{option.text[language]}</span>
            {isAnswered && selectedAnswerIndex === index && (
                isCorrect ? <CheckIcon/> : <XIcon/>
            )}
            {isAnswered && selectedAnswerIndex !== index && option.isCorrect && (
                <CheckIcon/>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;