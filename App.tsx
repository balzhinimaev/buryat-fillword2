import React, { useState, useCallback, useEffect } from 'react';
import { QUESTIONS } from './constants';
import type { Question, Difficulty, Screen, TestHistoryItem } from './types';
import { mockUser, mockTestHistory } from './mocks/userData';

// Import Components
import QuestionCard from './components/QuestionCard';
import Scoreboard from './components/Scoreboard';
import FinalScore from './components/FinalScore';
import DifficultySelector from './components/DifficultySelector';
import Header from './components/Header';
import ProfileDrawer from './components/ProfileDrawer';
import TestHistory from './components/TestHistory';
import ConfirmModal from './components/ConfirmModal';

import { useTranslation } from './hooks/useTranslation';

const App: React.FC = () => {
  const { t } = useTranslation();

  // Navigation and UI State
  const [screen, setScreen] = useState<Screen>('difficulty');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // Game State
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [showHint, setShowHint] = useState(false);

  // Data State
  const [userHistory, setUserHistory] = useState<TestHistoryItem[]>(mockTestHistory);

  const currentQuestion = gameQuestions[currentQuestionIndex];
  const isCorrect = isAnswered && selectedAnswerIndex !== null ? currentQuestion?.options[selectedAnswerIndex].isCorrect : null;
  const isQuizFinished = screen === 'difficulty' && difficulty !== null;

  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    const filteredQuestions = QUESTIONS.filter(q => q.difficulty === selectedDifficulty);
    setGameQuestions(filteredQuestions);
    setDifficulty(selectedDifficulty);
    setHintsRemaining(3);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setShowHint(false);
    setScreen('quiz');
  };
  
  const handleAnswerSelect = useCallback((optionIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswerIndex(optionIndex);
    setIsAnswered(true);
    if (gameQuestions[currentQuestionIndex].options[optionIndex].isCorrect) {
      setScore(prev => prev + 1);
    }
  }, [currentQuestionIndex, isAnswered, gameQuestions]);

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < gameQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswerIndex(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      // Quiz finished, save to history
      const newHistoryItem: TestHistoryItem = {
        id: userHistory.length + 1,
        date: new Date().toISOString(),
        difficulty: difficulty!,
        score: score,
        total: gameQuestions.length,
        percentage: Math.round((score / gameQuestions.length) * 100)
      };
      setUserHistory(prev => [newHistoryItem, ...prev]);
      setScreen('difficulty'); // This will trigger the FinalScore view
    }
  };

  const resetQuizState = () => {
    setDifficulty(null);
    setGameQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setShowHint(false);
    setScreen('difficulty');
  };

  const handleUseHint = () => {
    if (hintsRemaining > 0 && !isAnswered && !showHint) {
      setHintsRemaining(prev => prev - 1);
      setShowHint(true);
    }
  };

  const handleConfirmExit = () => {
    // Here you could save partial progress if needed
    setIsExitModalOpen(false);
    resetQuizState();
  };

  const renderScreen = () => {
    if (isQuizFinished) {
      return <FinalScore score={score} totalQuestions={gameQuestions.length} onRestart={resetQuizState} />;
    }
    
    switch(screen) {
      case 'history':
        return <TestHistory history={userHistory} onBack={() => setScreen('difficulty')} />;
      case 'quiz':
        return (
          currentQuestion && (
            <>
              <Scoreboard score={score} currentQuestion={currentQuestionIndex + 1} totalQuestions={gameQuestions.length} hintsRemaining={hintsRemaining} />
              <div className="my-6 flex justify-end">
                <button
                  onClick={handleUseHint}
                  disabled={hintsRemaining === 0 || isAnswered || showHint}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
                >
                  💡 <span>{t('useHint').replace('💡 ', '')}</span>
                </button>
              </div>
              <QuestionCard
                question={currentQuestion}
                onAnswerSelect={handleAnswerSelect}
                selectedAnswerIndex={selectedAnswerIndex}
                isAnswered={isAnswered}
                isCorrect={isCorrect}
                showHint={showHint}
              />
              {isAnswered && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleNextQuestion}
                    className="w-full md:w-auto bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                  >
                    {currentQuestionIndex < gameQuestions.length - 1 ? t('nextQuestion') : t('finishQuiz')}
                  </button>
                </div>
              )}
            </>
          )
        );
      case 'difficulty':
      default:
        return <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 font-sans">
      <Header 
        onProfileClick={() => setIsProfileOpen(true)} 
        showExitButton={screen === 'quiz'}
        onExitClick={() => setIsExitModalOpen(true)}
      />
      <main className="pt-24 pb-8 px-4">
        <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-10">
          {renderScreen()}
        </div>
      </main>

      <ProfileDrawer
        user={mockUser}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onHistoryClick={() => {
          setIsProfileOpen(false);
          setScreen('history');
        }}
      />
      
      <ConfirmModal
        isOpen={isExitModalOpen}
        title={t('exitQuizTitle')}
        message={t('exitQuizMessage')}
        onConfirm={handleConfirmExit}
        onCancel={() => setIsExitModalOpen(false)}
      />
    </div>
  );
};

export default App;
