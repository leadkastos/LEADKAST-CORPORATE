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
  badge?: string;
}

const trendConfig = {
  up: { icon: TrendingUp, bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  down: { icon: TrendingDown, bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
  neutral: { icon: Minus, bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20' },
};

export function KpiCard({ title, value, change, trend, icon: Icon, iconColor, subtitle, sparkline, badge }: KpiCardProps) {
  const t = trend ? trendConfig[trend] : null;
  const TrendIcon = t?.icon;

  return (
    <div className="group relative bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 p-5 rounded-2xl transition-all duration-300 hover:border-slate-700/80 hover:shadow-[0_0_30px_-5px] hover:shadow-blue-500/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className={cn(
        "absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 via-emerald-500/50 to-transparent"
      )} />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-2.5 rounded-xl bg-slate-800/60 ring-1 ring-slate-700/50 transition-all duration-300 group-hover:ring-slate-600/50 group-hover:bg-slate-800/80", iconColor || "text-blue-400")}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2">
            {badge && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700/50 uppercase tracking-wider">{badge}</span>}
            {t && change && (
              <div className={cn("flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border", t.bg, t.text, t.border)}>
                {TrendIcon && <TrendIcon className="h-3 w-3" />}
                <span>{change}</span>
              </div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 mb-1.5">{title}</h3>
          <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
          {subtitle && <p className="text-[12px] text-slate-500 mt-1.5 font-medium">{subtitle}</p>}
        </div>
        {sparkline && sparkline.length > 0 && (
          <div className="relative h-10 mt-1">
            <svg className="w-full h-full" viewBox={`0 0 ${sparkline.length * 10} 40`} preserveAspectRatio="none">
              <defs>
                <linearGradient id={`g-${title.replace(/\s/g,'')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={trend === 'up' ? '#10b981' : trend === 'down' ? '#f43f5e' : '#3b82f6'} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={trend === 'up' ? '#10b981' : trend === 'down' ? '#f43f5e' : '#3b82f6'} stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline points={sparkline.map((v,i) => `${i*10+5},${40-(v/100)*35}`).join(' ')} fill="none" stroke={trend === 'up' ? '#10b981' : trend === 'down' ? '#f43f5e' : '#3b82f6'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity" />
              <polygon points={sparkline.map((v,i) => `${i*10+5},${40-(v/100)*35}`).join(' ') + ` ${(sparkline.length-1)*10+5},40 5,40`} fill={`url(#g-${title.replace(/\s/g,'')})`} className="opacity-60 group-hover:opacity-80 transition-opacity" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}