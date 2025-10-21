import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const buttonClass = (lang: string) => 
    `px-3 py-1 rounded-md text-sm font-bold transition-colors duration-200 ${
      language === lang 
        ? 'bg-cyan-500 text-white' 
        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
    }`;

  return (
    <div className="flex items-center gap-2">
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
