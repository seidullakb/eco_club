import { ArrowLeft, Bell, Globe, Moon, Sun, ChevronRight, Languages, Shield, Info } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

interface SettingsProps {
  onBack: () => void;
}

export default function SettingsScreen({ onBack }: SettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const { darkMode, setDarkMode, language, setLanguage, t } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-24 flex flex-col min-h-full font-display bg-[var(--color-bg-main)] text-[var(--color-text-main)]"
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12 bg-[var(--color-accent)] z-10 relative overflow-hidden">
        <div className="absolute inset-0 geometric-green opacity-10" />
        <button 
          onClick={onBack}
          className="text-[var(--color-bg-main)] hover:bg-[var(--color-bg-main)]/10 transition-colors flex items-center justify-center w-10 h-10 rounded-full relative z-10"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-black tracking-tight uppercase text-[var(--color-bg-main)] relative z-10">{t('settings')}</h1>
        <div className="w-10 h-10" />
      </header>

      <main className="flex-1 flex flex-col px-6 space-y-8 pt-8">
        {/* Preferences Section */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest ml-1 text-[var(--color-text-secondary)]">{t('preferences')}</h3>
          
          <div className="rounded-3xl border shadow-xl overflow-hidden bg-[var(--color-card-bg)] border-[var(--color-border)] shadow-black/5">
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-500/10 text-blue-500">
                  <Bell size={20} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-[var(--color-text-main)]">{t('notifications')}</p>
                  <p className="text-[10px] font-bold text-[var(--color-text-secondary)]">{t('notifSub')}</p>
                </div>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-text-secondary)]/20'}`}
              >
                <motion.div 
                  animate={{ x: notifications ? 26 : 2 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-purple-500/10 text-purple-500">
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-[var(--color-text-main)]">{t('darkMode')}</p>
                  <p className="text-[10px] font-bold text-[var(--color-text-secondary)]">{t('darkSub')}</p>
                </div>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-text-secondary)]/20'}`}
              >
                <motion.div 
                  animate={{ x: darkMode ? 26 : 2 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>

            {/* Language Selection */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-orange-500/10 text-orange-500">
                  <Languages size={20} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-[var(--color-text-main)]">{t('language')}</p>
                  <p className="text-[10px] font-bold text-[var(--color-text-secondary)]">{language}</p>
                </div>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-xs font-black uppercase tracking-widest focus:outline-none cursor-pointer text-[var(--color-text-main)]"
              >
                <option value="English">English</option>
                <option value="Kazakh">Kazakh</option>
                <option value="Russian">Russian</option>
              </select>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest ml-1 text-[var(--color-text-secondary)]">{t('security')}</h3>
          <div className="rounded-3xl border shadow-xl overflow-hidden bg-[var(--color-card-bg)] border-[var(--color-border)] shadow-black/5">
            <motion.button 
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-5 border-b border-[var(--color-border)] transition-colors group hover:bg-[var(--color-text-main)]/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                  <Shield size={20} />
                </div>
                <p className="text-sm font-black uppercase tracking-tight text-[var(--color-text-main)]">{t('privacy')}</p>
              </div>
              <ChevronRight size={18} className="text-[var(--color-text-secondary)]/20 group-hover:text-[var(--color-text-main)] transition-colors" />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-5 transition-colors group hover:bg-[var(--color-text-main)]/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-slate-500/10 text-slate-500">
                  <Info size={20} />
                </div>
                <p className="text-sm font-black uppercase tracking-tight text-[var(--color-text-main)]">{t('about')}</p>
              </div>
              <ChevronRight size={18} className="text-[var(--color-text-secondary)]/20 group-hover:text-[var(--color-text-main)] transition-colors" />
            </motion.button>
          </div>
        </section>

        {/* Version Info */}
        <div className="text-center pt-4">
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--color-text-secondary)]/30">{t('version')}</p>
        </div>
      </main>
    </motion.div>
  );
}
