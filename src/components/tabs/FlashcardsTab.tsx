import React, { useState } from 'react';
import {
  BookOpen,
  RotateCw,
  CheckCircle2,
  Bookmark,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  Award,
} from 'lucide-react';
import { Flashcard } from '../../types';

interface FlashcardsTabProps {
  flashcards: Flashcard[];
  onToggleLearned?: (cardId: string, isLearned: boolean) => void;
}

export default function FlashcardsTab({ flashcards: initialFlashcards, onToggleLearned }: FlashcardsTabProps) {
  const [cards, setCards] = useState<Flashcard[]>(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  const filteredCards = cards.filter((c) => {
    if (filterDifficulty === 'All') return true;
    if (filterDifficulty === 'Bookmarked') return c.isBookmarked;
    if (filterDifficulty === 'Unlearned') return !c.isLearned;
    return c.difficulty === filterDifficulty;
  });

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % (filteredCards.length || 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + (filteredCards.length || 1)) % (filteredCards.length || 1));
  };

  const toggleLearned = (id: string) => {
    const targetCard = cards.find((c) => c.id === id);
    if (!targetCard) return;
    const nextState = !targetCard.isLearned;
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isLearned: nextState } : c))
    );
    if (onToggleLearned) {
      onToggleLearned(id, nextState);
    }
  };

  const toggleBookmark = (id: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isBookmarked: !c.isBookmarked } : c))
    );
  };

  const learnedCount = cards.filter((c) => c.isLearned).length;
  const progressPercent = Math.round((learnedCount / (cards.length || 1)) * 100);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Progress & Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              Interactive Flashcard Deck ({cards.length} Cards)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Click card to flip and test memory recall</p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={filterDifficulty}
              onChange={(e) => {
                setFilterDifficulty(e.target.value);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Cards</option>
              <option value="Unlearned">Unlearned Only</option>
              <option value="Bookmarked">Bookmarked</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Mastery Progress</span>
            <span className="font-semibold text-indigo-600">{learnedCount} / {cards.length} Learned ({progressPercent}%)</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
          <BookOpen className="h-8 w-8 mx-auto text-slate-400 mb-2" />
          <p className="text-sm">No flashcards matching the selected filter.</p>
        </div>
      ) : (
        /* Main Card Arena */
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Card {currentIndex + 1} of {filteredCards.length}</span>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                  currentCard.difficulty === 'Easy'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : currentCard.difficulty === 'Medium'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {currentCard.difficulty}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium">{currentCard.topic}</span>
            </div>
          </div>

          {/* Flip Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="group relative min-h-[280px] sm:min-h-[320px] w-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md flex flex-col justify-between"
          >
            {/* Top Action Row on Card */}
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-indigo-600 font-semibold text-[11px] uppercase tracking-wider">
                <RotateCw className="h-3.5 w-3.5" />
                {isFlipped ? 'ANSWER (CLICK TO FLIP)' : 'QUESTION (CLICK TO FLIP)'}
              </span>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => toggleBookmark(currentCard.id)}
                  className={`rounded-xl p-2 transition-colors cursor-pointer ${
                    currentCard.isBookmarked
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                  }`}
                  title="Bookmark Card"
                >
                  <Bookmark className="h-4 w-4 fill-current" />
                </button>
                <button
                  onClick={() => toggleLearned(currentCard.id)}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    currentCard.isLearned
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{currentCard.isLearned ? 'Learned' : 'Mark Learned'}</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="my-auto py-6">
              {!isFlipped ? (
                <p className="text-lg sm:text-xl font-bold text-slate-900 text-center leading-relaxed">
                  {currentCard.question}
                </p>
              ) : (
                <div className="space-y-2 text-center animate-in fade-in zoom-in-95">
                  <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
                    {currentCard.answer}
                  </p>
                </div>
              )}
            </div>

            {/* Card Footer Hint */}
            <div className="text-center text-[11px] text-slate-400 font-medium">
              Click anywhere on card to flip
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <RotateCw className="h-3.5 w-3.5 text-indigo-600" />
              Flip Card
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer shadow-sm"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
