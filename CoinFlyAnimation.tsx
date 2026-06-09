import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins } from 'lucide-react';

interface CoinFlyAnimationProps {
  startX: number;
  startY: number;
  targetX?: number;
  targetY?: number;
  count?: number;
  onComplete?: () => void;
}

export default function CoinFlyAnimation({ 
  startX, 
  startY, 
  targetX = window.innerWidth / 2, 
  targetY = window.innerHeight - 80, 
  count = 8,
  onComplete 
}: CoinFlyAnimationProps) {
  const [coins, setCoins] = useState<number[]>([]);

  useEffect(() => {
    const newCoins = Array.from({ length: count }, (_, i) => i);
    setCoins(newCoins);

    const timer = setTimeout(() => {
      setCoins([]);
      if (onComplete) onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {coins.map((id) => (
          <motion.div
            key={id}
            initial={{ 
              x: startX, 
              y: startY, 
              opacity: 0, 
              scale: 0.5,
              rotate: 0 
            }}
            animate={{ 
              x: targetX + (Math.random() * 40 - 20), 
              y: targetY, 
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 1, 0.5],
              rotate: 360 + Math.random() * 360
            }}
            transition={{ 
              duration: 0.6, 
              delay: id * 0.05,
              ease: [0.23, 1, 0.32, 1] // Custom cubic-bezier for "flying" feel
            }}
            style={{ willChange: 'transform, opacity' }}
            className="absolute"
          >
            <div className="bg-yellow-400 rounded-full p-1 shadow-lg border border-yellow-600">
              <Coins size={16} className="text-yellow-800" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
