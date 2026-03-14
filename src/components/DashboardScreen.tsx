import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Calendar, 
  Zap, 
  Droplets, 
  Flame, 
  Coins, 
  LayoutGrid, 
  Settings, 
  LogOut, 
  ShieldCheck,
  TrendingUp,
  Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function DashboardScreen({ onNavigate }: DashboardProps) {
  const { darkMode, t } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [stats, setStats] = useState({ 
    total_kzt: 0, 
    recycled_kg: 0, 
    active_projects: 0 
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('impact_stats')
        .select('*')
        .single();
      
      if (data && !error) {
        setStats(data);
      }
    };

    fetchStats();
    
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="p-6 pt-12">
        {/* Profile Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
                className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500/20"
                alt="Profile"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-lg p-0.5 border-2 border-black">
                <ShieldCheck size={12} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-xs text-emerald-500 font-medium tracking-wider uppercase opacity-70">Welcome back,</p>
              <h2 className="text-xl font-bold tracking-tight">Seidulla K.</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Calendar size={20} />
            </button>
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Main Impact Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-400 to-emerald-600 p-8 text-black shadow-2xl shadow-emerald-500/20 mb-8"
        >
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Total Impact Fund</p>
            <div className="flex items-baseline gap-2 mb-8">
              <h1 className="text-5xl font-black tracking-tighter">
                {stats.total_kzt.toLocaleString()}
              </h1>
              <span className="text-lg font-bold opacity-80">KZT</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">Active Projects</p>
                <p className="text-2xl font-black">{stats.active_projects}</p>
              </div>
              <div className="bg-black/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">Impact Score</p>
                <p className="text-2xl font-black">98.4</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-6 right-6 p-3 bg-black/10 backdrop-blur-md rounded-xl">
            <TrendingUp size={24} />
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-6 rounded-[24px] ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white shadow-sm border-gray-100'} border`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
              <Leaf size={20} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Recycled</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-xl font-bold">{stats.recycled_kg}kg</h3>
            </div>
          </div>
          
          <div className={`p-6 rounded-[24px] ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white shadow-sm border-gray-100'} border`}>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
              <Users size={20} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Network</p>
            <h3 className="text-xl font-bold">1.2k</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
