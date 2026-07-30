import React from 'react';
import { Clock, Play, Sparkles } from 'lucide-react';
import { TimelineItem } from '../../types';

interface SmartTimelineTabProps {
  timeline: TimelineItem[];
  onSeekTo: (seconds: number) => void;
}

export default function SmartTimelineTab({ timeline, onSeekTo }: SmartTimelineTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Clock className="h-4 w-4 text-indigo-600" />
          Smart Video Timeline & Jump Points
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Click any timestamp to jump directly to that moment in the embedded video player</p>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 space-y-6">
        {timeline.map((item) => (
          <div key={item.id} className="relative pl-6 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-indigo-600 bg-white transition-transform group-hover:scale-125" />

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-600">{item.timestamp}</span>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.summary}</p>
              </div>

              <button
                onClick={() => onSeekTo(item.timeInSeconds)}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-50 border border-indigo-200 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shrink-0 cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Jump ({item.timestamp})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
