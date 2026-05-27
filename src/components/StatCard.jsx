import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, changeType, icon: Icon, color = 'cyan' }) => {
  const colorMaps = {
    cyan: {
      text: 'text-[#00f2fe]',
      bg: 'bg-[#00f2fe]/10',
      glow: 'shadow-[0_0_15px_rgba(0,242,254,0.2)]',
      border: 'hover:border-[#00f2fe]/30'
    },
    purple: {
      text: 'text-[#9d4edd]',
      bg: 'bg-[#9d4edd]/10',
      glow: 'shadow-[0_0_15px_rgba(157,78,221,0.2)]',
      border: 'hover:border-[#9d4edd]/30'
    },
    pink: {
      text: 'text-[#ff007f]',
      bg: 'bg-[#ff007f]/10',
      glow: 'shadow-[0_0_15px_rgba(255,0,127,0.2)]',
      border: 'hover:border-[#ff007f]/30'
    },
    emerald: {
      text: 'text-[#00f5d4]',
      bg: 'bg-[#00f5d4]/10',
      glow: 'shadow-[0_0_15px_rgba(0,245,212,0.2)]',
      border: 'hover:border-[#00f5d4]/30'
    }
  };

  const style = colorMaps[color] || colorMaps.cyan;
  const isPositive = changeType === 'increase';

  return (
    <div className={`glass-card p-6 flex flex-col justify-between min-h-[160px] ${style.border}`}>
      {/* Card Header: Icon & Title */}
      <div className="flex items-start justify-between">
        <span className="text-[14px] font-semibold text-slate-400 tracking-wide uppercase">{title}</span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${style.bg} ${style.glow}`}>
          <Icon className={`${style.text}`} size={20} />
        </div>
      </div>

      {/* Card Body: Metric & Change Indicator */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-white tracking-tight leading-none">{value}</span>
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPositive 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' 
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/10'
            }`}>
              {isPositive ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
              {change}
            </span>
            <span className="text-[11px] text-slate-500">vs last month</span>
          </div>
        </div>

        {/* Micro Sparkline Chart */}
        <div className="w-16 h-8 opacity-45 group-hover:opacity-100 transition-opacity">
          <svg className="w-full h-full" viewBox="0 0 100 40">
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color === 'cyan' ? '#00f2fe' : color === 'purple' ? '#9d4edd' : color === 'pink' ? '#ff007f' : '#00f5d4'} stopOpacity="0.4" />
                <stop offset="100%" stopColor={color === 'cyan' ? '#00f2fe' : color === 'purple' ? '#9d4edd' : color === 'pink' ? '#ff007f' : '#00f5d4'} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={isPositive ? "M 0 35 Q 25 15, 50 25 T 100 10" : "M 0 10 Q 25 25, 50 15 T 100 35"}
              fill="none"
              stroke={color === 'cyan' ? '#00f2fe' : color === 'purple' ? '#9d4edd' : color === 'pink' ? '#ff007f' : '#00f5d4'}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d={isPositive ? "M 0 35 Q 25 15, 50 25 T 100 10 L 100 40 L 0 40 Z" : "M 0 10 Q 25 25, 50 15 T 100 35 L 100 40 L 0 40 Z"}
              fill={`url(#gradient-${color})`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
