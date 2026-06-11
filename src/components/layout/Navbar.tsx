'use client';

import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { NotificationBell } from '../dashboard/NotificationBell';
import { useAuth } from '@/hooks/useAuth';

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { profile } = useAuth();

  return (
    <header className="h-16 bg-slate-950/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center flex-1">
        <button 
          className="p-2 mr-4 text-slate-400 hover:text-white lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search executive reports..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-full py-1.5 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <NotificationBell />
        <div className="flex items-center space-x-3 bg-slate-900/50 border border-slate-800 py-1 pl-1 pr-3 rounded-full hover:border-slate-700 transition-colors cursor-pointer">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs font-medium text-slate-300 hidden sm:inline-block">
            {profile?.full_name?.split(' ')[0] || 'Executive'}
          </span>
        </div>
      </div>
    </header>
  );
}
