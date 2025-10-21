
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface FinalScoreProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const FinalScore: React.FC<FinalScoreProps> = ({ score, totalQuestions, onRestart }) => {
  const { t } = useTranslation();
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  let message = "";
  if (percentage >= 80) {
    message = t('excellent');
  } else if (percentage >= 50) {
    message = t('goodJob');
  } else {
    message = t('keepPracticing');
  }

  return (
    <div className="text-center flex flex-col items-center justify-center py-8">
      <h2 className="text-3xl font-semibold text-slate-800 mb-2">{t('quizCompleted')}</h2>
      <p className="text-lg text-slate-600 mb-6">{message}</p>
      <div className="text-6xl font-semibold my-4">
        <span className={percentage >= 50 ? "text-emerald-500" : "text-rose-500"}>
          {score}
        </span>
        <span className="text-4xl text-slate-400"> / {totalQuestions}</span>
      </div>
      <div className="text-xl text-slate-600 mb-8">
          {t('yourScore')}: <span className="font-semibold text-slate-800">{percentage}%</span>
      </div>
      <button
        onClick={onRestart}
        className="bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
      >
        {t('playAgain')}
      </button>
    </div>
  );
};

export default FinalScore;