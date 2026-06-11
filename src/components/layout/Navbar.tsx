'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, Menu, ChevronDown, Settings, LogOut, HelpCircle, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const notifications = [
  { id: 1, title: 'Ad spend spike detected', description: 'Marketing campaign costs increased by 23% today', time: '2h ago', type: 'warning' as const },
  { id: 2, title: 'New high-value customer', description: 'Acme Corp just upgraded to Enterprise plan', time: '4h ago', type: 'success' as const },
  { id: 3, title: 'CRM sync error resolved', description: 'HubSpot integration is back online', time: '6h ago', type: 'success' as const },
  { id: 4, title: 'Revenue target reached', description: 'Q2 revenue target achieved 2 weeks early', time: '1d ago', type: 'success' as const },
  { id: 5, title: 'Low inventory alert', description: 'Product SKU-042 has only 12 units remaining', time: '1d ago', type: 'warning' as const },
];

const typeStyles = {
  warning: 'bg-amber-500 shadow-amber-500/20',
  success: 'bg-emerald-500 shadow-emerald-500/20',
  error: 'bg-rose-500 shadow-rose-500/20',
  info: 'bg-blue-500 shadow-blue-500/20',
};

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const unreadCount = notifications.length;

  return (
    <header className="h-16 bg-slate-950/60 backdrop-blur-xl border-b border-slate-800/60 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center flex-1 min-w-0">
        <button className="p-2 mr-3 text-slate-400 hover:text-white lg:hidden rounded-lg hover:bg-slate-800/50 transition-colors" onClick={onMenuClick} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden sm:flex items-center text-sm">
          <span className="text-slate-500">LeadKast OS</span>
          <ChevronDown className="h-3 w-3 text-slate-600 -rotate-90 mx-1.5" />
          <span className="text-slate-200 font-medium">Executive Overview</span>
        </div>
        <div className="ml-auto md:ml-6 flex-1 max-w-xs hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input type="text" placeholder="Search reports, metrics..." className="w-full bg-slate-900/80 border border-slate-800/80 rounded-lg py-1.5 pl-10 pr-4 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all" />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded hidden lg:inline-block font-mono">⌘K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative" ref={notifRef}>
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-all" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-slate-950 animate-pulse"></span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-white">Notifications</h3>
                <span className="text-[11px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">{unreadCount} new</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/50">
                {notifications.map((n) => (
                  <button key={n.id} className="w-full text-left px-4 py-3 hover:bg-slate-800/40 transition-colors group">
                    <div className="flex items-start space-x-3">
                      <div className={cn("mt-1.5 h-2 w-2 rounded-full shrink-0 shadow-sm", typeStyles[n.type])} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-200 group-hover:text-white transition-colors font-medium">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{n.description}</p>
                        <p className="text-[11px] text-slate-600 mt-1">{n.time}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button className="w-full py-2.5 text-xs text-blue-400 hover:text-blue-300 hover:bg-slate-800/40 transition-colors font-medium border-t border-slate-800">View all notifications</button>
            </div>
          )}
        </div>

        <div className="relative" ref={userRef}>
          <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-slate-800/50 transition-all" aria-label="User menu">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <User className="h-4.5 w-4.5 text-white" />
            </div>
            <ChevronDown className={cn("h-4 w-4 text-slate-500 hidden sm:block transition-transform duration-200", showUserMenu && "rotate-180")} />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-800">
                <p className="text-sm font-medium text-white">LeadKast Admin</p>
                <p className="text-xs text-slate-500 mt-0.5">admin@leadkast.com</p>
              </div>
              <div className="py-1">
                {[
                  { icon: User, label: 'Profile' },
                  { icon: Settings, label: 'Account Settings' },
                  { icon: MessageSquare, label: 'Feedback' },
                  { icon: HelpCircle, label: 'Help & Support' },
                ].map((item) => (
                  <button key={item.label} className="flex items-center w-full px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors">
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="border-t border-slate-800 py-1">
                <button className="flex items-center w-full px-4 py-2 text-sm text-slate-400 hover:text-rose-400 hover:bg-slate-800/40 transition-colors">
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}