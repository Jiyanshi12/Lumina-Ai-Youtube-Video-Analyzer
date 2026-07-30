import React, { useState } from 'react';
import {
  Youtube,
  Plus,
  Search,
  Flame,
  Award,
  Bell,
  User,
  Sparkles,
  BookOpen,
  LogOut,
  Moon,
  Sun,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';
import NotificationCenter from './NotificationCenter';

interface NavbarProps {
  user: UserProfile;
  notifications: NotificationItem[];
  onOpenAddModal: () => void;
  onSearch: (query: string) => void;
  onOpenAuth: () => void;
  onSelectTab: (tab: string) => void;
  searchQuery: string;
}

export default function Navbar({
  user,
  notifications,
  onOpenAddModal,
  onSearch,
  onOpenAuth,
  onSelectTab,
  searchQuery,
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header id="main-navbar" className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-4 lg:px-6 py-3 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
            <Youtube className="h-5 w-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-slate-900 text-base">Lumina AI</span>
              <span className="rounded-full bg-indigo-600/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 border border-indigo-500/20">
                PRO
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-500">YouTube AI Learning Assistant</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md items-center relative">
          <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search notes, flashcards, quizzes & concepts..."
            className="w-full rounded-xl border border-slate-200 bg-slate-100/70 pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Action Buttons & User Info */}
        <div className="flex items-center gap-3">
          {/* Analyze New Video Trigger */}
          <button
            id="btn-navbar-add-video"
            onClick={onOpenAddModal}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Analyze Video</span>
          </button>

          {/* Streak Counter */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{user.streakDays} Day Streak</span>
          </div>

          {/* Points / Level */}
          <div className="hidden xl:flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
            <Award className="h-4 w-4 text-emerald-600" />
            <span>{user.points} pts</span>
          </div>

          {/* Refresh Page Button */}
          <button
            id="btn-navbar-refresh"
            onClick={() => window.location.reload()}
            title="Refresh Page"
            className="rounded-xl border border-slate-200 bg-slate-100/70 p-2 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          {/* Notifications Dropdown Trigger */}
          <div className="relative">
            <button
              id="btn-navbar-notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-xl border border-slate-200 bg-slate-100/70 p-2 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <NotificationCenter
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

          {/* User Profile Avatar / Menu */}
          <div className="relative">
            <button
              id="btn-navbar-profile"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100/70 px-2.5 py-1.5 hover:border-slate-300 transition-colors cursor-pointer"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden md:inline text-xs font-medium text-slate-700">{user.name.split(' ')[0]}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-3 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-md bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                      {user.level}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onSelectTab('analytics');
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <Award className="h-4 w-4 text-emerald-600" />
                    My Learning Progress
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onSelectTab('collections');
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    Study Collections
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenAuth();
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="h-4 w-4 text-sky-600" />
                    Account Settings / Auth
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
