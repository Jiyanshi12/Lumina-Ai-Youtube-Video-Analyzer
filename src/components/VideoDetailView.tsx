import React, { useState, useRef } from 'react';
import {
  FileText,
  BookOpenCheck,
  BrainCircuit,
  Code,
  Clock,
  HelpCircle,
  MessageSquare,
  Network,
  CalendarCheck,
  ArrowLeft,
  Youtube,
  Share2,
  FolderPlus,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { VideoStudyPackage, Collection } from '../types';
import AINotesTab from './tabs/AINotesTab';
import FlashcardsTab from './tabs/FlashcardsTab';
import QuizTab from './tabs/QuizTab';
import CodeSnippetsTab from './tabs/CodeSnippetsTab';
import SmartTimelineTab from './tabs/SmartTimelineTab';
import InterviewPrepTab from './tabs/InterviewPrepTab';
import AITutorTab from './tabs/AITutorTab';
import KnowledgeGraphTab from './tabs/KnowledgeGraphTab';
import RevisionTab from './tabs/RevisionTab';

interface VideoDetailViewProps {
  packageData: VideoStudyPackage;
  collections: Collection[];
  onBack: () => void;
  onScoreSubmitted?: (score: number, total: number) => void;
  onToggleLearnedFlashcard?: (cardId: string, isLearned: boolean) => void;
}

export default function VideoDetailView({
  packageData,
  collections,
  onBack,
  onScoreSubmitted,
  onToggleLearnedFlashcard,
}: VideoDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'flashcards' | 'quiz' | 'code' | 'timeline' | 'interview' | 'tutor' | 'graph' | 'revision'>('notes');
  const [seekSeconds, setSeekSeconds] = useState<number | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  const tabs = [
    { id: 'notes', label: 'AI Notes', icon: FileText },
    { id: 'flashcards', label: `Flashcards (${packageData.flashcards.length})`, icon: BookOpenCheck },
    { id: 'quiz', label: `Quiz (${packageData.quizzes.length})`, icon: BrainCircuit },
    { id: 'code', label: `Code (${packageData.codeSnippets.length})`, icon: Code },
    { id: 'timeline', label: 'Smart Timeline', icon: Clock },
    { id: 'interview', label: 'Interview Prep', icon: HelpCircle },
    { id: 'tutor', label: 'AI Tutor Chat', icon: MessageSquare },
    { id: 'graph', label: 'Knowledge Graph', icon: Network },
    { id: 'revision', label: 'Revision Plan', icon: CalendarCheck },
  ];

  const handleSeekTo = (seconds: number) => {
    setSeekSeconds(seconds);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const embedUrl = `https://www.youtube-nocookie.com/embed/${packageData.metadata.youtubeId}?autoplay=1${
    seekSeconds !== null ? `&start=${seekSeconds}` : ''
  }`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Back Button & Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copiedShare ? 'Link Copied!' : 'Share Study Deck'}</span>
          </button>
          <a
            href={packageData.metadata.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm"
          >
            <Youtube className="h-3.5 w-3.5 text-rose-600" />
            <span>Open on YouTube</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Video Banner & Player Card */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="grid lg:grid-cols-3 gap-6 p-4 sm:p-6">
          {/* Embedded Player */}
          <div className="lg:col-span-2 relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-black shadow-md">
            <iframe
              src={embedUrl}
              title={packageData.metadata.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Metadata Brief */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="rounded-md bg-indigo-50 border border-indigo-200 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
                {packageData.metadata.category || 'Education'}
              </span>
              <h1 className="text-base font-bold text-slate-900 leading-snug">{packageData.metadata.title}</h1>
              <p className="text-xs text-slate-500">{packageData.metadata.channelTitle}</p>
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                <span>⏱️ {packageData.metadata.duration}</span>
                <span>•</span>
                <span>👀 {packageData.metadata.views}</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 text-center">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                <span className="text-xs font-bold text-indigo-700 block">{packageData.flashcards.length}</span>
                <span className="text-[10px] text-slate-500">Flashcards</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                <span className="text-xs font-bold text-emerald-700 block">{packageData.quizzes.length}</span>
                <span className="text-[10px] text-slate-500">Quiz Questions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation Header */}
      <div className="flex items-center gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents View */}
      <div className="pt-2">
        {activeTab === 'notes' && <AINotesTab notes={packageData.notes} videoTitle={packageData.metadata.title} />}
        {activeTab === 'flashcards' && <FlashcardsTab flashcards={packageData.flashcards} onToggleLearned={onToggleLearnedFlashcard} />}
        {activeTab === 'quiz' && <QuizTab questions={packageData.quizzes} onScoreSubmitted={onScoreSubmitted} />}
        {activeTab === 'code' && <CodeSnippetsTab snippets={packageData.codeSnippets} />}
        {activeTab === 'timeline' && <SmartTimelineTab timeline={packageData.timeline} onSeekTo={handleSeekTo} />}
        {activeTab === 'interview' && <InterviewPrepTab questions={packageData.interviewQuestions} />}
        {activeTab === 'tutor' && <AITutorTab videoPackage={packageData} />}
        {activeTab === 'graph' && <KnowledgeGraphTab graph={packageData.knowledgeGraph} />}
        {activeTab === 'revision' && <RevisionTab schedule={packageData.revisionSchedule} />}
      </div>
    </div>
  );
}
