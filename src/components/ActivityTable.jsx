import React from 'react';
import { ExternalLink, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

const activities = [
  {
    id: 'TX-1001',
    user: {
      name: 'Sarah Connor',
      email: 's.connor@cyberdyne.io',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100'
    },
    action: 'Premium Plan Subscription',
    date: 'May 27, 2026 09:12',
    amount: '+$249.00',
    status: 'completed'
  },
  {
    id: 'TX-1002',
    user: {
      name: 'Marcus Wright',
      email: 'm.wright@projectangel.org',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100'
    },
    action: 'API Credit Topup',
    date: 'May 27, 2026 08:44',
    amount: '+$45.00',
    status: 'completed'
  },
  {
    id: 'TX-1003',
    user: {
      name: 'John Connor',
      email: 'j.connor@resistance.net',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100'
    },
    action: 'Enterprise SLA Renewal',
    date: 'May 26, 2026 22:15',
    amount: '+$1,890.00',
    status: 'pending'
  },
  {
    id: 'TX-1004',
    user: {
      name: 'Kate Brewster',
      email: 'k.brewster@norad.mil',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100'
    },
    action: 'Custom Domain Setup',
    date: 'May 26, 2026 14:30',
    amount: '$0.00',
    status: 'failed'
  },
  {
    id: 'TX-1005',
    user: {
      name: 'T-800 CSM-101',
      email: 'cyberdyne.model101@skynet.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100'
    },
    action: 'Database Storage Expansion',
    date: 'May 25, 2026 18:05',
    amount: '+$120.00',
    status: 'completed'
  }
];

const ActivityTable = () => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
            <CheckCircle2 size={12} />
            <span>Success</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/10">
            <Clock size={12} className="animate-spin-slow" />
            <span>Pending</span>
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/10">
            <AlertTriangle size={12} />
            <span>Failed</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full">
      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-5">
        <div>
          <h3 className="font-bold text-white text-base">Recent Activity</h3>
          <p className="text-xs text-slate-400">Live operational & billing log</p>
        </div>
        <button className="text-xs font-semibold text-[#00f2fe] hover:text-[#00f2fe]/80 transition-colors flex items-center gap-1">
          <span>View All Log</span>
          <ExternalLink size={12} />
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5">
              <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">User</th>
              <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Details</th>
              <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Timestamp</th>
              <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
              <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {activities.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.01] transition-colors group">
                {/* User column */}
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl p-[1px] bg-white/10 group-hover:bg-[#00f2fe]/40 transition-colors">
                      <img src={item.user.avatar} alt={item.user.name} className="w-full h-full rounded-[11px] object-cover" />
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-white group-hover:text-[#00f2fe] transition-colors">{item.user.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{item.user.email}</div>
                    </div>
                  </div>
                </td>
                
                {/* Action details */}
                <td className="py-3.5 text-[13.5px] font-medium text-slate-300 hidden md:table-cell">
                  {item.action}
                  <div className="text-[10px] text-slate-500 font-bold tracking-wide mt-0.5">{item.id}</div>
                </td>
                
                {/* Date */}
                <td className="py-3.5 text-xs font-medium text-slate-400 hidden lg:table-cell">
                  {item.date}
                </td>
                
                {/* Amount */}
                <td className={`py-3.5 text-[14px] font-semibold ${item.amount.startsWith('+') ? 'text-white' : 'text-slate-400'}`}>
                  {item.amount}
                </td>
                
                {/* Status */}
                <td className="py-3.5 text-right">
                  {getStatusBadge(item.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
