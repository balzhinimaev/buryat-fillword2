import React from 'react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../hooks/useTranslation';

interface HeaderProps {
  onProfileClick: () => void;
  showExitButton: boolean;
  onExitClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onProfileClick, showExitButton, onExitClick }) => {
  const { t } = useTranslation();
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-slate-200 z-10">
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between p-4 h-20">
        <div className="flex items-center gap-4">
          {showExitButton ? (
             <button onClick={onExitClick} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              &larr; {t('exitQuiz')}
            </button>
          ) : (
            <h1 className="text-xl font-semibold text-slate-800">{t('appTitle')}</h1>
          )}
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button 
            onClick={onProfileClick}
            className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center font-semibold text-slate-600 hover:bg-slate-300 transition-colors"
            aria-label={t('profile')}
          >
            АП
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
