import React, { useState } from 'react';
import { TrendingUp, BarChart2, Calendar, ChevronDown } from 'lucide-react';

const datasets = {
  revenue: {
    label: 'Revenue Growth',
    color: '#00f2fe',
    secondaryColor: '#9d4edd',
    glowColor: 'rgba(0, 242, 254, 0.4)',
    points: [4200, 5100, 4800, 6400, 5900, 7800, 7100, 8900, 8200, 9900, 11500, 10800],
    baseline: [3500, 4100, 4300, 5100, 5200, 6100, 6400, 7000, 7400, 8100, 8900, 9200],
    symbol: '$'
  },
  activity: {
    label: 'Platform Activity',
    color: '#9d4edd',
    secondaryColor: '#00f5d4',
    glowColor: 'rgba(157, 78, 221, 0.4)',
    points: [1200, 1800, 2400, 2100, 3100, 3800, 3500, 4200, 4600, 5100, 4900, 5800],
    baseline: [1000, 1300, 1600, 1900, 2200, 2600, 2900, 3300, 3700, 4000, 4400, 4800],
    symbol: ''
  },
  signups: {
    label: 'New Customers',
    color: '#00f5d4',
    secondaryColor: '#ff007f',
    glowColor: 'rgba(0, 245, 212, 0.4)',
    points: [150, 280, 340, 390, 420, 510, 480, 620, 590, 710, 830, 920],
    baseline: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650],
    symbol: '+'
  }
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const AnalyticsChart = () => {
  const [activeTab, setActiveTab] = useState('revenue');
  const [timeframe, setTimeframe] = useState('12M');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const data = datasets[activeTab];
  const maxVal = Math.max(...data.points) * 1.15;
  const minVal = Math.min(...data.baseline) * 0.85;
  const valRange = maxVal - minVal;

  // Chart Dimensions
  const width = 800;
  const height = 280;
  const paddingLeft = 60;
  const paddingRight = 30;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Map Data Point to SVG Coordinate
  const getCoordinates = (points) => {
    return points.map((val, i) => {
      const x = paddingLeft + (i / (points.length - 1)) * chartWidth;
      const y = paddingTop + chartHeight - ((val - minVal) / valRange) * chartHeight;
      return { x, y, value: val };
    });
  };

  const coordinates = getCoordinates(data.points);
  const baselineCoords = getCoordinates(data.baseline);

  // Generate SVG Path String for Area and Stroke
  const getPathString = (coords) => {
    return coords.reduce((acc, coord, i) => {
      if (i === 0) return `M ${coord.x} ${coord.y}`;
      return `${acc} L ${coord.x} ${coord.y}`;
    }, '');
  };

  const linePath = getPathString(coordinates);
  const baselinePath = getPathString(baselineCoords);

  const areaPath = `${linePath} L ${coordinates[coordinates.length - 1].x} ${height - paddingBottom} L ${coordinates[0].x} ${height - paddingBottom} Z`;

  // Y Axis ticks helper
  const yTicks = Array.from({ length: 5 }, (_, i) => {
    const val = minVal + (i / 4) * valRange;
    const y = paddingTop + chartHeight - (i / 4) * chartHeight;
    return { val, y };
  });

  return (
    <div className="glass-card p-6 flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#00f2fe]">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Performance Analytics</h3>
            <p className="text-xs text-slate-400">Multi-metric analytical reporting</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center bg-white/[0.02] border border-white/5 p-1 rounded-xl self-start sm:self-center">
          {Object.entries(datasets).map(([key, dataset]) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setHoveredIndex(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === key
                  ? 'bg-white/[0.07] text-white border border-white/5 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-xs text-slate-300 hover:text-white transition-all font-medium">
            <Calendar size={13} />
            <span>Timeframe: 12M</span>
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* SVG Chart Wrapper */}
      <div className="relative mt-6 flex-1 w-full" style={{ minHeight: '280px' }}>
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Area Gradient */}
            <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={data.color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={data.color} stopOpacity="0.00" />
            </linearGradient>
            {/* Stroke Gradient */}
            <linearGradient id="chart-stroke-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={data.color} />
              <stop offset="100%" stopColor={data.secondaryColor} />
            </linearGradient>
            {/* Glow Filter */}
            <filter id="neon-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor={data.color} floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Grid Lines */}
          {yTicks.map((tick, i) => (
            <g key={i} className="opacity-15">
              <line
                x1={paddingLeft}
                y1={tick.y}
                x2={width - paddingRight}
                y2={tick.y}
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            </g>
          ))}

          {/* Y Axis Labels */}
          {yTicks.map((tick, i) => (
            <text
              key={i}
              x={paddingLeft - 12}
              y={tick.y + 4}
              fill="#94a3b8"
              fontSize="10"
              fontWeight="600"
              textAnchor="end"
              className="font-semibold"
            >
              {data.symbol}{Math.round(tick.val).toLocaleString()}
            </text>
          ))}

          {/* Baseline Path (Secondary Metric) */}
          <path
            d={baselinePath}
            fill="none"
            stroke="#475569"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            className="opacity-40"
          />

          {/* Area Path */}
          <path
            d={areaPath}
            fill="url(#chart-area-grad)"
          />

          {/* Glowing Stroke Path */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#chart-stroke-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#neon-glow)"
          />

          {/* Hover Vertical Line */}
          {hoveredIndex !== null && (
            <line
              x1={coordinates[hoveredIndex].x}
              y1={paddingTop}
              x2={coordinates[hoveredIndex].x}
              y2={height - paddingBottom}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          )}

          {/* Interactive Data Dots */}
          {coordinates.map((coord, i) => (
            <g 
              key={i} 
              onMouseEnter={() => setHoveredIndex(i)} 
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
            >
              {/* Giant transparent hover area */}
              <circle
                cx={coord.x}
                cy={coord.y}
                r="16"
                fill="transparent"
              />
              
              {/* Outer Glow ring (only visible on hover) */}
              <circle
                cx={coord.x}
                cy={coord.y}
                r={hoveredIndex === i ? "9" : "6"}
                fill={data.color}
                opacity={hoveredIndex === i ? "0.35" : "0"}
                className="transition-all duration-150"
              />
              
              {/* Core Dot */}
              <circle
                cx={coord.x}
                cy={coord.y}
                r={hoveredIndex === i ? "5" : "3.5"}
                fill={hoveredIndex === i ? '#fff' : data.color}
                stroke="#07090e"
                strokeWidth="1.5"
                className="transition-all duration-150"
              />
            </g>
          ))}

          {/* X Axis Labels */}
          {coordinates.map((coord, i) => (
            <text
              key={i}
              x={coord.x}
              y={height - paddingBottom + 20}
              fill={hoveredIndex === i ? '#ffffff' : '#64748b'}
              fontSize="10"
              fontWeight="600"
              textAnchor="middle"
              className="transition-colors duration-150"
            >
              {labels[i]}
            </text>
          ))}
        </svg>

        {/* Custom HTML Tooltip */}
        {hoveredIndex !== null && (
          <div 
            className="absolute z-10 glass-panel px-3.5 py-2 text-xs border border-white/10 shadow-2xl pointer-events-none rounded-xl transition-all duration-150"
            style={{
              left: `${(coordinates[hoveredIndex].x / width) * 100}%`,
              top: `${(coordinates[hoveredIndex].y / height) * 100 - 18}%`,
              transform: 'translate(-50%, -100%)',
              background: 'rgba(15, 23, 42, 0.9)',
            }}
          >
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{labels[hoveredIndex]}</div>
            <div className="flex items-center gap-1.5 mt-1 font-bold text-white text-[13px]">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: data.color }} />
              <span>{data.symbol}{data.points[hoveredIndex].toLocaleString()}</span>
            </div>
            <div className="text-[9px] text-slate-500 mt-0.5">Target: {data.symbol}{data.baseline[hoveredIndex].toLocaleString()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChart;
