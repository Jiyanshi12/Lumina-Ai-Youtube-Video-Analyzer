import React, { useState } from 'react';
import { FolderKanban, Plus, BookOpen, ArrowRight, FolderPlus, Sparkles } from 'lucide-react';
import { Collection, VideoStudyPackage } from '../types';

interface StudyCollectionsViewProps {
  collections: Collection[];
  videoPackages: VideoStudyPackage[];
  onSelectVideo: (pkg: VideoStudyPackage) => void;
  onCreateCollection: (name: string, description: string) => void;
}

export default function StudyCollectionsView({
  collections,
  videoPackages,
  onSelectVideo,
  onCreateCollection,
}: StudyCollectionsViewProps) {
  const [selectedColId, setSelectedColId] = useState<string>(collections[0]?.id || '');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  const activeCollection = collections.find((c) => c.id === selectedColId) || collections[0];
  const collectionVideos = videoPackages.filter((pkg) => pkg.collectionId === selectedColId);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    onCreateCollection(newColName, newColDesc);
    setNewColName('');
    setNewColDesc('');
    setShowNewModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderKanban className="h-5 w-5 text-indigo-600" />
            Study Collections & Course Folders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Organize your YouTube AI study decks into structured learning topics</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>New Collection Folder</span>
        </button>
      </div>

      {/* Collection Folders Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {collections.map((col) => {
          const count = videoPackages.filter((p) => p.collectionId === col.id).length;
          const isSelected = selectedColId === col.id;
          return (
            <div
              key={col.id}
              onClick={() => setSelectedColId(col.id)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all shadow-sm ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50/80 shadow-md shadow-indigo-600/10'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">📁</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-700">
                  {count} Videos
                </span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900">{col.name}</h3>
              <p className="mt-1 text-xs text-slate-500 line-clamp-2">{col.description}</p>
            </div>
          );
        })}
      </div>

      {/* Active Folder Videos */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-base font-bold text-slate-900">Videos in {activeCollection?.name}</h2>

        {collectionVideos.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
            <BookOpen className="h-8 w-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm">No videos currently saved in this folder.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collectionVideos.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => onSelectVideo(pkg)}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-300 transition-all flex gap-3 group shadow-sm"
              >
                <img
                  src={pkg.metadata.thumbnailUrl}
                  alt={pkg.metadata.title}
                  className="h-20 w-32 rounded-xl object-cover shrink-0 border border-slate-200"
                />
                <div className="min-w-0 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600">{pkg.metadata.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{pkg.metadata.channelTitle}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-indigo-600 flex items-center gap-1">
                    Study Deck <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal to create folder */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Create New Study Collection</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-700 mb-1 font-medium">Collection Name</label>
                <input
                  type="text"
                  required
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  placeholder="e.g. Machine Learning & Neural Networks"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-700 mb-1 font-medium">Description</label>
                <textarea
                  value={newColDesc}
                  onChange={(e) => setNewColDesc(e.target.value)}
                  placeholder="Optional description..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
