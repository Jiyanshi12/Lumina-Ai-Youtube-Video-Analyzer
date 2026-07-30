import React, { useState, useEffect } from 'react';
import { CalendarCheck, Play, Pause, RotateCcw, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { RevisionSchedule } from '../../types';

interface RevisionTabProps {
  schedule: RevisionSchedule;
}

export default function RevisionTab({ schedule }: RevisionTabProps) {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const toggleTask = (taskKey: string) => {
    setCompletedTasks((prev) => ({ ...prev, [taskKey]: !prev[taskKey] }));
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-indigo-600" />
            Spaced Repetition Revision Planner
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Automated study schedule based on forgetting curve memory science</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-800">
            ⏱️ {schedule.estimatedMinutes} Mins Total
          </span>
          <span className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
            🍅 {schedule.pomodoroSessions} Pomodoros
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revision Timelines */}
        <div className="lg:col-span-2 space-y-4">
          {/* Today Tasks */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm">
            <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
              Today's Revision Focus
            </h4>
            <div className="space-y-2">
              {schedule.todayTasks.map((task, idx) => {
                const key = `today_${idx}`;
                const done = completedTasks[key];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleTask(key)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-xs text-left transition-all cursor-pointer ${
                      done
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800 line-through'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span>{task}</span>
                    <CheckCircle2 className={`h-4 w-4 ${done ? 'text-emerald-600' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tomorrow Tasks */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm">
            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Tomorrow's Review (Day 2)
            </h4>
            <div className="space-y-2">
              {schedule.tomorrowTasks.map((task, idx) => {
                const key = `tomorrow_${idx}`;
                const done = completedTasks[key];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleTask(key)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-xs text-left transition-all cursor-pointer ${
                      done
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800 line-through'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span>{task}</span>
                    <CheckCircle2 className={`h-4 w-4 ${done ? 'text-emerald-600' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next Week Tasks */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm">
            <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Next Week Consolidation (Day 7)
            </h4>
            <div className="space-y-2">
              {schedule.nextWeekTasks.map((task, idx) => {
                const key = `nextweek_${idx}`;
                const done = completedTasks[key];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleTask(key)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-xs text-left transition-all cursor-pointer ${
                      done
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800 line-through'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span>{task}</span>
                    <CheckCircle2 className={`h-4 w-4 ${done ? 'text-emerald-600' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Integrated Pomodoro Focus Timer */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-between text-center shadow-sm">
          <div>
            <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-[10px] font-semibold text-indigo-700">
              POMODORO FOCUS TIMER
            </span>
            <h4 className="text-base font-bold text-slate-900 mt-3">25 Minute Study Sprint</h4>
            <p className="text-xs text-slate-500 mt-1">Focus on reviewing flashcards and notes without distraction.</p>
          </div>

          <div className="my-6">
            <div className="text-5xl font-mono font-extrabold text-indigo-900 tracking-widest bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 shadow-inner">
              {formatTimer(timerSeconds)}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
            >
              {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              <span>{isTimerRunning ? 'Pause' : 'Start Focus'}</span>
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(25 * 60);
              }}
              className="rounded-xl border border-slate-200 bg-slate-100 p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Reset Timer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
