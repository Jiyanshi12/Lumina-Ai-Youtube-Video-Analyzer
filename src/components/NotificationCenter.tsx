import React from 'react';
import { Bell, Flame, BookOpen, Award, CheckCircle2, X } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationCenterProps {
  notifications: NotificationItem[];
  onClose: () => void;
}

export default function NotificationCenter({ notifications, onClose }: NotificationCenterProps) {
  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white backdrop-blur-xl p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-indigo-600" />
          <h3 className="text-sm font-semibold text-slate-900">Notifications & Reminders</h3>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 space-y-2 max-h-80 overflow-y-auto pr-1">
        {notifications.length === 0 ? (
          <p className="py-6 text-center text-xs text-slate-500">No new notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`rounded-xl border p-3 transition-colors ${
                n.read
                  ? 'border-slate-200 bg-slate-50 opacity-70'
                  : 'border-slate-200 bg-indigo-50/40 hover:bg-indigo-50/80'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {n.type === 'streak' && <Flame className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />}
                {n.type === 'revision' && <BookOpen className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />}
                {n.type === 'quiz' && <Award className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />}
                {n.type === 'collection' && <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                  <p className="mt-0.5 text-[11px] text-slate-600 leading-snug">{n.message}</p>
                  <span className="mt-1 block text-[10px] text-slate-400">{n.time}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
