import React from 'react';
import { BarChart2, Flame, Award, BookOpen, Clock, Sparkles } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { UserProfile } from '../types';

interface AnalyticsViewProps {
  user: UserProfile;
}

export default function AnalyticsView({ user }: AnalyticsViewProps) {
  const weeklyData = [
    { day: 'Mon', hours: 2.5, quizzes: 8 },
    { day: 'Tue', hours: 3.2, quizzes: 12 },
    { day: 'Wed', hours: 1.8, quizzes: 6 },
    { day: 'Thu', hours: 4.0, quizzes: 15 },
    { day: 'Fri', hours: 3.5, quizzes: 10 },
    { day: 'Sat', hours: 5.2, quizzes: 20 },
    { day: 'Sun', hours: 4.3, quizzes: 14 },
  ];

  const scoreTrends = [
    { session: 'Quiz 1', score: 75 },
    { session: 'Quiz 2', score: 82 },
    { session: 'Quiz 3', score: 88 },
    { session: 'Quiz 4', score: 95 },
    { session: 'Quiz 5', score: 92 },
    { session: 'Quiz 6', score: 100 },
  ];

  const topicDistribution = [
    { name: 'Web Dev & React', value: 45, color: '#e11d48' },
    { name: 'DSA & Algorithms', value: 25, color: '#059669' },
    { name: 'System Design', value: 20, color: '#4f46e5' },
    { name: 'Machine Learning', value: 10, color: '#d97706' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-indigo-600" />
            Learning Analytics & Study Mastery
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Track your study hours, quiz performance, and topic retention metrics</p>
        </div>
        <span className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
          Rank: {user.level}
        </span>
      </div>

      {/* Metrics Banner */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Study Hours</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{user.totalHoursStudied} hrs</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Quiz Score Average</span>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1">{user.quizScoreAvg}%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Flashcards Learned</span>
          <p className="text-2xl font-extrabold text-indigo-700 mt-1">{user.flashcardsLearned}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Active Study Streak</span>
          <p className="text-2xl font-extrabold text-amber-700 mt-1">{user.streakDays} Days 🔥</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Study Hours Bar Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Weekly Study Hours Log</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a' }}
                  labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                />
                <Bar dataKey="hours" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quiz Performance Area Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Quiz Score Retention Trend (%)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreTrends}>
                <XAxis dataKey="session" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a' }}
                  labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="score" stroke="#10b981" fill="#10b98120" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Topic Mastery Distribution */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900">Topic Mastery & Time Allocation</h3>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {topicDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', color: '#0f172a' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {topicDistribution.map((t) => (
              <div key={t.name} className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 p-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="text-xs font-semibold text-slate-800">{t.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-700">{t.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
