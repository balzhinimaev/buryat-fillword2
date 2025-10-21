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
      return "bg-slate-700 hover:bg-slate-600 border-slate-600 hover:border-cyan-500";
    }
    const isSelected = selectedAnswerIndex === index;
    const isThisCorrect = question.options[index].isCorrect;

    if (isThisCorrect) {
      return "bg-green-700/50 border-green-500 text-white";
    }
    if (isSelected && !isThisCorrect) {
      return "bg-red-700/50 border-red-500 text-white";
    }
    return "bg-slate-700/50 border-slate-600 text-gray-400 cursor-not-allowed";
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/50 p-6 rounded-lg text-center">
        <p className="text-2xl md:text-3xl font-medium tracking-wider text-cyan-200">
          {displayedSentence}
        </p>
      </div>

      {showHint && (
        <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-200 p-3 rounded-lg text-center text-lg">
          {t('hintText')}: <strong className="text-yellow-300 text-xl">"{question.blankWord.charAt(0)}"</strong>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={isAnswered}
            className={`flex items-center justify-between p-4 rounded-lg border-2 text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 disabled:transform-none disabled:opacity-75 ${getOptionClasses(index)}`}
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
