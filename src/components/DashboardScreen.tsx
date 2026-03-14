import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  TrendingUp, 
  Leaf, 
  Award, 
  ChevronRight, 
  Plus, 
  ArrowUpRight, 
  Users, 
  Calendar,
  Zap,
  Droplets,
  Flame,
  Coins,
  LayoutGrid,
  Settings,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase'; // Импортируем связь с базой

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function DashboardScreen({ onNavigate }: DashboardProps) {
  const { darkMode, t } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Создаем состояние для хранения реальных цифр из базы
  const [stats, setStats] = useState({ 
    total_kzt: 0, 
    recycled_kg: 0, 
    active_projects: 0 
  });

  useEffect(() => {
    // Функция для получения данных из Supabase
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('impact_stats')
        .select('*')
        .single(); // Берем одну строку с данными
      
      if (data && !error) {
        setStats(data); // Обновляем цифры на экране
      }
    };

    fetchStats();

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pb-24 flex flex-col min-h-full font-display bg-[var(--color-bg-main)] text-[var(--color-text-main)]">
      {/* Header */}
      <header className={`sticky top-0 z-30 px-6 pt-12 pb-4 transition-all duration-300 ${scrolled ? 'bg-[var(--color-bg-main)]/90 backdrop-blur-md border-b border-[var(--color-border)]' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl border-2 border-[var(--color-accent)] p-0.5 shadow-lg overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=32" alt="Profile" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[var(--color-accent)] text-[var(--color-bg-main)] p-1 rounded-lg border-2 border-[var(--color-bg-main)] shadow-sm">
                <ShieldCheck size={12} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{t('dash.welcome')}</p>
              <h2 className="text-lg font-black tracking-tight">{t('dash.user')} K.</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 rounded-2xl transition-all bg-[var(--color-card-bg)] hover:opacity-80 border border-[var(--color-border)]"
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[var(--color-accent)] rounded-full border-2 border-[var(--color-bg-main)] animate-pulse" />
            </button>
            <button 
              onClick={() => onNavigate('settings')}
              className="p-3 rounded-2xl transition-all bg-[var(--color-card-bg)] hover:opacity-80 border border-[var(--color-border)]"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-4 space-y-8">
        {/* Hero KPI Card */}
        <section className="relative">
          <div className="bg-[var(--color-accent)] p-8 rounded-[40px] text-[var(--color-bg-main)] relative overflow-hidden shadow-2xl shadow-[var(--color-accent)]/20 group">
            <div className="absolute inset-0 geometric-green opacity-10 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--color-bg-main)]/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">{t('dash.totalFund')}</p>
                  <h3 className="text-4xl font-black tracking-tighter">
                    {/* ЖИВАЯ ЦИФРА: Сумма из базы */}
                    {stats.total_kzt.toLocaleString()} <span className="text-sm font-normal opacity-60">KZT</span>
                  </h3>
                </div>
                <div className="bg-[var(--color-bg-main)]/20 p-2 rounded-xl backdrop-blur-md">
                  <TrendingUp size={20} className="text-[var(--color-bg-main)]" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--color-bg-main)]/5 backdrop-blur-sm p-4 rounded-3xl border border-[var(--color-bg-main)]/10">
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1">{t('dash.activeProjects')}</p>
                  {/* ЖИВАЯ ЦИФРА: Проекты */}
                  <p className="text-xl font-black">{stats.active_projects}</p>
                </div>
                <div className="bg-[var(--color-bg-main)]/5 backdrop-blur-sm p-4 rounded-3xl border border-[var(--color-bg-main)]/10">
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1">{t('dash.impactScore')}</p>
                  <p className="text-xl font-black">98.4</p>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('stats')}
                className="w-full mt-6 bg-[var(--color-bg-main)] hover:opacity-90 text-[var(--color-accent)] py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-[var(--color-bg-main)]/20"
              >
                {t('dash.invest')}
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[var(--color-text-main)] font-black flex items-center gap-2 uppercase tracking-tight">
              <LayoutGrid size={18} className="text-[var(--color-accent)]" />
              {t('dash.quickStats')}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              icon={<Leaf size={20} />} 
              label={t('dash.recycled')} 
              /* ЖИВАЯ ЦИФРА: Переработка */
              value={`${stats.recycled_kg}kg`} 
              trend="+12%" 
              color="bg-[var(--color-accent)]/10" 
              textColor="text-[var(--color-text-main)]"
            />
            <StatCard 
              icon={<Users size={20} />} 
              label={t('dash.network')} 
              value="1.2k" 
              trend="+5%" 
              color="bg-[var(--color-accent)]/10" 
              textColor="text-[var(--color-text-main)]"
            />
            <StatCard 
              icon={<Award size={20} />} 
              label={t('dash.rank')} 
              value="#42" 
              trend="Top 5%" 
              color="bg-[var(--color-accent)]/10" 
              textColor="text-[var(--color-text-main)]"
            />
            <StatCard 
              icon={<Calendar size={20} />} 
              label={t('dash.streak')} 
              value="14d" 
              trend="Best!" 
              color="bg-[var(--color-accent)]/10" 
              textColor="text-[var(--color-text-main)]"
            />
          </div>
        </section>

        {/* Остальные секции (Activity Feed, Milestone) остаются без изменений */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[var(--color-text-main)] font-black flex items-center gap-2 uppercase tracking-tight">
              <Zap size={18} className="text-[var(--color-accent)]" />
              {t('dash.recentActivity')}
            </h3>
            <button 
              onClick={() => onNavigate('journey')}
              className="text-[10px] text-[var(--color-text-main)] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
            >
              {t('dash.viewAll')}
            </button>
          </div>
          <div className="space-y-3">
            <ActivityCard 
              icon={<Leaf size={16} />} 
              title="Paper Collection" 
              desc="12kg collected in Block A" 
              time="2h ago" 
              points="+50" 
            />
            <ActivityCard 
              icon={<Award size={16} />} 
              title="New Milestone" 
              desc="Reached Level 3 Eco-Warrior" 
              time="5h ago" 
              points="+200" 
            />
            <ActivityCard 
              icon={<Users size={16} />} 
              title="Team Challenge" 
              desc="Joined 'Zero Waste Week'" 
              time="Yesterday" 
              points="+100" 
            />
          </div>
        </section>

        <div className="bg-[var(--color-card-bg)] p-6 rounded-[40px] border border-[var(--color-border)] flex items-center justify-between group cursor-pointer hover:opacity-80 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-bg-main)] shadow-lg">
              <Award size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-secondary)]">{t('dash.nextMilestone')}</p>
              <h4 className="text-sm font-black text-[var(--color-text-main)]">Eco-Master Level 4</h4>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg-main)] transition-all">
            <ChevronRight size={20} />
          </div>
        </div>
      </main>

      {/* Notification Drawer */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifications(false)}
              className="fixed inset-0 bg-[var(--color-bg-main)]/20 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-80 z-50 shadow-2xl p-6 bg-[var(--color-bg-main)] border-l border-[var(--color-border)]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black uppercase tracking-tight">{t('dash.notifications')}</h3>
                <button onClick={() => setShowNotifications(false)} className="p-2 hover:bg-[var(--color-card-bg)] rounded-xl transition-colors">
                  <LogOut size={20} className="rotate-180" />
                </button>
              </div>
              <div className="space-y-4">
                <NotificationItem 
                  title="New Challenge" 
                  desc="The 'Plastic Free' challenge starts tomorrow!" 
                  time="10m ago" 
                  isNew 
                />
                <NotificationItem 
                  title="Points Awarded" 
                  desc="You earned 50 points for paper recycling." 
                  time="2h ago" 
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Вспомогательные компоненты StatCard, ActivityCard, NotificationItem остаются прежними
function StatCard({ icon, label, value, trend, color, textColor }: any) {
  return (
    <div className="bg-[var(--color-card-bg)] p-5 rounded-[32px] border border-[var(--color-border)] shadow-sm hover:shadow-md transition-all group">
      <div className={`w-10 h-10 rounded-2xl ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-[var(--color-accent)]`}>
        {icon}
      </div>
      <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1">{label}</p>
      <div className="flex items-baseline justify-between">
        <h4 className="text-xl font-black tracking-tight">{value}</h4>
        <span className="text-[8px] font-black text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-1.5 py-0.5 rounded uppercase">{trend}</span>
      </div>
    </div>
  );
}

function ActivityCard({ icon, title, desc, time, points }: any) {
  return (
    <div className="bg-[var(--color-card-bg)] p-4 rounded-3xl border border-[var(--color-border)] flex items-center gap-4 hover:border-[var(--color-accent)]/30 transition-all group">
      <div className="w-10 h-10 rounded-2xl bg-[var(--color-bg-main)]/50 flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg-main)] transition-all">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="text-xs font-black uppercase tracking-tight">{title}</h4>
          <span className="text-[10px] font-black text-[var(--color-accent)]">{points}</span>
        </div>
        <div className="flex justify-between items-center mt-0.5">
          <p className="text-[10px] opacity-40 font-bold">{desc}</p>
          <p className="text-[8px] opacity-20 font-black uppercase tracking-widest">{time}</p>
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ title, desc, time, isNew }: any) {
  return (
    <div className={`p-4 rounded-2xl border transition-all ${isNew ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20' : 'bg-[var(--color-card-bg)] border-[var(--color-border)]'}`}>
      <div className="flex justify-between items-start mb-1">
        <h4 className="text-xs font-black uppercase tracking-tight">{title}</h4>
        {isNew && <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full" />}
      </div>
      <p className="text-[10px] opacity-60 leading-relaxed font-bold">{desc}</p>
      <p className="text-[8px] opacity-30 mt-2 font-black uppercase tracking-widest">{time}</p>
    </div>
  );
}
