import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import AnalyticsChart from './components/AnalyticsChart';
import ActivityTable from './components/ActivityTable';
import ResourceMonitor from './components/ResourceMonitor';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  ArrowUpRight, 
  Settings, 
  Lock, 
  Bell, 
  Cpu, 
  Database,
  Search,
  Plus,
  ArrowRight
} from 'lucide-react';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dynamic header titles
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Operational Dashboard';
      case 'analytics': return 'Performance & Analytics';
      case 'users': return 'Team Directory';
      case 'billing': return 'Financial Ledger';
      case 'system': return 'System Health Indicators';
      case 'settings': return 'Account Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <div className={`dashboard-grid ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Navigation */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Global Header */}
        <Header title={getHeaderTitle()} />

        {/* Dynamic Scrollable Page Body */}
        <main className="dashboard-content">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Monthly Revenue" 
                  value="$48,259.00" 
                  change="+12.4%" 
                  changeType="increase" 
                  icon={DollarSign}
                  color="cyan"
                />
                <StatCard 
                  title="Active Users" 
                  value="12,482" 
                  change="+8.2%" 
                  changeType="increase" 
                  icon={Users}
                  color="purple"
                />
                <StatCard 
                  title="Orders Completed" 
                  value="1,894" 
                  change="-2.1%" 
                  changeType="decrease" 
                  icon={ShoppingCart}
                  color="pink"
                />
                <StatCard 
                  title="Conversion Rate" 
                  value="24.8%" 
                  change="+4.6%" 
                  changeType="increase" 
                  icon={ArrowUpRight}
                  color="emerald"
                />
              </div>

              {/* Analytics & System Health Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <AnalyticsChart />
                </div>
                <div>
                  <ResourceMonitor />
                </div>
              </div>

              {/* Transactions/Recent Activity */}
              <div className="grid grid-cols-1 gap-6">
                <ActivityTable />
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="glass-card p-8 text-center max-w-2xl mx-auto my-12">
                <h3 className="text-xl font-bold text-white mb-2">Deep Performance Metrics</h3>
                <p className="text-slate-400 mb-6 text-sm">Review database optimization reports, clickstream analyses, and page load optimization indexes.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-md mx-auto">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-xs text-slate-500 font-bold uppercase">Average LCP</div>
                    <div className="text-2xl font-bold text-[#00f2fe] mt-1">1.2s</div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-1">✓ Passed Core Web Vitals</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-xs text-slate-500 font-bold uppercase">CDN Cache Hit Rate</div>
                    <div className="text-2xl font-bold text-[#9d4edd] mt-1">94.8%</div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-1">✓ Optimally configured</div>
                  </div>
                </div>
              </div>
              <AnalyticsChart />
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Active Members</h2>
                  <p className="text-xs text-slate-400">Manage permissions, invite operators, and audit administrative actions.</p>
                </div>
                <button className="glass-btn text-xs">
                  <Plus size={14} />
                  <span>Invite Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* User Card 1 */}
                <div className="glass-card p-6 flex items-center gap-4 border-l-2 border-l-[#00f2fe]">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="Nikolas" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-white">Nikolas Tim</h4>
                    <p className="text-xs text-slate-400">Super Admin (You)</p>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online
                    </span>
                  </div>
                </div>

                {/* User Card 2 */}
                <div className="glass-card p-6 flex items-center gap-4 border-l-2 border-l-[#9d4edd]">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" alt="Sarah" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-white">Sarah Connor</h4>
                    <p className="text-xs text-slate-400">Systems Security</p>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active 5m ago
                    </span>
                  </div>
                </div>

                {/* User Card 3 */}
                <div className="glass-card p-6 flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Marcus" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-white">Marcus Wright</h4>
                    <p className="text-xs text-slate-400">Database DevOps</p>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-slate-400 border border-white/5 mt-2">
                      Offline
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Wallet Balance widget */}
                <div className="glass-card p-6 bg-gradient-to-tr from-[#161c2d] to-[#0c101a] flex flex-col justify-between min-h-[200px]">
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Available Balance</span>
                    <h2 className="text-3xl font-extrabold text-white mt-1">$124,800.50</h2>
                  </div>
                  <div className="flex gap-3">
                    <button className="glass-btn text-xs flex-1 justify-center py-2.5">Withdraw</button>
                    <button className="glass-btn-secondary text-xs flex-1 justify-center py-2.5">Statements</button>
                  </div>
                </div>
                
                {/* Details Column 1 */}
                <div className="glass-card p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">Linked Card</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Primary payout method</p>
                    <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-[13px] font-bold text-white">Visa Business Platinum</div>
                        <div className="text-xs text-slate-500 mt-0.5">•••• •••• •••• 8290</div>
                      </div>
                      <span className="text-xs font-bold text-slate-400">04/29</span>
                    </div>
                  </div>
                </div>

                {/* Details Column 2 */}
                <div className="glass-card p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">Tax Information</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Q2 2026 reporting period</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
                      <span>EIN Registered</span>
                      <span className="font-semibold text-white">XX-XXX8290</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                      <span>Status</span>
                      <span className="text-emerald-400 font-semibold">Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              <ActivityTable />
            </div>
          )}

          {activeTab === 'system' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ResourceMonitor />
              </div>
              <div className="lg:col-span-2 glass-card p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-white text-base">Node Clusters</h3>
                  <p className="text-xs text-slate-400">Status logs of Kubernetes pods and load balancers</p>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#00f2fe]/5 border border-[#00f2fe]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Cpu className="text-[#00f2fe]" size={18} />
                      <div>
                        <div className="text-sm font-bold text-white">ap-southeast-cluster-01</div>
                        <p className="text-[11px] text-[#00f2fe] font-semibold">99.99% SLA • Node Health Good</p>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                  </div>
                  <div className="p-4 rounded-xl bg-[#9d4edd]/5 border border-[#9d4edd]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Database className="text-[#9d4edd]" size={18} />
                      <div>
                        <div className="text-sm font-bold text-white">us-east-db-replica-01</div>
                        <p className="text-[11px] text-[#9d4edd] font-semibold">Replication Delay 12ms • Healthy</p>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto glass-card p-8 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-white">Security & API Access</h2>
                <p className="text-xs text-slate-400">Manage credentials, API tokens, and dashboard rules.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Access Client ID</label>
                  <input type="text" readOnly value="aeth_cli_d35ca88be49a484c98f0330a5b82908" className="glass-input cursor-not-allowed text-slate-500 font-mono text-xs" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Webhook Endpoint</label>
                  <input type="text" defaultValue="https://api.aetheria.io/v1/webhook" className="glass-input text-xs" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 mt-6">
                  <div className="flex items-center gap-3">
                    <Lock className="text-amber-400" size={18} />
                    <div>
                      <div className="text-xs font-bold text-white">Two-Factor Authentication</div>
                      <p className="text-[10px] text-slate-500 font-semibold">Keep your administrator account extra secure</p>
                    </div>
                  </div>
                  <button className="glass-btn-secondary text-[11px] px-3.5 py-1.5">Enable</button>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-white/5 pt-6">
                <button className="glass-btn-secondary text-xs">Reset to Defaults</button>
                <button className="glass-btn text-xs">Save Changes</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
