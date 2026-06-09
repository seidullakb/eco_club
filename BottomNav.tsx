import React from 'react';
import { Home, Trophy, Plus, Map, User, ClipboardCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function BottomNav({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const { darkMode, t } = useTheme();
  const { userProfile } = useAuth();

  const isMentorOrAdmin = userProfile?.role === 'mentor' || userProfile?.role === 'admin';
  const centerTab = isMentorOrAdmin ? 'approvals' : 'submit';
  const centerLabel = isMentorOrAdmin ? t('nav.approvals') : t('nav.submit');
  const CenterIcon = isMentorOrAdmin ? ClipboardCheck : Plus;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.3)] bg-[var(--color-card-bg)] border-[var(--color-border)]">
      <div className="flex justify-around items-center px-2 py-3 max-w-md mx-auto h-20 relative">
        {/* Background Pattern on Nav */}
        <div className="absolute inset-0 geometric-green opacity-5 pointer-events-none" />
        
        <NavItem 
          icon={<Home size={22} />} 
          label={t('nav.home')} 
          isActive={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
          darkMode={darkMode}
        />
        <NavItem 
          icon={<Trophy size={22} />} 
          label={t('nav.rankings')} 
          isActive={activeTab === 'rankings'} 
          onClick={() => setActiveTab('rankings')} 
          darkMode={darkMode}
        />
        
        {/* Center Action Button */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveTab(centerTab)}
          className="flex flex-col items-center justify-center -translate-y-6 relative group z-20"
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl border-4 transition-all duration-300 border-[var(--color-bg-main)] ${activeTab === centerTab ? 'bg-[var(--color-accent)] text-[var(--color-bg-main)] rotate-0 scale-110' : 'bg-[var(--color-card-bg)] text-[var(--color-text-secondary)] rotate-45 hover:rotate-0 hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-main)]'}`}>
            <CenterIcon size={32} className={activeTab === centerTab ? '' : '-rotate-45 group-hover:rotate-0 transition-transform duration-300'} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest mt-2 ${activeTab === centerTab ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]/40'}`}>{centerLabel}</span>
        </motion.button>

        <NavItem 
          icon={<Map size={22} />} 
          label={t('nav.journey')} 
          isActive={activeTab === 'journey'} 
          onClick={() => setActiveTab('journey')} 
          darkMode={darkMode}
        />
        <NavItem 
          icon={<User size={22} />} 
          label={t('nav.profile')} 
          isActive={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')} 
          darkMode={darkMode}
        />
      </div>
    </nav>
  );
}

function NavItem({ icon, label, isActive, onClick, darkMode }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void, darkMode: boolean }) {
  return (
    <motion.button 
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 min-w-[64px] transition-all relative z-10 ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]/40 hover:text-[var(--color-text-main)]'}`}
    >
      <div className={`transition-all duration-300 ${isActive ? '-translate-y-1 scale-110' : ''}`}>
        {icon}
      </div>
      <span className={`text-[9px] font-black uppercase tracking-widest transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
      {isActive && <div className="absolute -bottom-2 w-1 h-1 bg-[var(--color-accent)] rounded-full" />}
    </motion.button>
  );
}
