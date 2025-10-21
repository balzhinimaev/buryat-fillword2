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
      <h2 className="text-3xl font-bold text-cyan-400 mb-2">{t('quizCompleted')}</h2>
      <p className="text-xl text-slate-300 mb-4">{message}</p>
      <div className="text-5xl font-bold my-6">
        <span className={percentage >= 50 ? "text-green-400" : "text-red-400"}>
          {score}
        </span>
        <span className="text-3xl text-slate-400"> / {totalQuestions}</span>
      </div>
      <div className="text-2xl text-slate-200 mb-8">
          {t('yourScore')}: <span className="font-bold text-cyan-400">{percentage}%</span>
      </div>
      <button
        onClick={onRestart}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-10 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
      >
        {t('playAgain')}
      </button>
    </div>
  );
};

export default FinalScore;
