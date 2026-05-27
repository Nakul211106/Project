import React from 'react';
import { Search, Bell, Command, Calendar, ShieldCheck } from 'lucide-react';

const Header = ({ title }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="glass-panel flex items-center justify-between px-8 h-20 border-b border-white/5 bg-[#07090e]/30" style={{ borderRadius: '0px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      {/* Title & Date */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-wide">{title}</h1>
        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
          <Calendar size={12} />
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Center/Right Actions */}
      <div className="flex items-center gap-6">
        {/* Search bar */}
        <div className="relative hidden md:block w-72">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search dashboards... (Press /)" 
            className="w-full pl-11 pr-10 py-2 bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.06] border border-white/5 focus:border-[#00f2fe]/40 rounded-xl text-[14px] text-white outline-none placeholder:text-slate-500 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400 font-semibold tracking-wider">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#ff4d6d] shadow-[0_0_8px_#ff4d6d] animate-pulse" />
        </button>

        {/* Vertical divider */}
        <div className="w-[1px] h-8 bg-white/10" />

        {/* User profile */}
        <div className="flex items-center gap-3.5 pl-2 cursor-pointer group">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-white group-hover:text-[#00f2fe] transition-colors">Nikolas Tim</span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck size={11} />
              <span>Super Administrator</span>
            </div>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9d4edd] to-[#00f2fe] p-[1.5px] shadow-[0_0_10px_rgba(0,242,254,0.15)] group-hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all">
              <div className="w-full h-full rounded-[10px] bg-slate-900 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200" 
                  alt="Profile" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_6px_#10b981]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
