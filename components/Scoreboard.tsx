
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface ScoreboardProps {
  score: number;
  currentQuestion: number;
  totalQuestions: number;
  hintsRemaining: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, currentQuestion, totalQuestions, hintsRemaining }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap justify-between items-center text-slate-600 text-base gap-3">
      <div className="bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl">
        {t('question')}: <span className="font-semibold text-slate-800">{currentQuestion}</span> / {totalQuestions}
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl">
          {t('hints')}: <span className="font-semibold text-amber-600">{hintsRemaining}</span>
        </div>
        <div className="bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl">
          {t('score')}: <span className="font-semibold text-emerald-600">{score}</span>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;