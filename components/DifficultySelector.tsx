
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty }) => {
  const { t } = useTranslation();

  const difficulties: { level: Difficulty; colors: string; key: 'easy' | 'medium' | 'hard' }[] = [
    { level: 'Easy', colors: 'bg-emerald-500 hover:bg-emerald-600', key: 'easy' },
    { level: 'Medium', colors: 'bg-amber-500 hover:bg-amber-600', key: 'medium' },
    { level: 'Hard', colors: 'bg-rose-500 hover:bg-rose-600', key: 'hard' },
  ];

  return (
    <div className="text-center flex flex-col items-center justify-center py-12">
      <h2 className="text-3xl font-semibold text-slate-800 mb-8">{t('chooseDifficulty')}</h2>
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        {difficulties.map(({level, colors, key}) => (
          <button
            key={level}
            onClick={() => onSelectDifficulty(level)}
            className={`${colors} text-white font-medium py-3 px-10 rounded-2xl text-lg transition-all duration-200 shadow-sm hover:shadow-md`}
          >
            {t(key)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;