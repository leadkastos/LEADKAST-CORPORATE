'use client';

import React, { useState } from 'react';
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
  X,
  PieChart,
  Lightbulb,
  Layers,
  ChevronDown,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: 'soon' | 'new' | 'beta';
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navigation: NavGroup[] = [
  {
    title: 'Main',
    items: [
      { name: 'Executive Overview', href: '/', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Intelligence Modules',
    items: [
      { name: 'Marketing Intelligence', href: '/marketing', icon: BarChart3 },
      { name: 'Revenue Operations', href: '/revenue', icon: PieChart },
      { name: 'Customer Insights', href: '/customers', icon: Users },
      { name: 'Growth Analytics', href: '/growth', icon: TrendingUp },
    ],
  },
  {
    title: 'Coming Soon',
    items: [
      { name: 'Sales Intelligence', href: '#', icon: Target, badge: 'soon' },
      { name: 'Operations Hub', href: '#', icon: Layers, badge: 'soon' },
      { name: 'AI Insights', href: '#', icon: Lightbulb, badge: 'soon' },
    ],
  },
  {
    title: 'Administration',
    items: [
      { name: 'Integrations', href: '/integrations', icon: Bell },
      { name: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Main': true,
    'Intelligence Modules': true,
    'Coming Soon': false,
    'Administration': true,
  });

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (item: NavItem) => {
    if (item.href === '#') return false;
    if (item.href === '/') return pathname === '/';
    return pathname.startsWith(item.href);
  };

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <aside className={cn(
        "flex flex-col h-full bg-slate-950 border-r border-slate-800/80 w-64 fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight block">
                LeadKast OS
              </span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.15em]">
                Executive Intelligence
              </span>
            </div>
          </div>
          <button className="lg:hidden text-slate-500 hover:text-white transition-colors -mr-1" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          {navigation.map((group) => (
            <div key={group.title} className="mb-4 last:mb-0">
              <button
                onClick={() => toggleGroup(group.title)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-1.5 mb-0.5",
                  "text-[11px] font-semibold uppercase tracking-[0.12em]",
                  group.title === 'Coming Soon' ? "text-slate-600" : "text-slate-500",
                  "hover:text-slate-400 transition-colors"
                )}
              >
                <span>{group.title}</span>
                <ChevronDown className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  expandedGroups[group.title] ? "rotate-0" : "-rotate-90"
                )} />
              </button>
              {expandedGroups[group.title] && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = isActive(item);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          if (item.href === '#') e.preventDefault();
                          if (window.innerWidth < 1024) onClose();
                        }}
                        className={cn(
                          "group flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 relative",
                          active ? "bg-slate-800/80 text-white shadow-sm" : "text-slate-400 hover:text-white hover:bg-slate-800/40",
                          item.badge === 'soon' && "opacity-60 hover:opacity-80"
                        )}
                      >
                        <item.icon className={cn(
                          "mr-3 h-4.5 w-4.5 shrink-0 transition-colors",
                          active ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                        )} />
                        <span className="truncate">{item.name}</span>
                        {item.badge === 'soon' && (
                          <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700/50">
                            Soon
                          </span>
                        )}
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-500 rounded-full" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800/80 shrink-0">
          <div className="flex items-center space-x-3 mb-3 px-1">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm shrink-0">
              <span className="text-xs font-bold text-white">L</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">LeadKast Admin</p>
              <p className="text-[11px] text-slate-500 truncate">Enterprise Plan</p>
            </div>
          </div>
          <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-500 rounded-lg hover:text-slate-300 hover:bg-slate-800/40 transition-colors">
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}