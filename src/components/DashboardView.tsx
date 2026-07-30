import React, { useState } from 'react';
import {
  Youtube,
  Plus,
  Flame,
  Award,
  Clock,
  BookOpenCheck,
  BrainCircuit,
  ArrowRight,
  Folder,
  Sparkles,
  Calendar,
  Layers,
} from 'lucide-react';
import { UserProfile, VideoStudyPackage, Collection } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  videoPackages: VideoStudyPackage[];
  collections: Collection[];
  onSelectVideo: (pkg: VideoStudyPackage) => void;
  onOpenAddModal: () => void;
  onSelectTab: (tab: string) => void;
  onQuickAnalyzeSample: (url: string) => void;
}

export default function DashboardView({
  user,
  videoPackages,
  collections,
  onSelectVideo,
  onOpenAddModal,
  onSelectTab,
  onQuickAnalyzeSample,
}: DashboardViewProps) {
  const [quickUrl, setQuickUrl] = useState('');

  const sampleVideos = [
    {
      title: 'Next.js 15 App Router & Server Components',
      channel: 'Vercel Engineering',
      duration: '24:10',
      url: 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
      thumbnail: 'https://img.youtube.com/vi/wm5gMKuwSYk/hqdefault.jpg',
    },
    {
      title: 'System Design: Distributed Cache & Redis',
      channel: 'ByteByteGo',
      duration: '18:45',
      url: 'https://www.youtube.com/watch?v=Y0sT51v3w3c',
      thumbnail: 'https://img.youtube.com/vi/Y0sT51v3w3c/hqdefault.jpg',
    },
    {
      title: 'Python for Data Science & Machine Learning',
      channel: 'FreeCodeCamp',
      duration: '32:00',
      url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
      thumbnail: 'https://img.youtube.com/vi/LHBE6Q9XlzI/hqdefault.jpg',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 animate-in fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-200">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" /> Welcome Back, {user.name.split(' ')[0]}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Turn Any YouTube Video Into a Structured Study Experience
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Generate AI notes, flashcards, quizzes, coding snippets, and RAG tutor chat in seconds.
            </p>
          </div>

          {/* Key Metrics Pill Badges */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <Flame className="h-5 w-5 fill-current animate-pulse" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">{user.streakDays} Days</span>
                <p className="text-[10px] text-amber-800 font-medium">Active Streak</p>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">{user.quizScoreAvg}%</span>
                <p className="text-[10px] text-emerald-800 font-medium">Avg Quiz Score</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick URL Input Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Youtube className="absolute left-3.5 top-3.5 h-5 w-5 text-indigo-600 pointer-events-none" />
            <input
              type="text"
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              placeholder="Paste YouTube Video URL (e.g. https://www.youtube.com/watch?v=...)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={() => {
              if (quickUrl.trim()) {
                onQuickAnalyzeSample(quickUrl);
              } else {
                onOpenAddModal();
              }
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 transition-all shrink-0 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Analyze with AI</span>
          </button>
        </div>
      </div>

      {/* Recently Studied Video Packages */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recently Studied Videos</h2>
            <p className="text-xs text-slate-500">Pick up where you left off in your study decks</p>
          </div>
          <button
            onClick={() => onSelectTab('library')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            View All ({videoPackages.length}) <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videoPackages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onSelectVideo(pkg)}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={pkg.metadata.thumbnailUrl}
                    alt={pkg.metadata.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-mono font-bold text-white">
                    {pkg.metadata.duration}
                  </div>
                  <span className="absolute top-2 left-2 rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-md">
                    AI Ready
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-4 space-y-2">
                  <p className="text-xs font-medium text-slate-500 truncate">{pkg.metadata.channelTitle}</p>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                    {pkg.metadata.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{pkg.notes.summary}</p>
                </div>
              </div>

              {/* Card Footer Features Count */}
              <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px]">
                    <BookOpenCheck className="h-3.5 w-3.5 text-indigo-600" />
                    {pkg.flashcards.length}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <BrainCircuit className="h-3.5 w-3.5 text-emerald-600" />
                    {pkg.quizzes.length}
                  </span>
                </div>
                <span className="font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs">
                  Study <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Educational Videos */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900">Recommended Educational Videos</h2>
          <p className="text-xs text-slate-500">Click any video to test instant AI transcript analysis</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {sampleVideos.map((sample) => (
            <div
              key={sample.url}
              onClick={() => onQuickAnalyzeSample(sample.url)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3 hover:border-indigo-300 hover:bg-slate-50 transition-all flex items-center gap-3 group shadow-sm"
            >
              <img
                src={sample.thumbnail}
                alt={sample.title}
                className="h-16 w-24 rounded-lg object-cover shrink-0 border border-slate-200"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600">{sample.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{sample.channel}</p>
                <span className="mt-1 inline-block text-[10px] font-semibold text-indigo-600">Analyze Now →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
