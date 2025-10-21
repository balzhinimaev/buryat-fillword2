
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { Language } from '../types';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const buttonClass = (lang: Language) => 
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
      language === lang 
        ? 'bg-slate-800 text-white' 
        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    }`;

  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
      <button onClick={() => setLanguage('ru')} className={buttonClass('ru')}>
        РУС
      </button>
      <button onClick={() => setLanguage('en')} className={buttonClass('en')}>
        ENG
      </button>
    </div>
  );
};

export default LanguageSelector;