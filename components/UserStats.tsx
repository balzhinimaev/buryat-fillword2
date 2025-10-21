import React from 'react';
import type { UserStats } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface UserStatsProps {
  stats: UserStats;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, unit, color }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-4">
    <div className={`h-10 w-10 flex-shrink-0 rounded-lg flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-600">{label}</p>
      <p className="text-2xl font-semibold text-slate-800">
        {value}
        {unit && <span className="text-base font-medium text-slate-500 ml-1">{unit}</span>}
      </p>
    </div>
  </div>
);

const UserStats: React.FC<UserStatsProps> = ({ stats }) => {
  const { t } = useTranslation();
  
  const statItems = [
    { label: t('testsCompleted'), value: stats.testsCompleted, color: 'bg-emerald-100 text-emerald-700', icon: '🏆' },
    { label: t('averageScore'), value: `${stats.averageScore}%`, color: 'bg-sky-100 text-sky-700', icon: '📊' },
    { label: t('currentStreak'), value: stats.currentStreak, unit: t('days'), color: 'bg-amber-100 text-amber-700', icon: '🔥' },
    { label: t('totalQuestions'), value: stats.totalQuestionsAnswered, color: 'bg-violet-100 text-violet-700', icon: '❓' },
    { label: t('bestScore'), value: `${stats.bestScore}%`, color: 'bg-rose-100 text-rose-700', icon: '⭐' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {statItems.map(item => (
        <StatCard 
          key={item.label}
          label={item.label}
          value={item.value}
          unit={item.unit}
          color={item.color}
          icon={<span className="text-xl">{item.icon}</span>}
        />
      ))}
    </div>
  );
};

export default UserStats;
