import React, { useState, useEffect } from 'react';
import { Server, Cpu, Database, Network } from 'lucide-react';

const ResourceMonitor = () => {
  const [metrics, setMetrics] = useState({
    cpu: 42,
    ram: 68,
    disk: 54,
    latency: 28
  });

  // Fluctuate metrics slightly to make dashboard feel "alive"
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev => {
        const cpuChange = Math.floor(Math.random() * 9) - 4; // -4 to +4
        const ramChange = Math.floor(Math.random() * 3) - 1; // -1 to +1
        const latencyChange = Math.floor(Math.random() * 5) - 2; // -2 to +2

        return {
          cpu: Math.max(10, Math.min(95, prev.cpu + cpuChange)),
          ram: Math.max(20, Math.min(90, prev.ram + ramChange)),
          disk: prev.disk, // Keep stable
          latency: Math.max(10, Math.min(100, prev.latency + latencyChange))
        };
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const getGaugeColor = (val) => {
    if (val > 80) return 'stroke-[#ff4d6d]'; // danger red
    if (val > 60) return 'stroke-[#ffb703]'; // warning amber
    return 'stroke-[#00f2fe]'; // normal cyan
  };

  const getGaugeGlow = (val) => {
    if (val > 80) return 'drop-shadow-[0_0_6px_#ff4d6d]';
    if (val > 60) return 'drop-shadow-[0_0_6px_#ffb703]';
    return 'drop-shadow-[0_0_6px_#00f2fe]';
  };

  // Helper for drawing radial SVG charts
  const radius = 34;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;

  const getDashOffset = (val) => {
    return circumference - (val / 100) * circumference;
  };

  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full">
      {/* Component Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#9d4edd]">
            <Server size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Resource Monitor</h3>
            <p className="text-xs text-slate-400">Live virtualization clusters</p>
          </div>
        </div>
        
        {/* Pulsing indicator */}
        <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Active</span>
        </div>
      </div>

      {/* Grid of Gauges */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* CPU Gauge */}
        <div className="flex flex-col items-center p-4 rounded-xl bg-white/[0.01] border border-white/5">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r={radius} className="stroke-white/5" strokeWidth={strokeWidth} fill="transparent" />
              <circle 
                cx="40" 
                cy="40" 
                r={radius} 
                className={`${getGaugeColor(metrics.cpu)} ${getGaugeGlow(metrics.cpu)} transition-all duration-500`} 
                strokeWidth={strokeWidth} 
                fill="transparent" 
                strokeDasharray={circumference}
                strokeDashoffset={getDashOffset(metrics.cpu)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-bold text-white tracking-tight">{metrics.cpu}%</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-slate-300">
            <Cpu size={12} className="text-[#00f2fe]" />
            <span>CPU Compute</span>
          </div>
        </div>

        {/* RAM Gauge */}
        <div className="flex flex-col items-center p-4 rounded-xl bg-white/[0.01] border border-white/5">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r={radius} className="stroke-white/5" strokeWidth={strokeWidth} fill="transparent" />
              <circle 
                cx="40" 
                cy="40" 
                r={radius} 
                className={`${getGaugeColor(metrics.ram)} ${getGaugeGlow(metrics.ram)} transition-all duration-500`} 
                strokeWidth={strokeWidth} 
                fill="transparent" 
                strokeDasharray={circumference}
                strokeDashoffset={getDashOffset(metrics.ram)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-bold text-white tracking-tight">{metrics.ram}%</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-slate-300">
            <Database size={12} className="text-[#9d4edd]" />
            <span>Memory Allocated</span>
          </div>
        </div>
      </div>

      {/* Row Metrics (Bar Progress) */}
      <div className="space-y-4 mt-6">
        {/* Storage */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-400">Cluster Disk Storage</span>
            <span className="text-white">{metrics.disk}% (540 GB of 1 TB)</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden p-[1px] border border-white/5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#9d4edd] to-[#00f2fe] transition-all duration-500 shadow-[0_0_6px_#00f2fe]"
              style={{ width: `${metrics.disk}%` }}
            />
          </div>
        </div>

        {/* Latency / Ping */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 mt-2">
          <div className="flex items-center gap-2">
            <Network size={15} className="text-emerald-400" />
            <span className="text-[12.5px] font-semibold text-slate-300">Edge Gateway Ping</span>
          </div>
          <span className="text-xs font-bold text-emerald-400">{metrics.latency} ms</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceMonitor;
