import { ArrowLeft, Settings, Zap, CheckCircle2, Circle, Trophy, Timer, Star, ClipboardList, Filter } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import JourneyMilestone from './JourneyMilestone';
import { useTheme } from '../contexts/ThemeContext';

export default function JourneyScreen({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { darkMode, t } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');
  const [completedMilestone, setCompletedMilestone] = useState<string | null>(null);

  const weeklyTasks = [
    {
      id: 1,
      title: "Dormitory Cleanup",
      description: "Collect 20 A4 papers from your dormitory wing. Perfect for old exam prep sheets!",
      progress: 12,
      total: 20,
      reward: "50 XP",
      type: "Paper",
      icon: <ClipboardList className="text-[var(--color-text-main)]" />
    },
    {
      id: 2,
      title: "Cafeteria Plastic",
      description: "Bring 5 plastic bottles from the girls' cafeteria to the collection point.",
      progress: 5,
      total: 5,
      reward: "100 XP",
      type: "Plastic",
      completed: true,
      icon: <Zap className="text-[var(--color-accent)]" />
    },
    {
      id: 3,
      title: "Tutor's Assistant",
      description: "Help your tutor organize the recycling bin in the 9th-grade corridor.",
      progress: 0,
      total: 1,
      reward: "200 XP",
      type: "Social",
      icon: <Star className="text-[var(--color-text-secondary)]" />
    },
    {
      id: 4,
      title: "Library Paper Drive",
      description: "Recycle 10 old magazines or newspapers from the school library.",
      progress: 1,
      total: 10,
      reward: "150 XP",
      type: "Paper",
      icon: <Trophy className="text-[var(--color-text-main)]" />
    }
  ];

  const filteredTasks = activeFilter === 'All' 
    ? weeklyTasks 
    : weeklyTasks.filter(t => t.type === activeFilter);

  const categories = ['All', 'Paper', 'Plastic', 'Social'];

  return (
    <div className="pb-24 flex flex-col min-h-full font-display bg-[var(--color-bg-main)] text-[var(--color-text-main)]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[var(--color-accent)] pb-8 pt-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 geometric-green opacity-10" />
        <div className="flex items-center justify-between mb-8 relative z-10">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-bg-main)]/10 text-[var(--color-bg-main)] hover:bg-[var(--color-bg-main)]/20 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-bg-main)]/10 border border-[var(--color-bg-main)]/20">
            <Timer size={14} className="text-[var(--color-bg-main)]" />
            <span className="text-[10px] font-black text-[var(--color-bg-main)] tracking-[0.2em] uppercase">Sprint Week 8</span>
          </div>
          <button 
            onClick={() => onNavigate('settings')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-bg-main)]/10 text-[var(--color-bg-main)] hover:bg-[var(--color-bg-main)]/20 transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-[var(--color-bg-main)] leading-tight tracking-tight">Weekly <br /><span className="text-[var(--color-bg-main)]/60">Challenges</span></h1>
          <p className="text-[var(--color-bg-main)]/40 text-xs font-bold uppercase tracking-widest mt-2">Lyceum Efficiency Drive</p>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 relative z-10">
        {completedMilestone && (
          <JourneyMilestone 
            isReached={true} 
            title={completedMilestone} 
            onComplete={() => setCompletedMilestone(null)} 
          />
        )}
        {/* Stats Summary */}
        <div className="bg-[var(--color-card-bg)] rounded-3xl p-6 border border-[var(--color-border)] mb-8 shadow-xl shadow-black/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 geometric-green opacity-5 -mr-8 -mt-8" />
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[var(--color-text-main)] font-black uppercase tracking-widest text-[10px]">Your Progress</h3>
            <span className="text-[var(--color-text-main)] text-xs font-black">1/4 DONE</span>
          </div>
          <div className="w-full bg-[var(--color-bg-main)]/30 h-3 rounded-full overflow-hidden">
            <div className="bg-[var(--color-accent)] h-full w-[25%] rounded-full shadow-sm"></div>
          </div>
          <p className="text-[10px] text-[var(--color-text-secondary)] mt-4 text-center font-black uppercase tracking-widest opacity-60">Earn "Eco-Warrior" Badge</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
          <div className="p-2 bg-[var(--color-accent)]/10 rounded-xl text-[var(--color-accent)] shrink-0">
            <Filter size={16} />
          </div>
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${activeFilter === cat ? 'bg-[var(--color-accent)] text-[var(--color-bg-main)] shadow-lg' : 'bg-[var(--color-card-bg)] text-[var(--color-text-main)] border border-[var(--color-border)]'}`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <motion.div 
              key={task.id} 
              whileTap={{ scale: 0.98 }}
              className={`bg-[var(--color-card-bg)] rounded-2xl p-5 border transition-all ${task.completed ? 'border-[var(--color-accent)]/50 opacity-80' : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/20 shadow-sm'}`}
            >
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${task.completed ? 'bg-[var(--color-accent)]/20' : 'bg-[var(--color-bg-main)]/30'}`}>
                  {task.completed ? <CheckCircle2 className="text-[var(--color-accent)]" /> : task.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-bold ${task.completed ? 'text-[var(--color-text-secondary)] line-through' : 'text-[var(--color-text-main)]'}`}>{task.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                      {task.reward}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-4 font-medium">{task.description}</p>
                  
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-[var(--color-text-secondary)] uppercase font-bold tracking-wider">{task.type}</span>
                        <span className="text-[var(--color-text-main)] font-bold">{task.progress} / {task.total}</span>
                      </div>
                      <div className="w-full bg-[var(--color-bg-main)]/20 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${task.completed ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-accent)]/40'}`} 
                          style={{ width: `${(task.progress / task.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    {!task.completed && (
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCompletedMilestone(task.title)}
                        className="bg-[var(--color-accent)]/10 hover:bg-[var(--color-accent)]/20 text-[var(--color-accent)] p-2 rounded-lg transition-colors"
                      >
                        <Circle size={20} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredTasks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[var(--color-text-secondary)]/40 font-black uppercase tracking-widest text-xs">No tasks in this category</p>
            </div>
          )}
        </div>

        {/* Special Tutor Mission */}
        <div className="mt-10 bg-[var(--color-accent)] rounded-2xl p-6 border border-[var(--color-bg-main)]/10 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Star size={80} className="text-[var(--color-bg-main)]" />
          </div>
          <h3 className="text-lg font-bold text-[var(--color-bg-main)] mb-2">Weekend Mega-Quest</h3>
          <p className="text-sm text-[var(--color-bg-main)]/80 mb-4 font-medium">Organize a mini-recycling drive in your dormitory or classroom wing. Get 10 people to participate!</p>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-main)] overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=${i + 20}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-main)]/20 flex items-center justify-center text-[10px] font-bold text-[var(--color-bg-main)]">
                +6
              </div>
            </div>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="bg-[var(--color-bg-main)] hover:opacity-90 text-[var(--color-accent)] px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-lg shadow-black/10"
            >
              Join Mission
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}


