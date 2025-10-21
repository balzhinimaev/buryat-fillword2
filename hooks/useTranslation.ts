import { useContext } from 'react';
import { LocalizationContext } from '../context/LocalizationContext';

export const useTranslation = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LocalizationProvider');
  }
  return context;
};
