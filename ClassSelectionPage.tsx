import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';
import { CheckCircle2, Loader2, Users, Sparkles, GraduationCap } from 'lucide-react';

const STUDENT_CLASSES: Record<string, string[]> = {
  '7': ['7A', '7B', '7C'],
  '8': ['8A', '8B', '8C'],
  '9': ['9A', '9B', '9C'],
  '10': ['10A', '10B', '10C'],
  '11': ['11A', '11B', '11C'],
};

const STAFF_OPTIONS = ['Teachers', 'Tutors'];

export default function ClassSelectionPage() {
  const { setUserClass } = useAuth();
  const { t } = useTheme();
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!selected || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await setUserClass(selected);
    } catch (err) {
      console.error('Error saving class:', err);
      setError('Failed to save selection. Please try again.');
      setIsSubmitting(false);
    }
  };

  const selectionButton = (value: string, fullWidth = false) => (
    <button
      key={value}
      onClick={() => setSelected(value)}
      className={`group relative h-16 rounded-2xl font-black transition-all duration-500 flex items-center justify-center overflow-hidden ${fullWidth ? 'col-span-1' : ''} ${
        selected === value
          ? 'bg-[var(--color-accent)] text-[var(--color-bg-main)] shadow-[0_0_30px_rgba(45,255,126,0.4)] scale-[1.05]'
          : 'bg-[var(--color-bg-main)]/50 text-[var(--color-text-main)]/40 border border-[var(--color-border)] hover:bg-[var(--color-bg-main)]/80 hover:text-[var(--color-text-main)] hover:border-[var(--color-accent)]/30'
      }`}
    >
      <span className="relative z-10 text-lg">{value}</span>
      <div className={`absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent transition-opacity duration-500 ${selected === value ? 'opacity-100' : 'opacity-0'}`} />
      {selected === value && (
        <motion.div layoutId="sparkle" className="absolute -top-1 -right-1">
          <Sparkles size={16} className="text-[var(--color-bg-main)]/30" />
        </motion.div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[var(--color-accent)]/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[var(--color-accent)]/10 blur-[120px] rounded-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-[var(--color-card-bg)] backdrop-blur-2xl border border-[var(--color-border)] p-8 md:p-12 rounded-[48px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] relative z-10"
      >
        <div className="flex flex-col items-center mb-12">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-20 h-20 bg-[var(--color-accent)]/20 rounded-3xl flex items-center justify-center mb-6 border border-[var(--color-accent)]/30 shadow-[0_0_40px_rgba(45,255,126,0.2)]"
          >
            <Users className="text-[var(--color-accent)]" size={40} />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black text-[var(--color-text-main)] tracking-tight uppercase text-center leading-none">
            {t('class.select')}
          </h1>
          <p className="text-[var(--color-text-secondary)] text-xs font-bold uppercase tracking-[0.3em] mt-4 text-center max-w-[280px]">
            JOIN THE LYCEUM IN THE EFFICIENCY DRIVE
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        <div className="space-y-10">
          {Object.entries(STUDENT_CLASSES).map(([grade, classes]) => (
            <div key={grade} className="space-y-4">
              <div className="flex items-center gap-3 ml-2">
                <span className="text-[10px] font-black text-[var(--color-accent)]/40 uppercase tracking-[0.2em]">
                  {t(`grade.${grade}`)}
                </span>
                <div className="h-px flex-1 bg-[var(--color-border)]" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {classes.map((cls) => selectionButton(cls))}
              </div>
            </div>
          ))}

          <div className="space-y-4">
            <div className="flex items-center gap-3 ml-2">
              <GraduationCap size={12} className="text-[var(--color-accent)]/40" />
              <span className="text-[10px] font-black text-[var(--color-accent)]/40 uppercase tracking-[0.2em]">
                Staff & Faculty
              </span>
              <div className="h-px flex-1 bg-[var(--color-border)]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STAFF_OPTIONS.map((option) => selectionButton(option))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <button
            onClick={handleConfirm}
            disabled={!selected || isSubmitting}
            className={`w-full h-20 rounded-[32px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-4 group relative overflow-hidden ${
              selected && !isSubmitting
                ? 'bg-[var(--color-accent)] hover:opacity-90 text-[var(--color-bg-main)] shadow-[0_20px_40px_rgba(45,255,126,0.3)]'
                : 'bg-[var(--color-bg-main)]/50 text-[var(--color-text-main)]/10 border border-[var(--color-border)] cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={28} />
            ) : (
              <>
                <span className="relative z-10">{t('class.confirm')}</span>
                <motion.div
                  animate={selected ? { x: [0, 5, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <CheckCircle2 size={24} className="relative z-10" />
                </motion.div>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}