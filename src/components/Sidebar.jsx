import React from 'react';
import { 
  LayoutDashboard, 
  LineChart, 
  Users, 
  CreditCard, 
  Settings, 
  Bell, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  Activity
} from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'users', label: 'Team', icon: Users },
    { id: 'billing', label: 'Transactions', icon: CreditCard },
    { id: 'system', label: 'System Status', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`glass-panel flex flex-col h-screen transition-all duration-300 ease-in-out border-r border-slate-800 bg-[#0c101a]/70 relative z-20`}
      style={{ 
        width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        borderRadius: '0px',
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: 'none'
      }}
    >
      {/* Sidebar Header / Logo */}
      <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-tr from-[#9d4edd] to-[#00f2fe] flex items-center justify-center shadow-[0_0_12px_rgba(0,242,254,0.3)]">
            <Shield size={18} className="text-white" />
          </div>
          {!collapsed && (
            <span className="font-extrabold text-lg bg-gradient-to-r from-white via-slate-200 to-[#00f2fe] bg-clip-text text-transparent tracking-wide select-none">
              AETHERIA
            </span>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-white/[0.06] text-white border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.02] border border-transparent'
              }`}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute left-0 w-1 h-5 rounded-r-md bg-[#00f2fe] shadow-[0_0_8px_#00f2fe]" />
              )}
              
              <Icon 
                size={20} 
                className={`transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-[#00f2fe]' : 'text-slate-400 group-hover:text-slate-200'
                }`} 
              />
              
              {!collapsed && (
                <span className="font-medium text-[15px] transition-opacity duration-300">
                  {item.label}
                </span>
              )}
              
              {/* Tooltip on collapsed state */}
              {collapsed && (
                <div className="absolute left-20 bg-slate-900 border border-white/10 text-white text-xs px-2.5 py-1.5 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-55">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-white/5 space-y-2">
        <button
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 border border-transparent group"
          onClick={() => alert('Signing out...')}
        >
          <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
          {!collapsed && <span className="font-medium text-[15px]">Logout</span>}
        </button>
        
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all text-slate-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
