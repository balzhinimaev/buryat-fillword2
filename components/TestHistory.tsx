import React from 'react';
import type { TestHistoryItem, Difficulty } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface TestHistoryProps {
  history: TestHistoryItem[];
  onBack: () => void;
}

const getDifficultyClasses = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'Easy': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Hard': return 'bg-rose-100 text-rose-800 border-rose-200';
  }
};

const getPercentageColor = (percentage: number) => {
  if (percentage >= 80) return 'text-emerald-600';
  if (percentage >= 50) return 'text-amber-600';
  return 'text-rose-600';
};

const TestHistory: React.FC<TestHistoryProps> = ({ history, onBack }) => {
  const { t, language } = useTranslation();

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
         <button onClick={onBack} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            {t('back')}
        </button>
        <h2 className="text-2xl font-semibold text-slate-800">{t('testHistory')}</h2>
        <div className="w-16"></div>
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-12 px-6 bg-slate-50 rounded-2xl">
          <p className="text-slate-600">{t('noHistory')}</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {history.map(item => (
            <div key={item.id} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-700">
                  {new Date(item.date).toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-sm text-slate-500">
                  {new Date(item.date).toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className={`text-sm font-medium px-3 py-1 rounded-full border ${getDifficultyClasses(item.difficulty)}`}>
                {t(item.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard')}
              </div>
              <div className="text-right">
                <p className={`text-xl font-semibold ${getPercentageColor(item.percentage)}`}>
                  {item.percentage}%
                </p>
                <p className="text-sm text-slate-500">{item.score} / {item.total}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestHistory;
