import React, { useState, useEffect } from 'react';
import {
  currentUserMock,
  samplePackages,
  sampleCollections,
  sampleNotifications,
} from './data/mockSampleData';
import {
  UserProfile,
  VideoStudyPackage,
  Collection,
  NotificationItem,
} from './types';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import VideoDetailView from './components/VideoDetailView';
import AddVideoModal from './components/AddVideoModal';
import StudyCollectionsView from './components/StudyCollectionsView';
import QuizArenaView from './components/QuizArenaView';
import AnalyticsView from './components/AnalyticsView';
import KnowledgeGraphTab from './components/tabs/KnowledgeGraphTab';
import FlashcardsTab from './components/tabs/FlashcardsTab';
import RevisionTab from './components/tabs/RevisionTab';
import AITutorTab from './components/tabs/AITutorTab';
import AuthModal from './components/AuthModal';
import { analyzeYouTubeVideo } from './services/api';

export default function App() {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ai_yt_user');
    return saved ? JSON.parse(saved) : currentUserMock;
  });

  const [videoPackages, setVideoPackages] = useState<VideoStudyPackage[]>(() => {
    const saved = localStorage.getItem('ai_yt_packages');
    return saved ? JSON.parse(saved) : samplePackages;
  });

  const [collections, setCollections] = useState<Collection[]>(() => {
    const saved = localStorage.getItem('ai_yt_collections');
    return saved ? JSON.parse(saved) : sampleCollections;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('ai_yt_notifications');
    return saved ? JSON.parse(saved) : sampleNotifications;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedPackage, setSelectedPackage] = useState<VideoStudyPackage | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('ai_yt_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ai_yt_packages', JSON.stringify(videoPackages));
  }, [videoPackages]);

  useEffect(() => {
    localStorage.setItem('ai_yt_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('ai_yt_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleVideoCreated = (newPackage: VideoStudyPackage) => {
    setVideoPackages((prev) => [newPackage, ...prev]);
    setSelectedPackage(newPackage);
    setShowAddModal(false);
    // Award points
    setUser((prev) => ({
      ...prev,
      points: prev.points + 100,
      totalHoursStudied: Number((prev.totalHoursStudied + 0.5).toFixed(1)),
    }));
  };

  const handleQuickAnalyzeSample = async (url: string) => {
    setShowAddModal(true);
  };

  const handleCreateCollection = (name: string, description: string) => {
    const newCol: Collection = {
      id: `col_${Date.now()}`,
      name,
      description,
      color: 'from-rose-500 to-amber-500',
      videoIds: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCollections((prev) => [...prev, newCol]);
  };

  const handleQuizScoreSubmitted = (score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    const addedPoints = score * 15;
    setUser((prev) => {
      const newScoreAvg = prev.quizScoreAvg === 0 ? percentage : Math.round((prev.quizScoreAvg + percentage) / 2);
      return {
        ...prev,
        points: prev.points + addedPoints,
        quizScoreAvg: newScoreAvg,
      };
    });
  };

  const handleToggleLearnedFlashcard = (_cardId: string, isLearned: boolean) => {
    setUser((prev) => ({
      ...prev,
      flashcardsLearned: Math.max(0, prev.flashcardsLearned + (isLearned ? 1 : -1)),
    }));
  };

  // Filter video packages by search query if typed
  const filteredPackages = videoPackages.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.metadata.title.toLowerCase().includes(q) ||
      p.metadata.channelTitle.toLowerCase().includes(q) ||
      p.notes.summary.toLowerCase().includes(q) ||
      p.notes.keyConcepts.some((k) => k.concept.toLowerCase().includes(q))
    );
  });

  // Global consolidated Knowledge Graph across all packages
  const globalGraph = {
    nodes: videoPackages.flatMap((p) => p.knowledgeGraph.nodes || []),
    edges: videoPackages.flatMap((p) => p.knowledgeGraph.edges || []),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        user={user}
        notifications={notifications}
        onOpenAddModal={() => setShowAddModal(true)}
        onSearch={(q) => setSearchQuery(q)}
        onOpenAuth={() => setShowAuthModal(true)}
        onSelectTab={(tab) => {
          setSelectedPackage(null);
          setActiveTab(tab);
        }}
        searchQuery={searchQuery}
      />

      <div className="flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={selectedPackage ? 'library' : activeTab}
          onSelectTab={(tab) => {
            setSelectedPackage(null);
            if (tab === 'add_video') {
              setShowAddModal(true);
            } else {
              setActiveTab(tab);
            }
          }}
          videoCount={videoPackages.length}
        />

        {/* Main Content Stage */}
        <main id="main-content" className="flex-1 p-4 md:p-8 overflow-x-hidden min-h-[calc(100vh-65px)]">
          {selectedPackage ? (
            <VideoDetailView
              packageData={selectedPackage}
              collections={collections}
              onBack={() => setSelectedPackage(null)}
              onScoreSubmitted={handleQuizScoreSubmitted}
              onToggleLearnedFlashcard={handleToggleLearnedFlashcard}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardView
                  user={user}
                  videoPackages={filteredPackages}
                  collections={collections}
                  onSelectVideo={(pkg) => setSelectedPackage(pkg)}
                  onOpenAddModal={() => setShowAddModal(true)}
                  onSelectTab={setActiveTab}
                  onQuickAnalyzeSample={handleQuickAnalyzeSample}
                />
              )}

              {activeTab === 'add_video' && (
                <AddVideoModal
                  collections={collections}
                  onVideoCreated={handleVideoCreated}
                  isStandalonePage={true}
                />
              )}

              {activeTab === 'library' && (
                <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-bold text-slate-900">Video Library ({filteredPackages.length})</h1>
                      <p className="text-xs text-slate-500 mt-0.5">All analyzed educational videos with synthesized AI study material</p>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className="cursor-pointer rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:border-slate-300 hover:shadow-md transition-all"
                      >
                        <img
                          src={pkg.metadata.thumbnailUrl}
                          alt={pkg.metadata.title}
                          className="aspect-video w-full object-cover"
                        />
                        <div className="p-5 space-y-2">
                          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                            {pkg.metadata.channelTitle}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{pkg.metadata.title}</h3>
                          <p className="text-xs text-slate-600 line-clamp-2">{pkg.notes.summary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'collections' && (
                <StudyCollectionsView
                  collections={collections}
                  videoPackages={videoPackages}
                  onSelectVideo={(pkg) => setSelectedPackage(pkg)}
                  onCreateCollection={handleCreateCollection}
                />
              )}

              {activeTab === 'flashcards' && videoPackages[0] && (
                <div className="max-w-7xl mx-auto space-y-4">
                  <h1 className="text-xl font-bold text-slate-900">All Flashcard Decks</h1>
                  <FlashcardsTab
                    flashcards={videoPackages.flatMap((p) => p.flashcards)}
                    onToggleLearned={handleToggleLearnedFlashcard}
                  />
                </div>
              )}

              {activeTab === 'quizzes' && (
                <QuizArenaView
                  videoPackages={videoPackages}
                  onScoreSubmitted={handleQuizScoreSubmitted}
                />
              )}

              {activeTab === 'tutor' && videoPackages[0] && (
                <div className="max-w-4xl mx-auto space-y-4">
                  <h1 className="text-xl font-bold text-slate-900">AI Learning Tutor Chat</h1>
                  <AITutorTab videoPackage={videoPackages[0]} />
                </div>
              )}

              {activeTab === 'graph' && (
                <div className="max-w-7xl mx-auto space-y-4">
                  <h1 className="text-xl font-bold text-slate-900">Global Knowledge Graph</h1>
                  <KnowledgeGraphTab graph={globalGraph} />
                </div>
              )}

              {activeTab === 'revision' && videoPackages[0] && (
                <div className="max-w-7xl mx-auto space-y-4">
                  <h1 className="text-xl font-bold text-slate-900">Revision Planner & Pomodoro</h1>
                  <RevisionTab schedule={videoPackages[0].revisionSchedule} />
                </div>
              )}

              {activeTab === 'analytics' && <AnalyticsView user={user} />}
            </>
          )}
        </main>
      </div>

      {/* Add Video Modal */}
      {showAddModal && (
        <AddVideoModal
          collections={collections}
          onVideoCreated={handleVideoCreated}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          user={user}
          onClose={() => setShowAuthModal(false)}
          onUpdateUser={(updated) => setUser(updated)}
        />
      )}
    </div>
  );
}
