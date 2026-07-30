import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { InterviewQuestion } from '../../types';

interface InterviewPrepTabProps {
  questions: InterviewQuestion[];
}

export default function InterviewPrepTab({ questions }: InterviewPrepTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(questions[0]?.id || null);

  if (!questions || questions.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
        <HelpCircle className="h-8 w-8 mx-auto text-slate-400 mb-2" />
        <p className="text-sm">No interview questions extracted for this video.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-indigo-600" />
          Technical Interview Questions ({questions.length})
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">High-frequency interview questions with model answers and key talking points</p>
      </div>

      <div className="space-y-3">
        {questions.map((q) => {
          const isExpanded = expandedId === q.id;
          return (
            <div
              key={q.id}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      q.difficulty === 'Junior'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : q.difficulty === 'Mid'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                    }`}
                  >
                    {q.difficulty} Level
                  </span>
                  <span className="text-sm font-bold text-slate-900">{q.question}</span>
                </div>
                {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
              </button>

              {isExpanded && (
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-4 animate-in fade-in">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                      Model Interview Answer:
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed font-normal">{q.answer}</p>
                  </div>

                  {q.keyPoints && q.keyPoints.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                        Key Recruiter Talking Points:
                      </span>
                      <div className="space-y-1">
                        {q.keyPoints.map((kp, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            <span>{kp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
