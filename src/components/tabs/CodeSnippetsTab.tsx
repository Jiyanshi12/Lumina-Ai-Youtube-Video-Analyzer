import React, { useState } from 'react';
import { Code, Copy, Check, Sparkles, CheckCircle } from 'lucide-react';
import { CodeSnippet } from '../../types';

interface CodeSnippetsTabProps {
  snippets: CodeSnippet[];
}

export default function CodeSnippetsTab({ snippets }: CodeSnippetsTabProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!snippets || snippets.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
        <Code className="h-8 w-8 mx-auto text-slate-400 mb-2" />
        <p className="text-sm">No specific code snippets detected in this video.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Code className="h-4 w-4 text-indigo-600" />
          Extracted Code Snippets & Syntax Examples ({snippets.length})
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Clean, runnable code snippets parsed directly from video demonstration</p>
      </div>

      <div className="space-y-6">
        {snippets.map((snip) => (
          <div key={snip.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">
                  {snip.language}
                </span>
                <h4 className="text-xs font-bold text-slate-900">{snip.title}</h4>
              </div>
              <button
                onClick={() => handleCopyCode(snip.id, snip.code)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
              >
                {copiedId === snip.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                <span>{copiedId === snip.id ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 bg-slate-900 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-100 leading-relaxed whitespace-pre">
                <code>{snip.code}</code>
              </pre>
            </div>

            {/* Explanation & Best Practices */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
              <p className="text-xs text-slate-700 leading-relaxed">{snip.explanation}</p>

              {snip.bestPractices && snip.bestPractices.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                    Best Practices:
                  </span>
                  <div className="space-y-1">
                    {snip.bestPractices.map((bp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
