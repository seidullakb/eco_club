import { ArrowLeft, Share2, Trophy, FileText, Recycle, GraduationCap, FlaskConical, Brush, Dribbble, Music, Users, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Challenger {
  uid: string;
  name: string;
  ecoBalance: number;
  class: string;
  pickups: number;
  rank?: number;
}

export default function RankingsScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { darkMode, t } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [challengers, setChallengers] = useState<Challenger[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('ecoBalance', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map((doc, index) => ({
        uid: doc.id,
        ...(doc.data() as any),
        rank: index + 1
      }));
      setChallengers(users);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredChallengers = challengers.filter(c => 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.class?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topChallenger = challengers[0];

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
        {!searchQuery && topChallenger && (
          <div className="relative w-full rounded-[40px] overflow-hidden mt-2 group border border-[var(--color-border)] shadow-2xl bg-[var(--color-card-bg)]">
            <div className="absolute top-0 right-0 p-6 z-10">
              <div className="bg-[var(--color-accent)] text-[var(--color-bg-main)] text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-2 shadow-xl uppercase tracking-widest">
                <Trophy size={16} />
                {t('rank.leader')}
              </div>
            </div>
            
            <div className="relative h-40 w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-main)] via-[var(--color-bg-main)]/50 to-transparent z-10"></div>
              <img src={`https://i.pravatar.cc/400?u=${topChallenger.uid}`} alt="Leader" className="w-full h-full object-cover" />
            </div>
            
            <div className="relative z-20 px-5 pb-5 -mt-12">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h2 className="text-3xl font-black text-[var(--color-text-main)] mb-1">{topChallenger.name}</h2>
                  <p className="text-[var(--color-accent)] text-xs font-bold flex items-center gap-1 uppercase tracking-wide">
                    {topChallenger.class || "New Explorer"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-[var(--color-text-main)]">{topChallenger.ecoBalance}</p>
                  <p className="text-[var(--color-text-main)]/40 text-[10px] font-black uppercase tracking-widest">Points</p>
                </div>
              </div>
              
              {/* Stats Breakdown */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-[var(--color-bg-main)]/50 backdrop-blur-sm rounded-2xl p-3 border border-[var(--color-border)]">
                  <div className="flex items-center gap-2 mb-1">
                    <Recycle size={16} className="text-[var(--color-accent)]" />
                    <span className="text-[var(--color-text-main)]/60 text-[10px] font-bold uppercase tracking-wider">Pickups</span>
                  </div>
                  <p className="text-[var(--color-text-main)] font-black text-lg">{topChallenger.pickups} <span className="text-xs font-normal text-[var(--color-text-main)]/40">times</span></p>
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
            <RankItem key={item.uid} {...item} />
          ))}
          {filteredChallengers.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-[var(--color-text-main)]/20 font-black uppercase tracking-widest text-sm">{t('rank.noresults')}</p>
            </div>
          )}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-[var(--color-accent)]/20 border-t-[var(--color-accent)] rounded-full animate-spin" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function RankItem({ rank, name, ecoBalance, class: userClass, uid }: any) {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="bg-[var(--color-card-bg)] backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 relative overflow-hidden group hover:opacity-80 transition-all border border-[var(--color-border)] cursor-pointer"
    >
      <div className="flex-shrink-0 w-8 flex flex-col items-center justify-center">
        <span className={`text-xl font-black ${rank <= 3 ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-main)]/40'}`}>{rank}</span>
      </div>
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[var(--color-bg-main)]/50 border border-[var(--color-border)] flex items-center justify-center overflow-hidden">
        <img src={`https://i.pravatar.cc/150?u=${uid}`} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h4 className="text-[var(--color-text-main)] font-bold truncate">{name}</h4>
          <span className="text-[var(--color-text-main)] font-black text-lg">{ecoBalance} <span className="text-xs text-[var(--color-text-main)]/40 font-normal">pts</span></span>
        </div>
        <div className="text-[10px] text-[var(--color-text-main)]/40 font-bold uppercase tracking-wider">
          {userClass || "New Explorer"}
        </div>
      </div>
    </motion.div>
  );
}


