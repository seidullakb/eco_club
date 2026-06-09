import { useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useCollectingAnimation(onComplete?: () => void) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [startPos, setStartPos] = useState<Position | null>(null);

  const animate = useCallback((pos: Position) => {
    setStartPos(pos);
    setIsAnimating(true);
    
    // Animation duration is 400ms as requested
    setTimeout(() => {
      setIsAnimating(false);
      setStartPos(null);
      if (onComplete) onComplete();
    }, 600); // Slightly longer than 400ms to ensure all coins finish
  }, [onComplete]);

  return { animate, isAnimating, startPos };
}
