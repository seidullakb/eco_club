import { ArrowLeft, Share2, Trophy, FileText, Recycle, GraduationCap, FlaskConical, Brush, Dribbble, Music, Users, Search } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

export default function RankingsScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { darkMode, t } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const challengers = [
    { rank: 2, name: "Class 10B", weight: 950, paper: 400, plastic: 550, icon: <GraduationCap size={20} />, trend: "up" },
    { rank: 3, name: "Class 10A", weight: 820, paper: 320, plastic: 500, icon: <FlaskConical size={20} />, trend: "up" },
    { rank: 4, name: "Class 7C", weight: 745, paper: 300, plastic: 445, icon: <Brush size={20} />, trend: "down" },
    { rank: 5, name: "Class 8B", weight: 610, paper: 200, plastic: 410, icon: <Dribbble size={20} />, trend: "flat" },
    { rank: 6, name: "Class 9C", weight: 580, paper: 280, plastic: 300, icon: <Music size={20} />, trend: "up" },
  ];

  const filteredChallengers = challengers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24 flex flex-col min-h-full font-display bg-[var(--color-bg-main)] text-[var(--color-text-main)]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-12 pb-4 sticky top-0 z-20 relative overflow-hidden bg-[var(--color-bg-main)]">
        <div className="absolute inset-0 geometric-green opacity-10" />
        <button 
          onClick={() => onNavigate('home')}
          className="text-[var(--color-accent)] flex items-center justify-center rounded-full w-10 h-10 hover:bg-[var(--color-accent)]/10 transition-colors relative z-10"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-black tracking-tight text-[var(--color-accent)] uppercase relative z-10">{t('rank.title')}</h1>
        <div className="flex gap-2 relative z-10">
          <button 
            onClick={() => onNavigate('profile')}
            className="text-[var(--color-text-secondary)] flex items-center justify-center rounded-full w-10 h-10 bg-[var(--color-card-bg)] hover:bg-[var(--color-card-bg)]/80 transition-colors border border-[var(--color-border)]"
          >
            <Users size={20} />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 mb-2 relative z-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-main)]/40" size={18} />
          <input 
            type="text" 
            placeholder={t('rank.search')} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl text-[var(--color-text-main)] placeholder:text-[var(--color-text-main)]/20 focus:outline-none focus:border-[var(--color-accent)] transition-all font-bold text-sm"
          />
        </div>
      </div>

      {/* Time Filter Tabs */}
      <div className="px-4 py-3 relative z-10">
        <div className="flex p-1 bg-[var(--color-card-bg)] rounded-2xl gap-1 border border-[var(--color-border)]">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-main)] text-[10px] font-black uppercase tracking-widest shadow-sm transition-all"
          >
            {t('rank.weekly')}
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2 rounded-xl text-[var(--color-text-main)]/40 hover:text-[var(--color-text-main)] text-[10px] font-black uppercase tracking-widest transition-all"
          >
            {t('rank.monthly')}
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2 rounded-xl text-[var(--color-text-main)]/40 hover:text-[var(--color-text-main)] text-[10px] font-black uppercase tracking-widest transition-all"
          >
            {t('rank.alltime')}
          </motion.button>
        </div>
      </div>

      <main className="flex-1 px-4 space-y-6 relative z-10">
        {/* Top Rank Card */}
        {!searchQuery && (
          <div className="relative w-full rounded-[40px] overflow-hidden mt-2 group border border-[var(--color-border)] shadow-2xl bg-[var(--color-card-bg)]">
            <div className="absolute top-0 right-0 p-6 z-10">
              <div className="bg-[var(--color-accent)] text-[var(--color-bg-main)] text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-2 shadow-xl uppercase tracking-widest">
                <Trophy size={16} />
                {t('rank.leader')}
              </div>
            </div>
            
            <div className="relative h-40 w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-main)] via-[var(--color-bg-main)]/50 to-transparent z-10"></div>
              <img src="https://images.unsplash.com/photo-1528323273322-d81458248d40?q=80&w=800&auto=format&fit=crop" alt="Students" className="w-full h-full object-cover" />
            </div>
            
            <div className="relative z-20 px-5 pb-5 -mt-12">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h2 className="text-3xl font-black text-[var(--color-text-main)] mb-1">Class 9A</h2>
                  <p className="text-[var(--color-accent)] text-xs font-bold flex items-center gap-1 uppercase tracking-wide">
                    The Golden Aura Champions
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-[var(--color-text-main)]">1,250</p>
                  <p className="text-[var(--color-text-main)]/40 text-[10px] font-black uppercase tracking-widest">{t('rank.totalKg')}</p>
                </div>
              </div>
              
              {/* Stats Breakdown */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-[var(--color-bg-main)]/50 backdrop-blur-sm rounded-2xl p-3 border border-[var(--color-border)]">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={16} className="text-[var(--color-text-main)]" />
                    <span className="text-[var(--color-text-main)]/60 text-[10px] font-bold uppercase tracking-wider">{t('rank.paper')}</span>
                  </div>
                  <p className="text-[var(--color-text-main)] font-black text-lg">680 <span className="text-xs font-normal text-[var(--color-text-main)]/40">kg</span></p>
                  <div className="w-full bg-[var(--color-bg-main)]/20 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-[var(--color-text-main)] h-full rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="bg-[var(--color-bg-main)]/50 backdrop-blur-sm rounded-2xl p-3 border border-[var(--color-border)]">
                  <div className="flex items-center gap-2 mb-1">
                    <Recycle size={16} className="text-[var(--color-accent)]" />
                    <span className="text-[var(--color-text-main)]/60 text-[10px] font-bold uppercase tracking-wider">{t('rank.plastic')}</span>
                  </div>
                  <p className="text-[var(--color-text-main)] font-black text-lg">570 <span className="text-xs font-normal text-[var(--color-text-main)]/40">kg</span></p>
                  <div className="w-full bg-[var(--color-bg-main)]/20 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-[var(--color-accent)] h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Title */}
        <div className="flex items-center justify-between pt-2 px-1">
          <h3 className="text-[var(--color-text-main)]/40 text-[10px] font-black uppercase tracking-widest">
            {searchQuery ? `${t('rank.noresults')} (${filteredChallengers.length})` : t('rank.challengers')}
          </h3>
          <span className="text-[10px] text-[var(--color-text-main)]/30 font-bold">{t('rank.updated')}</span>
        </div>

        {/* List Items */}
        <div className="space-y-3">
          {filteredChallengers.map((item) => (
            <RankItem key={item.rank} {...item} />
          ))}
          {filteredChallengers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--color-text-main)]/20 font-black uppercase tracking-widest text-sm">{t('rank.noresults')}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function RankItem({ rank, name, weight, paper, plastic, icon, trend }: any) {
  const getTrendIcon = () => {
    if (trend === 'up') return <span className="text-[10px] text-[var(--color-accent)] font-black">▲</span>;
    if (trend === 'down') return <span className="text-[10px] text-red-400 font-black">▼</span>;
    return <span className="text-[10px] text-[var(--color-text-main)]/30 font-black">-</span>;
  };

  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="bg-[var(--color-card-bg)] backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 relative overflow-hidden group hover:opacity-80 transition-all border border-[var(--color-border)] cursor-pointer"
    >
      <div className="flex-shrink-0 w-8 flex flex-col items-center justify-center">
        <span className={`text-xl font-black ${rank <= 3 ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-main)]/40'}`}>{rank}</span>
        {getTrendIcon()}
      </div>
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[var(--color-bg-main)]/50 border border-[var(--color-border)] flex items-center justify-center overflow-hidden text-[var(--color-text-main)]/60">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h4 className="text-[var(--color-text-main)] font-bold truncate">{name}</h4>
          <span className="text-[var(--color-text-main)] font-black text-lg">{weight} <span className="text-xs text-[var(--color-text-main)]/40 font-normal">kg</span></span>
        </div>
        {rank <= 3 ? (
          <div className="flex items-center gap-3 text-[10px] text-[var(--color-text-main)]/40 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-main)]"></span> {paper}kg Paper</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></span> {plastic}kg Plastic</span>
          </div>
        ) : (
          <div className="w-full bg-[var(--color-bg-main)]/20 h-1 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[var(--color-text-main)] to-[var(--color-accent)] h-full" style={{ width: `${(weight / 1250) * 100}%` }}></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
