import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  TrendingUp, 
  Leaf, 
  Award, 
  ChevronRight, 
  ArrowUpRight, 
  Users, 
  Calendar,
  Zap,
  LayoutGrid,
  Settings,
  LogOut,
  ShieldCheck,
  FileText,
  GlassWater
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { doc, onSnapshot, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import GlobalNotificationsList from './GlobalNotificationsList';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

interface ImpactStats {
  total_kzt: number;
  recycled_kg: number;
  active_projects: number;
  trees_planted: number;
  co2_saved: number;
}

interface Activity {
  id: string;
  type: string;
  amountKg: number;
  status: string;
  createdAt: string;
  userClass: string;
}

export default function DashboardScreen({ onNavigate }: DashboardProps) {
  const { t } = useTheme();
  const { user, userProfile } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [stats, setStats] = useState<ImpactStats>({
    total_kzt: 0,
    recycled_kg: 0,
    active_projects: 0,
    trees_planted: 0,
    co2_saved: 0
  });
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'stats', 'impact'), (docSnap) => {
      if (docSnap.exists()) setStats(docSnap.data() as ImpactStats);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'submissions'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setActivities(snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Activity[]);
    });
    return () => unsubscribe();
  }, [user]);

  const getMaterialIcon = (type: string) => {
    if (type === 'plastic') return <GlassWater size={16} />;
    return <FileText size={16} />;
  };

  const getActivityTitle = (type: string) => {
    if (type === 'plastic') return 'Plastic Collection';
    return 'Paper Collection';
  };

  const formatTime = (createdAt: string) => {
    if (!createdAt) return '';
    const diff = Date.now() - new Date(createdAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="pb-24 flex flex-col min-h-full font-display bg-[var(--color-bg-main)] text-[var(--color-text-main)]">
      <header className={`sticky top-0 z-30 px-6 pt-12 pb-4 transition-all duration-300 ${scrolled ? 'bg-[var(--color-bg-main)]/90 backdrop-blur-md border-b border-[var(--color-border)]' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl border-2 border-[var(--color-accent)] p-0.5 shadow-lg overflow-hidden">
                <img src={userProfile?.uid ? `https://i.pravatar.cc/150?u=${userProfile.uid}` : "https://i.pravatar.cc/150?img=32"} alt="Profile" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[var(--color-accent)] text-[var(--color-bg-main)] p-1 rounded-lg border-2 border-[var(--color-bg-main)] shadow-sm">
                <ShieldCheck size={12} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{t('dash.welcome')}</p>
              <h2 className="text-lg font-black tracking-tight">
                {user?.displayName?.split(' ')[0] || userProfile?.name?.split(' ')[0] || t('dash.user')}
              </h2>
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
            {userProfile?.role === 'admin' && (
              <button
                onClick={() => onNavigate('admin')}
                className="p-3 rounded-2xl transition-all bg-[var(--color-accent)]/10 hover:opacity-80 border border-[var(--color-accent)]/30"
              >
                <ShieldCheck size={20} className="text-[var(--color-accent)]" />
              </button>
            )}
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
        <section className="relative">
          <div className="bg-[var(--color-accent)] p-8 rounded-[40px] text-[var(--color-bg-main)] relative overflow-hidden shadow-2xl shadow-[var(--color-accent)]/20 group">
            <div className="absolute inset-0 geometric-green opacity-10 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--color-bg-main)]/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">{t('dash.totalFund')}</p>
                  <h3 className="text-4xl font-black tracking-tighter">
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
                  <p className="text-xl font-black">{stats.active_projects}</p>
                </div>
                <div className="bg-[var(--color-bg-main)]/5 backdrop-blur-sm p-4 rounded-3xl border border-[var(--color-bg-main)]/10">
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1">{t('dash.impactScore')}</p>
                  <p className="text-xl font-black">{stats.co2_saved.toFixed(1)}</p>
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

        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[var(--color-text-main)] font-black flex items-center gap-2 uppercase tracking-tight">
              <LayoutGrid size={18} className="text-[var(--color-accent)]" />
              {t('dash.quickStats')}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={<Leaf size={20} />} label={t('dash.recycled')} value={`${stats.recycled_kg}kg`} trend="+0%" color="bg-[var(--color-accent)]/10" />
            <StatCard icon={<Users size={20} />} label={t('dash.network')} value={userProfile?.ecoBalance || 0} trend="Points" color="bg-[var(--color-accent)]/10" />
            <StatCard icon={<Award size={20} />} label={t('dash.rank')} value={userProfile?.pickups || 0} trend="Pickups" color="bg-[var(--color-accent)]/10" />
            <StatCard icon={<Calendar size={20} />} label={t('dash.streak')} value={`${stats.trees_planted}`} trend="Trees" color="bg-[var(--color-accent)]/10" />
          </div>
        </section>

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
            {activities.length === 0 ? (
              <div className="text-center py-8 text-[var(--color-text-main)]/20 text-xs font-black uppercase tracking-widest">
                No activity yet — submit your first recycling!
              </div>
            ) : (
              activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  icon={getMaterialIcon(activity.type)}
                  title={getActivityTitle(activity.type)}
                  desc={`${activity.amountKg}kg • ${activity.userClass}`}
                  time={formatTime(activity.createdAt)}
                  points={activity.status === 'approved' ? '+50' : 'Pending'}
                />
              ))
            )}
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
              className="fixed top-0 right-0 h-full w-80 z-50 shadow-2xl p-6 bg-[var(--color-bg-main)] border-l border-[var(--color-border)] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black uppercase tracking-tight">{t('dash.notifications')}</h3>
                <button onClick={() => setShowNotifications(false)} className="p-2 hover:bg-[var(--color-card-bg)] rounded-xl transition-colors">
                  <LogOut size={20} className="rotate-180" />
                </button>
              </div>
              <GlobalNotificationsList />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ icon, label, value, trend, color }: any) {
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