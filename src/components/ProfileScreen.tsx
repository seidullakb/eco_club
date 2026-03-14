import { User as UserIcon, Award, TrendingUp, History, ChevronRight, LogOut, ShieldCheck, Mail, Rocket, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function ProfileScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { darkMode, t } = useTheme();
  const { user } = useAuth();
  const achievements = [
    { id: 1, title: "Early Adopter", icon: "🚀", color: "bg-forest/10" },
    { id: 2, title: "Paper King", icon: "📄", color: "bg-sage/20" },
    { id: 3, title: "Team Player", icon: "🤝", color: "bg-olive/10" },
  ];

  return (
    <div className="pb-24 flex flex-col min-h-full font-display bg-[var(--color-bg-main)] text-[var(--color-text-main)]">
      {/* Header */}
      <div className="relative pt-16 pb-8 px-6 flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[var(--color-accent)]/10 to-transparent"></div>
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-[var(--color-accent)] p-1 shadow-lg">
            <img src="https://i.pravatar.cc/150?img=32" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="absolute bottom-0 right-0 bg-[var(--color-accent)] text-[var(--color-bg-main)] p-1.5 rounded-full border-2 border-[var(--color-bg-main)]">
            <ShieldCheck size={16} />
          </div>
        </div>
        <h2 className="mt-4 text-2xl font-black text-[var(--color-text-main)]">{user?.displayName || 'Eco Warrior'}</h2>
        <p className="text-[var(--color-text-secondary)] text-sm font-bold uppercase tracking-wider">{user?.email}</p>
        
        <div className="flex gap-4 mt-6">
          <div className="bg-[var(--color-card-bg)] px-4 py-2 rounded-2xl border border-[var(--color-border)] text-center shadow-sm">
            <p className="text-[var(--color-text-main)] font-black text-lg">1,250</p>
            <p className="text-[10px] text-[var(--color-text-secondary)] uppercase font-black tracking-widest">Total XP</p>
          </div>
          <div className="bg-[var(--color-card-bg)] px-4 py-2 rounded-2xl border border-[var(--color-border)] text-center shadow-sm">
            <p className="text-[var(--color-text-main)] font-black text-lg">#42</p>
            <p className="text-[10px] text-[var(--color-text-secondary)] uppercase font-black tracking-widest">Global Rank</p>
          </div>
          <div className="bg-[var(--color-card-bg)] px-4 py-2 rounded-2xl border border-[var(--color-border)] text-center shadow-sm">
            <p className="text-[var(--color-text-main)] font-black text-lg">12</p>
            <p className="text-[10px] text-[var(--color-text-secondary)] uppercase font-black tracking-widest">Badges</p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Personal Stats Card */}
        <div className="bg-[var(--color-accent)] p-6 rounded-[40px] text-[var(--color-bg-main)] relative overflow-hidden shadow-2xl shadow-[var(--color-accent)]/20">
          <div className="absolute top-0 right-0 w-32 h-32 geometric-green opacity-10 -mr-8 -mt-8 rotate-12" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-bg-main)]/60 mb-2">Personal Impact</h3>
          <p className="text-lg font-bold leading-tight mb-4">
            You have helped your class collect <span className="text-[var(--color-bg-main)]">42.5 kg</span> of paper this month!
          </p>
          <div className="w-full h-2 bg-[var(--color-bg-main)]/10 rounded-full overflow-hidden">
            <div className="w-[65%] h-full bg-[var(--color-bg-main)] rounded-full" />
          </div>
          <p className="text-[8px] font-black uppercase tracking-widest mt-2 text-[var(--color-bg-main)]/40">65% of monthly goal</p>
        </div>

        {/* Achievements */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[var(--color-text-main)] font-black flex items-center gap-2 uppercase tracking-tight">
              <Award size={18} className="text-[var(--color-accent)]" />
              Digital Badges
            </h3>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('journey')}
              className="text-[10px] text-[var(--color-text-main)] font-black uppercase tracking-widest"
            >
              View All
            </motion.button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {achievements.map((ach) => (
              <div key={ach.id} className={`bg-[var(--color-card-bg)] min-w-[100px] aspect-square rounded-3xl flex flex-col items-center justify-center border border-[var(--color-border)] shadow-sm`}>
                <span className="text-2xl mb-1">{ach.icon}</span>
                <span className="text-[10px] font-black text-[var(--color-text-main)] text-center px-2 uppercase tracking-tight">{ach.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Menu Options */}
        <section className="space-y-2">
          <MenuOption 
            icon={<TrendingUp size={18} />} 
            title="Impact Analytics" 
            subtitle="Detailed recycling stats" 
            onClick={() => onNavigate('stats')}
          />
          <MenuOption 
            icon={<Rocket size={18} />} 
            title="Startup Roadmap" 
            subtitle="Our 5-step growth strategy" 
            onClick={() => onNavigate('startup')}
          />
          <MenuOption 
            icon={<Settings size={18} />} 
            title="Settings" 
            subtitle="Notifications, Language, Theme" 
            onClick={() => onNavigate('settings')}
          />
          <MenuOption 
            icon={<Mail size={18} />} 
            title="Contact Eco-Club" 
            subtitle="Official Turkistan Eco-Club" 
            onClick={() => onNavigate('contact')}
          />
          <MenuOption 
            icon={<History size={18} />} 
            title="Contribution History" 
            subtitle="Your logs from the last 30 days" 
            onClick={() => onNavigate('stats')}
          />
          <MenuOption 
            icon={<ShieldCheck size={18} />} 
            title="Privacy & Security" 
            subtitle="Manage your account data" 
            onClick={() => onNavigate('settings')}
          />
        </section>

        {/* Logout */}
        <button 
          onClick={() => signOut(auth)}
          className="w-full flex items-center justify-center gap-2 py-4 text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-500/5 rounded-2xl transition-colors active:scale-95"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

function MenuOption({ icon, title, subtitle, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-[var(--color-card-bg)] rounded-3xl border border-[var(--color-border)] hover:border-[var(--color-accent)]/20 transition-all group shadow-sm"
    >
      <div className="w-10 h-10 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <h4 className="text-[var(--color-text-main)] font-black text-sm uppercase tracking-tight">{title}</h4>
        <p className="text-[10px] text-[var(--color-text-secondary)] font-bold">{subtitle}</p>
      </div>
      <ChevronRight size={18} className="text-[var(--color-text-secondary)]/30" />
    </button>
  );
}
