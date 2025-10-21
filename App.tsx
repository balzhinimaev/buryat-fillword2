import React, { useState, useCallback } from 'react';
import { QUESTIONS } from './constants';
import type { Question } from './types';
import QuestionCard from './components/QuestionCard';
import Scoreboard from './components/Scoreboard';
import FinalScore from './components/FinalScore';
import DifficultySelector from './components/DifficultySelector';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from './hooks/useTranslation';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = gameQuestions[currentQuestionIndex];
  const isCorrect = isAnswered && selectedAnswerIndex !== null ? currentQuestion?.options[selectedAnswerIndex].isCorrect : null;

  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    const filteredQuestions = QUESTIONS.filter(q => q.difficulty === selectedDifficulty);
    setGameQuestions(filteredQuestions);
    setDifficulty(selectedDifficulty);
    setHintsRemaining(3);
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
      setShowFinalScore(true);
    }
  };

  const handleRestart = () => {
    setDifficulty(null);
    setGameQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setShowFinalScore(false);
    setShowHint(false);
  };

  const handleUseHint = () => {
    if (hintsRemaining > 0 && !isAnswered && !showHint) {
      setHintsRemaining(prev => prev - 1);
      setShowHint(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
            <div className="flex justify-between items-start mb-2 relative">
                <div className="absolute top-0 left-0"></div>
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                    {t('appTitle')}
                  </h1>
                </div>
                <div className="absolute top-0 right-0">
                    <LanguageSelector />
                </div>
            </div>
          <p className="text-slate-400 mt-2">{t('appSubtitle')}</p>
        </header>

        <main className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 md:p-8">
          {difficulty === null ? (
            <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
          ) : showFinalScore ? (
            <FinalScore score={score} totalQuestions={gameQuestions.length} onRestart={handleRestart} />
          ) : (
            currentQuestion && (
              <>
                <Scoreboard score={score} currentQuestion={currentQuestionIndex + 1} totalQuestions={gameQuestions.length} hintsRemaining={hintsRemaining} />
                
                <div className="my-4 flex justify-end">
                  <button
                    onClick={handleUseHint}
                    disabled={hintsRemaining === 0 || isAnswered || showHint}
                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {t('useHint').startsWith('💡') ? (
                      <>
                        <span role="img" aria-label="light bulb">💡</span>
                        {t('useHint').replace('💡 ', '')}
                      </>
                    ) : t('useHint')}
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
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleNextQuestion}
                      className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
                    >
                      {currentQuestionIndex < gameQuestions.length - 1 ? t('nextQuestion') : t('finishQuiz')}
                    </button>
                  </div>
                )}
              </>
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
