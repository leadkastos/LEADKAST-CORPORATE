import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
  sparkline?: number[];
}

const trendConfig = {
  up: { icon: TrendingUp, bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  down: { icon: TrendingDown, bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
  neutral: { icon: Minus, bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20' },
};

export function KpiCard({ title, value, change, trend, icon: Icon, iconColor, subtitle, sparkline }: KpiCardProps) {
  const trendInfo = trend ? trendConfig[trend] : null;
  const TrendIcon = trendInfo?.icon;

  return (
    <div className={cn(
      "group relative bg-slate-900/60 border border-slate-800/80 p-5 rounded-xl transition-all duration-200",
      "hover:border-slate-700/80 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-slate-900/30",
      "overflow-hidden"
    )}>
      <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-800/0 via-slate-800/0 to-blue-500/5" />
      </div>
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={cn("p-2 rounded-lg bg-slate-800/80 transition-colors group-hover:bg-slate-800", iconColor || "text-blue-400")}>
            <Icon className="h-4.5 w-4.5" />
          </div>
          {trendInfo && change && (
            <div className={cn("flex items-center space-x-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border", trendInfo.bg, trendInfo.text, trendInfo.border)}>
              {TrendIcon && <TrendIcon className="h-3 w-3" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1">{title}</h3>
          <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {sparkline && (
          <div className="mt-3 h-6 flex items-end space-x-0.5">
            {sparkline.map((h, i) => (
              <div key={i} className={cn(
                "flex-1 rounded-sm transition-all duration-300",
                trend === 'up' ? 'bg-emerald-500/30 group-hover:bg-emerald-500/50' :
                trend === 'down' ? 'bg-rose-500/30 group-hover:bg-rose-500/50' :
                'bg-blue-500/30 group-hover:bg-blue-500/50'
              )} style={{ height: `${Math.max(h, 8)}%` }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}