import React, { useState } from 'react';
import { Youtube, Sparkles, FolderPlus, ArrowRight, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Collection, VideoStudyPackage } from '../types';
import { analyzeYouTubeVideo, fetchVideoMetadata } from '../services/api';

interface AddVideoModalProps {
  collections: Collection[];
  onVideoCreated: (newPackage: VideoStudyPackage) => void;
  onClose?: () => void;
  isStandalonePage?: boolean;
}

export default function AddVideoModal({
  collections,
  onVideoCreated,
  onClose,
  isStandalonePage = false,
}: AddVideoModalProps) {
  const [url, setUrl] = useState('');
  const [selectedCollection, setSelectedCollection] = useState(collections[0]?.id || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [previewMeta, setPreviewMeta] = useState<any>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  const steps = [
    'Validating URL & fetching video metadata...',
    'Extracting transcript & temporal timestamps...',
    'Running Gemini AI to synthesize structured notes & flashcards...',
    'Building quizzes, code snippets, and knowledge graph...',
  ];

  const handleUrlChange = async (newUrl: string) => {
    setUrl(newUrl);
    setErrorMsg('');

    if (newUrl.includes('youtube.com/') || newUrl.includes('youtu.be/')) {
      setIsLoadingPreview(true);
      try {
        const meta = await fetchVideoMetadata(newUrl);
        setPreviewMeta(meta);
      } catch (err) {
        setPreviewMeta(null);
      } finally {
        setIsLoadingPreview(false);
      }
    } else {
      setPreviewMeta(null);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setErrorMsg('Please paste a valid YouTube video URL');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg('');
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1200);

    try {
      const result = await analyzeYouTubeVideo(url, selectedCollection);
      clearInterval(stepInterval);
      setAnalysisStep(3);
      setTimeout(() => {
        setIsAnalyzing(false);
        onVideoCreated(result);
      }, 600);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setErrorMsg(err.message || 'Failed to analyze YouTube video. Please try another URL.');
    }
  };

  const sampleQuickUrls = [
    { title: 'React 19 Server Actions Guide', url: 'https://www.youtube.com/watch?v=SqcY0GlETPk' },
    { title: 'Data Structures & Algorithms BFS/DFS', url: 'https://www.youtube.com/watch?v=8hly31xKli0' },
    { title: 'System Design Microservices', url: 'https://www.youtube.com/watch?v=Y0sT51v3w3c' },
  ];

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
            <Youtube className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Analyze YouTube Educational Video</h2>
            <p className="text-xs text-slate-500">
              Paste a video URL to generate AI notes, 20+ flashcards, quizzes, coding snippets, & tutor chat.
            </p>
          </div>
        </div>
        {onClose && !isStandalonePage && (
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {!isAnalyzing ? (
        <form onSubmit={handleAnalyze} className="space-y-5">
          {/* URL Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              YouTube Video URL
            </label>
            <div className="relative">
              <input
                id="input-youtube-url"
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="e.g. https://www.youtube.com/watch?v=..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              {isLoadingPreview && (
                <div className="absolute right-3 top-3.5 flex items-center gap-1.5 text-xs text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                  Fetching info...
                </div>
              )}
            </div>
          </div>

          {/* Video Preview Card */}
          {previewMeta && (
            <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 animate-in fade-in">
              <img
                src={previewMeta.thumbnailUrl}
                alt={previewMeta.title}
                className="h-20 w-32 rounded-xl object-cover border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 truncate">{previewMeta.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{previewMeta.channelTitle}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[10px] text-slate-700 font-medium">
                    Duration: {previewMeta.duration}
                  </span>
                  <span className="rounded-md bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] text-indigo-700 font-medium">
                    Ready for AI Analysis
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Demo Options */}
          <div>
            <span className="text-[11px] font-medium text-slate-500">Or pick a sample video:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {sampleQuickUrls.map((sample) => (
                <button
                  key={sample.url}
                  type="button"
                  onClick={() => handleUrlChange(sample.url)}
                  className="rounded-lg border border-slate-200 bg-slate-100/80 px-3 py-1.5 text-xs text-slate-700 hover:border-indigo-300 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  {sample.title}
                </button>
              ))}
            </div>
          </div>

          {/* Folder / Collection Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Save to Study Collection Folder
            </label>
            <div className="relative">
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all cursor-pointer"
              >
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    📁 {col.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Trigger */}
          <button
            id="btn-submit-analyze-video"
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Transform Video into AI Study Experience</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      ) : (
        /* Progress Stepper */
        <div className="py-8 space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-200">
              <Sparkles className="h-8 w-8 text-indigo-600 animate-pulse" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">Synthesizing Learning Experience...</h3>
            <p className="mt-1 text-xs text-slate-500">Gemini 3.6 Flash is extracting deep insights from video transcript</p>
          </div>

          <div className="space-y-3 max-w-md mx-auto">
            {steps.map((stepText, idx) => {
              const isDone = analysisStep > idx;
              const isCurrent = analysisStep === idx;
              return (
                <div
                  key={stepText}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                    isDone
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : isCurrent
                      ? 'border-indigo-300 bg-indigo-50 text-indigo-900'
                      : 'border-slate-200 bg-slate-50 text-slate-400'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="h-4 w-4 text-indigo-600 animate-spin shrink-0" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span className="text-xs font-medium">{stepText}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  if (isStandalonePage) {
    return (
      <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
        {content}
      </div>
    </div>
  );
}
