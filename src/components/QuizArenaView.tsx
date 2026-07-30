import React, { useState } from 'react';
import { BrainCircuit, Award, Sparkles, CheckCircle2, Play } from 'lucide-react';
import { VideoStudyPackage } from '../types';
import QuizTab from './tabs/QuizTab';

interface QuizArenaViewProps {
  videoPackages: VideoStudyPackage[];
  onScoreSubmitted?: (score: number, total: number) => void;
}

export default function QuizArenaView({ videoPackages, onScoreSubmitted }: QuizArenaViewProps) {
  const [selectedVideoId, setSelectedVideoId] = useState<string>(videoPackages[0]?.id || '');

  const activePackage = videoPackages.find((p) => p.id === selectedVideoId) || videoPackages[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-indigo-600" />
            Global Quiz Arena & Testing Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Test your understanding across all analyzed video study packages</p>
        </div>
      </div>

      {/* Select Video Package Dropdown */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="block text-xs font-semibold text-slate-700 mb-2">Select Video Package to Quiz:</label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {videoPackages.map((pkg) => {
            const isSelected = selectedVideoId === pkg.id;
            return (
              <button
                key={pkg.id}
                onClick={() => setSelectedVideoId(pkg.id)}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-600/10'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <img
                  src={pkg.metadata.thumbnailUrl}
                  alt={pkg.metadata.title}
                  className="h-12 w-20 rounded-lg object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{pkg.metadata.title}</h4>
                  <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">
                    {pkg.quizzes.length} Questions
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Quiz */}
      {activePackage && (
        <QuizTab questions={activePackage.quizzes} onScoreSubmitted={onScoreSubmitted} />
      )}
    </div>
  );
}
