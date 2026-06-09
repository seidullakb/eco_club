import React, { memo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, AreaChart, Area } from 'recharts';
import { ArrowLeft, TrendingUp, Calendar, Filter, Zap, Leaf, Droplets, Flame, Coins, BarChart3 } from 'lucide-react';
import { motion, useAnimate, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

const MemoizedAreaChart = memo(({ data }: { data: any[] }) => {
  const [scope, animate] = useAnimate();
  const { darkMode } = useTheme();

  useEffect(() => {
    // Reveal animation for the chart container
    animate(scope.current, { opacity: [0, 1], y: [20, 0] }, { duration: 0.4 });
  }, []);

  const accentColor = darkMode ? '#2dff7e' : '#1B3A2A';
  const textColor = darkMode ? '#7ab88a' : '#2d4a3a';

  return (
    <div ref={scope} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={accentColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={accentColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="name" stroke={textColor} fontSize={10} axisLine={false} tickLine={false} />
          <YAxis stroke={textColor} fontSize={10} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontSize: '12px', color: 'var(--color-text-main)' }}
            itemStyle={{ color: 'var(--color-text-main)' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={accentColor} 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorValue)" 
            animationDuration={400}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

const MemoizedPieChart = memo(({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={50}
          paddingAngle={5}
          dataKey="value"
          animationDuration={400}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
});

const data = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 19 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 22 },
  { name: 'Fri', value: 30 },
  { name: 'Sat', value: 10 },
  { name: 'Sun', value: 5 },
];

export default function StatsScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { darkMode, t } = useTheme();

  const materialData = [
    { name: 'Paper', value: 45, color: darkMode ? '#2dff7e' : '#1B3A2A' },
    { name: 'Plastic', value: 30, color: darkMode ? '#7ab88a' : '#98BC98' },
    { name: 'Glass', value: 15, color: darkMode ? '#111a15' : '#2D4A3A' },
    { name: 'Metal', value: 10, color: darkMode ? '#e8f5ee' : '#E6F2E6' },
  ];
  return (
    <div className="pb-24 flex flex-col min-h-full font-display bg-[var(--color-bg-main)] text-[var(--color-text-main)]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-12 pb-4 sticky top-0 z-20 bg-[var(--color-bg-main)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
        <button 
          onClick={() => onNavigate('profile')}
          className="text-[var(--color-text-main)] flex items-center justify-center rounded-full w-10 h-10 hover:bg-[var(--color-text-main)]/10 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black tracking-tight text-[var(--color-text-main)] uppercase">ESG Impact Hub</h1>
        <button className="text-[var(--color-text-main)] flex items-center justify-center rounded-full w-10 h-10 bg-[var(--color-text-main)]/5 hover:bg-[var(--color-text-main)]/10 transition-colors">
          <Filter size={20} />
        </button>
      </header>

      <main className="flex-1 px-6 py-8 space-y-8">
        {/* Investor-Grade Hero Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[var(--color-accent)] p-5 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:scale-110 transition-transform">
              <Coins size={40} className="text-[var(--color-bg-main)]" />
            </div>
            <p className="text-[var(--color-bg-main)]/60 text-[10px] font-black uppercase tracking-widest mb-1">Financial ROI</p>
            <h3 className="text-2xl font-black text-[var(--color-bg-main)]">6,025 <span className="text-xs text-[var(--color-bg-main)]/60 font-normal">KZT</span></h3>
            <div className="mt-2 flex items-center gap-1">
              <span className="text-[8px] font-black bg-[var(--color-bg-main)]/20 text-[var(--color-bg-main)] px-1.5 py-0.5 rounded uppercase">Verified Revenue</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-[var(--color-card-bg)] p-5 rounded-3xl border border-[var(--color-border)] shadow-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
              <Leaf size={40} className="text-[var(--color-accent)]" />
            </div>
            <p className="text-[var(--color-text-secondary)] text-[10px] font-black uppercase tracking-widest mb-1">Trees Preserved</p>
            <h3 className="text-2xl font-black text-[var(--color-text-main)]">2.4 <span className="text-xs text-[var(--color-text-secondary)] font-normal">Units</span></h3>
            <p className="text-[var(--color-accent)] text-[10px] font-black mt-2 flex items-center gap-1 uppercase tracking-wider">
              <TrendingUp size={12} /> +15% month
            </p>
          </motion.div>
        </div>

        {/* Resource Savings Grid */}
        <div className="grid grid-cols-3 gap-3">
          <ResourceCard index={0} icon={<Droplets size={16} />} label="Water" value="4.2k" unit="L" color="text-blue-500" />
          <ResourceCard index={1} icon={<Flame size={16} />} label="Energy" value="1.8k" unit="kWh" color="text-orange-500" />
          <ResourceCard index={2} icon={<Zap size={16} />} label="CO2" value="45.2" unit="kg" color="text-emerald-500" />
        </div>

        {/* Impact Forecasting Chart */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[var(--color-text-main)] font-black flex items-center gap-2 uppercase tracking-tight">
              <BarChart3 size={18} className="text-[var(--color-accent)]" />
              Impact Velocity
            </h3>
            <span className="text-[10px] text-[var(--color-text-secondary)] font-black uppercase tracking-widest">Projection Mode</span>
          </div>
          <div className="bg-[var(--color-card-bg)] rounded-[40px] p-6 border border-[var(--color-border)] h-72 shadow-xl shadow-black/5">
            <MemoizedAreaChart data={data} />
          </div>
        </section>

        {/* Material Distribution */}
        <section>
          <h3 className="text-[var(--color-text-main)] font-black mb-4 flex items-center gap-2 uppercase tracking-tight">
            <TrendingUp size={18} className="text-[var(--color-accent)]" />
            Material Breakdown
          </h3>
          <div className="bg-[var(--color-card-bg)] p-6 rounded-[40px] border border-[var(--color-border)] shadow-xl shadow-black/5 flex items-center gap-8">
            <div className="w-32 h-32">
              <MemoizedPieChart data={materialData} />
            </div>
            <div className="flex-1 space-y-3">
              <AnimatePresence>
                {materialData.map((item, idx) => (
                  <motion.div 
                    key={item.name} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[10px] font-black text-[var(--color-text-secondary)] uppercase tracking-widest">{item.name}</span>
                    </div>
                    <span className="text-xs font-black text-[var(--color-text-main)]">{item.value}%</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ResourceCard({ icon, label, value, unit, color, index }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
      className="bg-[var(--color-card-bg)] p-4 rounded-3xl border border-[var(--color-border)] shadow-sm flex flex-col items-center text-center group hover:border-[var(--color-accent)]/20 transition-all"
    >
      <div className={`w-10 h-10 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-2 ${color}`}>
        {icon}
      </div>
      <p className="text-[8px] font-black text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-sm font-black text-[var(--color-text-main)]">{value}<span className="text-[10px] font-normal ml-0.5">{unit}</span></h4>
    </motion.div>
  );
}
