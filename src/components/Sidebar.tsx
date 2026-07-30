import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Video,
  BookOpenCheck,
  BrainCircuit,
  MessageSquare,
  Network,
  FolderKanban,
  CalendarCheck,
  BarChart2,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  videoCount: number;
}

export default function Sidebar({ activeTab, onSelectTab, videoCount }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add_video', label: 'Analyze Video', icon: PlusCircle, highlight: true },
    { id: 'library', label: 'Video Library', icon: Video, badge: videoCount },
    { id: 'collections', label: 'Study Collections', icon: FolderKanban },
    { id: 'flashcards', label: 'Flashcard Decks', icon: BookOpenCheck },
    { id: 'quizzes', label: 'Quiz Arena', icon: BrainCircuit },
    { id: 'tutor', label: 'AI Tutor Chat', icon: MessageSquare },
    { id: 'graph', label: 'Knowledge Graph', icon: Network },
    { id: 'revision', label: 'Revision Planner', icon: CalendarCheck },
    { id: 'analytics', label: 'Learning Analytics', icon: BarChart2 },
  ];

  return (
    <aside id="main-sidebar" className="w-full md:w-64 shrink-0 border-r border-slate-200 bg-white/80 p-3 md:min-h-[calc(100vh-65px)]">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm font-semibold'
                  : item.highlight
                  ? 'text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 border border-slate-200/60">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Pro AI Feature Banner */}
      <div className="mt-8 hidden md:block rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-semibold">Gemini 3.6 RAG Engine</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
          Real-time transcript chunking, flashcard synthesis & AI Tutor RAG.
        </p>
      </div>
    </aside>
  );
}
