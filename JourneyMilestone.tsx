import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Coins } from 'lucide-react';

interface JourneyMilestoneProps {
  isReached: boolean;
  title: string;
  onComplete?: () => void;
}

export default function JourneyMilestone({ isReached, title, onComplete }: JourneyMilestoneProps) {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (isReached) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
        if (onComplete) onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isReached, onComplete]);

  return (
    <div className="relative">
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center z-[110] pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-[var(--color-card-bg)] backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border-4 border-[var(--color-accent)] flex flex-col items-center text-center max-w-[280px]"
            >
              <div className="relative mb-4">
                {/* Pulse effect */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 bg-[var(--color-accent)] rounded-full"
                />
                <div className="relative w-20 h-20 bg-[var(--color-bg-main)] rounded-full flex items-center justify-center text-[var(--color-accent)]">
                  <motion.svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M20 6L9 17L4 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    />
                  </motion.svg>
                </div>

                {/* Particle burst */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ 
                      x: Math.cos(i * 30 * Math.PI / 180) * 100,
                      y: Math.sin(i * 30 * Math.PI / 180) * 100,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <Coins size={16} className="text-yellow-500" />
                  </motion.div>
                ))}
              </div>

              <h3 className="text-2xl font-black text-[var(--color-text-main)] uppercase tracking-tight mb-2">Milestone!</h3>
              <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">{title}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Static representation of the milestone */}
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isReached ? 'bg-[var(--color-accent)] text-[var(--color-bg-main)]' : 'bg-[var(--color-text-main)]/5 text-[var(--color-text-main)]/20'}`}>
        {isReached ? <Check size={24} /> : <div className="w-2 h-2 rounded-full bg-current" />}
      </div>
    </div>
  );
}
