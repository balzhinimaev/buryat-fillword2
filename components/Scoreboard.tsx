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
    <div className="flex flex-wrap justify-between items-center mb-2 text-lg gap-4">
      <div className="font-semibold">
        {t('question')} <span className="text-cyan-400 font-bold">{currentQuestion}</span> / {totalQuestions}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg font-bold text-base">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h.01a1 1 0 100-2H11zM10 1a1 1 0 011 1v1.071a.999.999 0 00.874.99L13 4h.01a1 1 0 110 2H13a1 1 0 00-1 1v.01a1 1 0 11-2 0V6a1 1 0 00-1-1h-.01a1 1 0 110-2H9a1 1 0 00.874-.99L10 1.071V1a1 1 0 011-1zM9 15a1 1 0 100 2h2a1 1 0 100-2H9zM3 9a1 1 0 100 2h.01a1 1 0 100-2H3zM16 9a1 1 0 100 2h.01a1 1 0 100-2H16zM5.992 13.414a1 1 0 101.414 1.414 1 1 0 00-1.414-1.414zM12.586 13.414a1 1 0 101.414 1.414 1 1 0 00-1.414-1.414zM5.992 6.586a1 1 0 101.414-1.414 1 1 0 00-1.414 1.414zM12.586 6.586a1 1 0 101.414-1.414 1 1 0 00-1.414 1.414z" />
          </svg>
          <span className="text-slate-300">{t('hints')}: <span className="text-yellow-400">{hintsRemaining}</span></span>
        </div>
        <div className="bg-slate-700/50 px-4 py-2 rounded-lg font-bold text-base">
          {t('score')}: <span className="text-green-400">{score}</span>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
