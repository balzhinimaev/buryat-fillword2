import React from 'react';
import type { User } from '../types';
import UserStats from './UserStats';
import { useTranslation } from '../hooks/useTranslation';

interface ProfileDrawerProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onHistoryClick: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ user, isOpen, onClose, onHistoryClick }) => {
  const { t, language } = useTranslation();
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  const joinDate = new Date(user.joinDate).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-20 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-50 shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-800">{t('profile')}</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <div className="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center text-2xl font-semibold text-slate-600">
                {initials}
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-800">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-slate-600">@{user.username}</p>
                <p className="text-sm text-slate-500 mt-1">{t('joined')}: {joinDate}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex-grow overflow-y-auto">
            <UserStats stats={user.stats} />
          </div>
          
          <div className="p-6 border-t border-slate-200">
            <button
              onClick={onHistoryClick}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200"
            >
              {t('viewHistory')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;
