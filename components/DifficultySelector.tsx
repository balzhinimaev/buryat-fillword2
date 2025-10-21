import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty }) => {
  const { t } = useTranslation();

  const difficulties: { level: Difficulty; colors: string, ring: string, key: 'easy' | 'medium' | 'hard' }[] = [
      { level: 'Easy', colors: 'from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600', ring: 'focus:ring-green-400/50', key: 'easy' },
      { level: 'Medium', colors: 'from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600', ring: 'focus:ring-yellow-400/50', key: 'medium' },
      { level: 'Hard', colors: 'from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700', ring: 'focus:ring-red-400/50', key: 'hard' },
  ];

  return (
    <div className="text-center flex flex-col items-center justify-center py-8">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">{t('chooseDifficulty')}</h2>
      <div className="flex flex-col md:flex-row gap-4">
        {difficulties.map(({level, colors, ring, key}) => (
          <button
            key={level}
            onClick={() => onSelectDifficulty(level)}
            className={`bg-gradient-to-r ${colors} text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 ${ring}`}
          >
            {t(key)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
