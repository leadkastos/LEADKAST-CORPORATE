'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  LogOut,
  TrendingUp,
  Target,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Integrations', href: '/integrations', icon: Target },
  { name: 'Growth', href: '/growth', icon: TrendingUp },
  { name: 'Settings', href: '/settings', icon: Settings },
];

import { useAuth } from '@/hooks/useAuth';

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <div className={cn(
        "flex flex-col h-full bg-slate-950 border-r border-slate-800 w-64 fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            LeadKast OS
          </span>
          <button className="lg:hidden text-slate-400" onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive 
                    ? "bg-slate-800 text-white" 
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                )}
              >
                <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-blue-400" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="mb-4 px-3 py-2 bg-slate-900 rounded-lg">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Signed in as</p>
            <p className="text-sm font-medium text-white truncate">{profile?.full_name || 'Executive User'}</p>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-0.5">{profile?.role?.replace('_', ' ') || 'OWNER'}</p>
          </div>
          <button 
            onClick={() => signOut()}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-400 rounded-lg hover:text-white hover:bg-slate-900 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
