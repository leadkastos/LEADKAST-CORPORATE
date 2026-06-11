import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export function KpiCard({ title, value, change, trend, icon: Icon, iconColor }: KpiCardProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2 rounded-lg bg-slate-800", iconColor || "text-blue-400")}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            trend === 'up' ? "bg-emerald-500/10 text-emerald-500" : 
            trend === 'down' ? "bg-rose-500/10 text-rose-500" : 
            "bg-slate-500/10 text-slate-500"
          )}>
            {change}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
    </div>
  );
}
