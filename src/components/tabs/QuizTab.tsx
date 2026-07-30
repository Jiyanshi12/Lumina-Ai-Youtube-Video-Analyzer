import React, { useState } from 'react';
import {
  BrainCircuit,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { QuizQuestion } from '../../types';

interface QuizTabProps {
  questions: QuizQuestion[];
  onScoreSubmitted?: (score: number, total: number) => void;
}

export default function QuizTab({ questions, onScoreSubmitted }: QuizTabProps) {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'mcq' | 'short' | 'true_false'>('all');

  const filteredQuestions = questions.filter((q) => {
    if (activeFilter === 'all') return true;
    return q.type === activeFilter;
  });

  const handleSelectOption = (questionId: string, option: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleTextChange = (questionId: string, text: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: text }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correct = 0;
    questions.forEach((q) => {
      const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
      const correctAns = (q.correctAnswer || '').trim().toLowerCase();
      if (userAns === correctAns || (userAns && correctAns.includes(userAns))) {
        correct++;
      }
    });
    if (onScoreSubmitted) {
      onScoreSubmitted(correct, questions.length);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
      const correctAns = (q.correctAnswer || '').trim().toLowerCase();
      if (userAns === correctAns || (userAns && correctAns.includes(userAns))) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / (questions.length || 1)) * 100);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-indigo-600" />
            AI Video Knowledge Quiz ({questions.length} Questions)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">MCQs, Short Answers, and True/False questions generated from transcript</p>
        </div>

        {/* Question Type Filter */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              activeFilter === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('mcq')}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              activeFilter === 'mcq' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            MCQs
          </button>
          <button
            onClick={() => setActiveFilter('short')}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              activeFilter === 'short' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Short Answers
          </button>
          <button
            onClick={() => setActiveFilter('true_false')}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              activeFilter === 'true_false' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            True / False
          </button>
        </div>
      </div>

      {/* Score Results Card */}
      {submitted && (
        <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-white to-emerald-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm animate-in zoom-in-95">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 font-extrabold text-2xl shadow-xs">
              {percentage}%
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                Quiz Completed!
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                You scored <span className="font-bold text-emerald-700">{score}</span> out of{' '}
                <span className="font-bold text-slate-900">{questions.length}</span> correct (+{score * 15} points added to level!)
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, qIdx) => {
          const userAns = userAnswers[q.id] || '';
          const isCorrect =
            submitted &&
            (userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase() ||
              (userAns && q.correctAnswer.toLowerCase().includes(userAns.toLowerCase())));

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-5 transition-all shadow-sm ${
                submitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : 'border-rose-300 bg-rose-50/50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                    {qIdx + 1}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {q.type === 'mcq' ? 'MCQ' : q.type === 'true_false' ? 'True/False' : 'Short Answer'}
                  </span>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">
                  {q.difficulty}
                </span>
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-900 leading-relaxed">{q.question}</p>

              {/* Options for MCQ / True False */}
              {(q.type === 'mcq' || q.type === 'true_false') && q.options && (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAns === opt;
                    const isOptionCorrect = opt === q.correctAnswer;

                    let btnStyle = 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 hover:bg-slate-100';

                    if (submitted) {
                      if (isOptionCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-100 text-emerald-900 font-semibold';
                      } else if (isSelected && !isOptionCorrect) {
                        btnStyle = 'border-rose-500 bg-rose-100 text-rose-900 font-semibold';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-indigo-500 bg-indigo-50 text-indigo-900 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, opt)}
                        disabled={submitted}
                        className={`flex items-center justify-between rounded-xl border p-3 text-xs text-left transition-all ${btnStyle} cursor-pointer`}
                      >
                        <span>{opt}</span>
                        {submitted && isOptionCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
                        {submitted && isSelected && !isOptionCorrect && <XCircle className="h-4 w-4 text-rose-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Input for Short Answer */}
              {q.type === 'short' && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={userAns}
                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                    disabled={submitted}
                    placeholder="Type your answer here..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                  {submitted && (
                    <p className="mt-2 text-xs text-emerald-800 font-medium">
                      Expected Answer: <span className="font-semibold text-slate-900">{q.correctAnswer}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Explanation Dropdown on Submit */}
              {submitted && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800 space-y-1">
                  <span className="font-bold text-amber-800 flex items-center gap-1">
                    <HelpCircle className="h-3.5 w-3.5 text-amber-600" /> Explanation
                  </span>
                  <p className="text-slate-600 leading-snug">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Trigger */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 transition-all cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          <span>Submit Quiz Answers</span>
        </button>
      )}
    </div>
  );
}
